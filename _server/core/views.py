from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseBadRequest, JsonResponse
from .models import Deck, MyCard
from django.forms.models import model_to_dict
from mtgsdk import Card

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
    if body.get("type") not in ["commander", "standard", "modern", "legacy", "vintage", "pioneer", "pauper"]:
        return HttpResponseBadRequest("Invalid type")
    if body.get("type") == "commander":
        if body.get("commander") == None:
            return HttpResponseBadRequest("Missing commander")
    deck = Deck.objects.create(
        user=req.user,
        name=body.get("name"),
        description=body.get("description", ""),
        format=body.get("type"),
        colors=body.get("colors", []),
        image=body.get("image", ""),
        commander=body.get("commander", None)
    )
    card_response = []
    is_valid = True
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card, wasCardFound = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        deck.cards.create(
            card=database_card,
            quantity=card.get("quantity")
        )
        card_response.add({
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
            "commander": deck.commander,
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
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        deck.cards.create(
            card=database_card,
            quantity=card.get("quantity")
        )
        card_response.add({
            "name": database_card.name,
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
    for card in body.get("cards", []):
        if card.get("name") == None or card.get("quantity") == None:
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        collection.cards.create(
            card=database_card,
            quantity=card.get("quantity")
        )
        card_response.add({
            "name": database_card.name,
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
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        wanted.cards.create(
            card=database_card,
            quantity=card.get("quantity")
        )
        card_response.add({
            "name": database_card.name,
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
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        deck.cards.filter(card=database_card).delete()
        if deck.cards.filter(card=database_card).count() == 0:
            MyCard.objects.filter(id=database_card.id).delete()
        card_response.add({
            "name": database_card.name,
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
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        collection.cards.filter(card=database_card).delete()
        if collection.cards.filter(card=database_card).count() == 0:
            MyCard.objects.filter(id=database_card.id).delete()
        card_response.add({
            "name": database_card.name,
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
            card_response.add("Missing/Invalid name or quantity")
            is_valid = False
            continue
        database_card = add_or_get_card(card.get("name"))
        if database_card == "Invalid card name":
            card_response.add("Invalid card name")
            is_valid = False
            continue
        wanted.cards.filter(card=database_card).delete()
        if wanted.cards.filter(card=database_card).count() == 0:
            MyCard.objects.filter(id=database_card.id).delete()
        card_response.add({
            "name": database_card.name,
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
        card = Card.where(name=card_name).all()
        if len(card) == 1:
            card = card[0]
            MyCard.objects.create(
                card_name=card.name,
                card_id=card.id,
                colors=card.colors,
                image=card.image_url,
                mana_cost=card.mana_cost,
                type=card.type,
                subtype=card.subtype,
                set=card.set,
                power=card.power,
                toughness=card.toughness,
                loyalty=card.loyalty,
                text=card.text,
                rarity=card.rarity
            )
            return card, True
        return "Invalid card name", False