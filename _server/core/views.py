from django.shortcuts import render
from django.conf  import settings
import os, math, json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, JsonResponse
from django.forms.models import model_to_dict
from .models import Deck, MyCard, Collection, Wanted
from django.forms.models import model_to_dict
import requests
import urllib.parse
url = "https://api.scryfall.com/cards/search?q="
scryfall_headers = {
    "User-Agent": "MTGCardTracker",
    "Accept": "application/json",
}

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

def home(req):
    return render(req, "core/home.html", {})

@login_required
def create_deck(req):
    body = json.loads(req.body)
    if body.get("name") == None or body.get("type") == None:
        return HttpResponseBadRequest("Missing name or cards")
    if body.get("type") not in ["Commander", "Standard", "Modern", "Legacy", "Vintage", "Pioneer", "Pauper"]:
        return HttpResponseBadRequest("Invalid type")
    if body.get("type") == "commander":
        if body.get("commander") == None:
            return HttpResponseBadRequest("Missing commander")
    commander = add_or_get_card(body.get("commander"))[0]
    deck = Deck.objects.create(
        user=req.user,
        name=body.get("name"),
        description=body.get("description", ""),
        format=body.get("type"),
        colors=body.get("colors", []),
        image=commander.image,
        commander=commander
    )
    deck.cards.create(
        card=commander,
        quantity=1
    )
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if success == False:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        deck.cards.create(
            card=database_card,
            quantity=card.get("quantity")
        )
        card_response.append({
            "name": database_card.name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    
    return JsonResponse({
        "deck": {
            "id": deck.id,
            "name": deck.name,
            "description": deck.description,
            "format": deck.format,
            "colors": deck.colors,
            "image": deck.image,
            "commander": model_to_dict(deck.commander),
            "cards": card_response
        }
    }, status= 200 if is_valid == True else 400)

@login_required
def add_cards_to_deck(req):
    body = json.loads(req.body)
    if body.get("deck_id") == None or body.get("cards") == None:
        return HttpResponseBadRequest("Missing deck or cards")
    deck = Deck.objects.filter(id=body.get("deck_id"), user=req.user).first()
    if deck == None:
        return HttpResponseBadRequest("Deck not found")
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.ppend("Invalid card name")
            is_valid = False
            continue
        if deck.cards.filter(card=database_card).exists():
            deck_card = deck.cards.filter(card=database_card).first()
            deck_card.quantity += card.get("quantity")
            deck_card.save()
        else:
            deck.cards.create(
                card=database_card,
                quantity=card.get("quantity")
            )
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

@login_required
def add_cards_to_collection(req):
    body = json.loads(req.body)
    if body.get("cards") == None:
        return HttpResponseBadRequest("Missing  cards")
    collection = req.user.collection
    card_response = []
    is_valid = True
    for card in body.get("cards", {}):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if not success:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        collection_card = collection.collection_cards.filter(card=database_card).first()
        if collection_card != None:
            collection_card.quantity += card.get("quantity")
            collection_card.save()
        else:
            collection.collection_cards.create(
                card=database_card,
                quantity=card.get("quantity")
            )
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

@login_required
def add_cards_to_wanted(req):
    body = json.loads(req.body)
    if body.get("cards") == None:
        return HttpResponseBadRequest("Missing cards")
    wanted = req.user.wanted
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if success == False:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        wanted_card = wanted.wanted_cards.filter(card=database_card).first()
        if wanted_card != None:
            wanted_card.quantity += card.get("quantity")
            wanted_card.save()
        else:
            wanted.wanted_cards.create(
                card=database_card,
                quantity=card.get("quantity")
            )
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

@login_required
def remove_cards_from_deck(req):
    body = json.loads(req.body)
    if body.get("deck_id") == None or body.get("cards") == None:
        return HttpResponseBadRequest("Missing deck or cards")
    deck = Deck.objects.filter(id=body.get("deck_id"), user=req.user).first()
    if deck == None:
        return HttpResponseBadRequest("Deck not found")
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if success == False:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        if deck.cards.filter(card=database_card).exists():
            deck_card = deck.cards.filter(card=database_card).first()
            deck_card.quantity -= int(card.get("quantity"))
            if deck_card.quantity <= 0:
                deck_card.delete()
            else:
                deck_card.save()
        else:
            deck.cards.filter(card=database_card).delete()
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

@login_required
def remove_cards_from_collection(req):
    body = json.loads(req.body)
    if body.get("cards") == None:
        return HttpResponseBadRequest("Missing cards")
    collection = req.user.collection
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if success == False:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        collection_card = collection.collection_cards.filter(card=database_card).first()
        if collection_card == None:
            card_response.append("Card not found in collection")
            is_valid = False
            continue
        collection_card.quantity -= int(card.get("quantity"))
        if collection_card.quantity <= 0:
            collection_card.delete()
        else:
            collection_card.save()
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

@login_required
def remove_cards_from_wanted(req):
    body = json.loads(req.body)
    if body.get("cards") == None:
        return HttpResponseBadRequest("Missing cards")
    wanted = req.user.wanted
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.append("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, success = add_or_get_card(card.get("name"))
        if success == False:
            card_response.append("Invalid card name")
            is_valid = False
            continue
        wanted_card = wanted.wanted_cards.filter(card=database_card).first()
        if wanted_card == None:
            card_response.append("Card not found in Wanted")
            is_valid = False
            continue
        wanted_card.quantity -= int(card.get("quantity"))
        if wanted_card.quantity <= 0:
            wanted_card.delete()
        else:
            wanted_card.save()
        card_response.append({
            "name": database_card.card_name,
            "id": database_card.id,
            "quantity": card.get("quantity")
        })
    return JsonResponse(
        {"card_response": card_response},
        status= 200 if is_valid == True else 400,
    )

def add_or_get_card(card_name):
    card = MyCard.objects.filter(card_name=card_name).all()
    if card.exists() and card.count() == 1:
        return card.first(), True
    elif card.count() > 1:
        return "Invalid card name", False
    else:
        urlAddon = f"%21'{urllib.parse.quote(card_name)}'"
        response = requests.get(url+urlAddon, headers=scryfall_headers)
        if response.status_code != 200:
            return "Invalid card name", False
        response = response.json()
        search = response.get("data", [])
        if len(search) == 1:
            card = search[0]
            card = MyCard.objects.create(
                card_name=card.get("name"),
                card_id=card.get("id"),
                colors=card.get("colors") if "colors" in card else card.get("card_faces")[0].get("colors"),
                image=card.get("image_uris").get("normal") if "image_uris" in card else card.get("card_faces")[0].get("image_uris").get("normal"),
                mana_cost=card.get("mana_cost") if "mana_cost" in card else card.get("card_faces")[0].get("mana_cost"),
                type=card.get("type_line").split(" — ")[0],
                subtype=card.get("type_line").split(" — ")[1] if " — " in card["type_line"] else "",
                set=card.get("set_name"),
                power=card.get("power") if "power" in card else card.get("card_faces")[0].get("power") if "card_faces" in card else None,
                toughness=card.get("toughness") if "toughness" in card else card.get("card_faces")[0].get("toughness") if "card_faces" in card else None,
                loyalty=card.get("loyalty") if "loyalty" in card else card.get("card_faces")[0].get("loyalty") if "card_faces" in card else None,
                text=card.get("oracle_text") if "oracle_text" in card else card.get("card_faces")[0].get("oracle_text"),
                rarity=card.get("rarity")
            )

            return card, True
        return "Invalid card name", False

@login_required
def sample_collection(req):
    num_cards = int(req.GET.get("num_cards", "10"))
    page = int(req.GET.get("page", "1"))
    if num_cards <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_cards or page")
    collection = req.user.collection
    collection_cards = collection.collection_cards.all().order_by("date_added")
    if collection_cards.count() == 0 and page == 1:
        return JsonResponse({
            "collection": [],
            "collection_cards": []
        })
    if page > math.ceil(collection_cards.count() / num_cards):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_cards
    end = start + num_cards
    if end > collection_cards.count():
        end = collection_cards.count()
    collection_cards = collection_cards[start:end]
    cards = [collection_card.card for collection_card in collection_cards]
    return JsonResponse(
        {
            "collection": [model_to_dict(card) for card in cards],
            "collection_cards": [model_to_dict(collection_card) for collection_card in collection_cards]
        }
    )

@login_required
def sample_wanted(req):
    num_cards = int(req.GET.get("num_cards", "10"))
    page = int(req.GET.get("page", "1"))
    if num_cards <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_cards or page")
    wanted = req.user.wanted
    wanted_cards = wanted.wanted_cards.all().order_by("date_added")
    if wanted_cards.count() == 0 and page == 1:
        return JsonResponse({
            "wanted": [],
            "wanted_cards": []
        })
    if page > math.ceil(wanted_cards.count() / num_cards):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_cards
    end = start + num_cards
    if end > wanted_cards.count():
        end = wanted_cards.count()
    wanted_cards = wanted_cards[start:end]
    cards = [wanted_card.card for wanted_card in wanted_cards]
    return JsonResponse(
        {
            "wanted": [model_to_dict(card) for card in cards],
            "wanted_cards": [model_to_dict(wanted_card) for wanted_card in wanted_cards]
        }
    )

@login_required
def sample_decks(req):
    num_decks = int(req.GET.get("num_decks", "10"))
    page = int(req.GET.get("page", "1"))
    if num_decks <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_decks or page")
    decks = req.user.decks.order_by("updated_at")
    if decks.count() == 0 and page == 1:
        return JsonResponse({"decks": []})
    if page > math.ceil(decks.count() / num_decks):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_decks
    end = start + num_decks
    if end > decks.count():
        end = decks.count()
    decks = decks[start:end]
    return JsonResponse(
        {"decks": [model_to_dict(card) for card in decks]}
    )   

@login_required
def search_collection(req):
    num_cards = int(req.GET.get("num_cards", "10"))
    page = int(req.GET.get("page", "1"))
    if num_cards <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_cards or page")
    collection = req.user.collection
    collection_cards = collection.collection_cards.all().order_by("date_added")
    if name := req.GET.get("name", ""):
        collection_cards = collection_cards.filter(card__card_name__icontains=name)
    if colors := req.GET.getlist("colors", []):
        collection_cards = collection_cards.filter(card__colors__has_keys=colors)
    if set := req.GET.get("set", ""):
        collection_cards = collection_cards.filter(card__set__icontains=set)
    if type := req.GET.get("type", ""):
        collection_cards = collection_cards.filter(card__type__icontains=type)
    if subtype := req.GET.get("subtype", ""):
        collection_cards = collection_cards.filter(card__subtype__icontains=subtype)
    if power := req.GET.get("power", None):
        collection_cards = collection_cards.filter(card__power=power)
    if toughness := req.GET.get("toughness", None):
        collection_cards = collection_cards.filter(card__toughness=toughness)
    if collection_cards.count() == 0 and page == 1:
        return JsonResponse({
            "collection": [],
            "collection_cards": []
        })
    if page > math.ceil(collection_cards.count() / num_cards):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_cards
    end = start + num_cards
    if end > collection_cards.count():
        end = collection_cards.count()
    collection_cards = collection_cards[start:end]
    cards = [collection_card.card for collection_card in collection_cards]
    num_pages = math.ceil(collection_cards.count() / num_cards)
    collection_cards = [model_to_dict(collection_card) for collection_card in collection_cards]
    cards = [model_to_dict(card) for card in cards]
    return JsonResponse(
        {
            "collection": cards,
            "collection_cards": collection_cards,
            "num_pages": num_pages
        }
    )

@login_required
def search_wanted(req):
    num_cards = int(req.GET.get("num_cards", "10"))
    page = int(req.GET.get("page", "1"))
    if num_cards <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_cards or page")
    wanted = req.user.wanted
    wanted_cards = wanted.wanted_cards.all().order_by("date_added")
    if name := req.GET.get("name", ""):
        wanted_cards = wanted_cards.filter(card__card_name__icontains=name)
    if colors := req.GET.getlist("colors", []):
        wanted_cards = wanted_cards.filter(card__colors__has_keys=colors)
    if set := req.GET.get("set", ""):
        wanted_cards = wanted_cards.filter(card__set__icontains=set)
    if type := req.GET.get("type", ""):
        wanted_cards = wanted_cards.filter(card__type__icontains=type)
    if subtype := req.GET.get("subtype", ""):
        wanted_cards = wanted_cards.filter(card__subtype__icontains=subtype)
    if power := req.GET.get("power", None):
        wanted_cards = wanted_cards.filter(card__power=power)
    if toughness := req.GET.get("toughness", None):
        wanted_cards = wanted_cards.filter(card__toughness=toughness)
    if wanted_cards.count() == 0 and page == 1:
        return JsonResponse({
            "wanted": [],
            "wanted_cards": []
        })
    if page > math.ceil(wanted_cards.count() / num_cards):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_cards
    end = start + num_cards
    if end > wanted_cards.count():
        end = wanted_cards.count()
    wanted_cards = wanted_cards[start:end]
    cards = [collection_card.card for collection_card in wanted_cards]
    num_pages = math.ceil(wanted_cards.count() / num_cards)
    wanted_cards = [model_to_dict(wanted_card) for wanted_card in wanted_cards]
    cards = [model_to_dict(card) for card in cards]
    return JsonResponse(
        {
            "wanted": cards,
            "wanted_cards": wanted_cards,
            "num_pages": num_pages
        }
    )

@login_required
def search_decks(req):
    num_decks = int(req.GET.get("num_decks", "10"))
    page = int(req.GET.get("page", "1"))
    if num_decks <= 0 or page <= 0:
        return HttpResponseBadRequest("Invalid num_decks or page")
    decks = req.user.decks.all().order_by("updated_at")
    if name := req.GET.get("name", ""):
        decks = decks.filter(name__icontains=name)
    if colors := req.GET.getlist("colors", []):
        decks = decks.filter(colors__has_keys=colors)
    if format := req.GET.get("format", ""):
        decks = decks.filter(format__icontains=format)
    if decks.count() == 0 and page == 1:
        return JsonResponse({
            "decks": [],
        })
    if page > math.ceil(decks.count() / num_decks):
        return HttpResponseBadRequest("Page out of range")
    start = (page - 1) * num_decks
    end = start + num_decks
    if end > decks.count():
        end = decks.count()
    decks = decks[start:end]
    num_pages = math.ceil(decks.count() / num_decks)

    return JsonResponse(
        {
            "decks": [model_to_dict(deck) for deck in decks],
            "num_pages": num_pages
        }
    )

@login_required
def get_decks(req):
    decks = req.user.decks.all().order_by("updated_at")
    return JsonResponse(
        {
            "decks": [model_to_dict(deck) for deck in decks]
        }
    )

@login_required
def get_deck_details(req):
    deck_id = req.GET.get("deck_id", "")
    if deck_id == "":
        return HttpResponseBadRequest("Missing deck_id")
    deck = req.user.decks.filter(id=deck_id).first()
    if deck == None:
        return HttpResponseBadRequest("Deck not found")
    cards = [model_to_dict(deck_card.card) for deck_card in deck.cards.all()]
    deck_cards = [model_to_dict(deck_card) for deck_card in deck.cards.all()]
    return JsonResponse(
        {
            "deck": model_to_dict(deck),
            "cards": cards,
            "deck_cards": deck_cards,
            "commander": model_to_dict(deck.commander),
        }
    )

@login_required
def search_database(req):
    urlAddon = ""
    page = int(req.GET.get("page", "1"))
    if page <= 0:
        return HttpResponseBadRequest("Invalid num_cards or page")
    if name := req.GET.get("name", ""):
        urlAddon += f"'{urllib.parse.quote(name)}'+"
    if colors := req.GET.get("colors", ""):
        formatted_colors = '+c%3A'.join(color.strip() for color in colors.split(","))
        urlAddon += f"c%3A{formatted_colors}+"
    if set := req.GET.get("set", ""):
        urlAddon += f"set%3A{urllib.parse.quote(set)}+"
    if type := req.GET.get("type", ""):
        urlAddon += f"type%3A{urllib.parse.quote(type)}+"
    if subtype := req.GET.get("subtype", ""):
        urlAddon += f"subtype%3A{urllib.parse.quote(subtype)}+"
    if power := req.GET.get("power", None):
        urlAddon += f"power%3A{urllib.parse.quote(power)}+"
    if toughness := req.GET.get("toughness", None):
        urlAddon += f"toughness%3A{urllib.parse.quote(toughness)}+"
    response = requests.get(url+urlAddon, headers=scryfall_headers)
    if response.status_code != 200:
        return HttpResponseBadRequest("Invalid request")
    response = response.json()
    search = response.get("data", [])
    if len(search) == 0 and page == 1:
        return JsonResponse({
            "cards": []
        })
    cards = [card for card in search]
    card_dictionaries = [{
        "name": card["name"],
        "card_id": card["id"],
        "colors": card.get("colors") if "colors" in card else card.get("card_faces")[0].get("colors"),
        "image": card.get("image_uris").get("normal") if "image_uris" in card else card.get("card_faces")[0].get("image_uris").get("normal"),
        "mana_cost": card["mana_cost"] if "mana_cost" in card else card.get("card_faces")[0].get("mana_cost"),
        "type": card["type_line"].split(" — ")[0],
        "subtype": card["type_line"].split(" — ")[1] if " — " in card["type_line"] else "",
        "set": card["set_name"],
        "power": card["power"] if "power" in card else card.get("card_faces")[0].get("power") if "card_faces" in card else None,
        "toughness": card["toughness"] if "toughness" in card else card.get("card_faces")[0].get("toughness") if "card_faces" in card else None,
        "text": card["oracle_text"] if "oracle_text" in card else card.get("card_faces")[0].get("oracle_text"),
        "rarity": card["rarity"]
    } for card in cards]
    return JsonResponse(
        {
            "cards": card_dictionaries,
            "is_next_page": response.get("has_more", False),
        }
    )

@login_required
def get_card_details(req):
    card_id = req.GET.get("card_id", "")
    if card_id == "":
        return HttpResponseBadRequest("Missing card_id")
    response = requests.get(f"https://api.scryfall.com/cards/{card_id}", headers=scryfall_headers)
    if response.status_code != 200:
        return HttpResponseBadRequest("Invalid card_id")
    card = response.json()
    if card.get("object", "") != "card":
        return HttpResponseBadRequest("Invalid card_id")
    card_dictionary = {
        "name": card["name"],
        "card_id": card["id"],
        "colors": card.get("colors") if "colors" in card else card.get("card_faces")[0].get("colors"),
        "image": card.get("image_uris").get("normal") if "image_uris" in card else card.get("card_faces")[0].get("image_uris").get("normal"),
        "mana_cost": card["mana_cost"] if "mana_cost" in card else card.get("card_faces")[0].get("mana_cost"),
        "type": card["type_line"].split(" — ")[0],
        "subtype": card["type_line"].split(" — ")[1] if " — " in card["type_line"] else "",
        "set": card["set_name"],
        "power": card["power"] if "power" in card else card.get("card_faces")[0].get("power") if "card_faces" in card else None,
        "toughness": card["toughness"] if "toughness" in card else card.get("card_faces")[0].get("toughness") if "card_faces" in card else None,
        "text": card["oracle_text"] if "oracle_text" in card else card.get("card_faces")[0].get("oracle_text"),
        "rarity": card["rarity"]
    }

    return JsonResponse(
        {
            "card": card_dictionary
        }
    )

def edit_deck(req):
    body = json.loads(req.body)
    if body.get("deck_id", "") == "":
        return HttpResponseBadRequest("Invalid deck_id")
    deck_id = body.get("deck_id")
    deck = req.user.decks.filter(id=deck_id).first()
    if deck == None:
        return HttpResponseBadRequest("Invalid deck_id")
    if name := body.get("name", ""):
        if name != deck.name:
            deck.name = name
    if deck_type := body.get("deck_type", ""):
        if deck_type != deck.format:
            deck.format = deck_type
    if commander := body.get("commander", ""):
        commander, success = add_or_get_card(commander)
        if success == True and commander != deck.commander:
            deck.commander = commander
            deck.image = commander.image
    deck.save()
    deck_dictionary = model_to_dict(deck)
    return JsonResponse(
        {
            "deck": model_to_dict(deck),
            "commander": model_to_dict(deck.commander),
        }
    )