from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('home/', view=views.home, name="home"),
    path('sample_collection/', view=views.sample_collection, name="sample_collection"),
    path('sample_wanted/', view=views.sample_wanted, name="sample_wanted"),
    path('sample_decks/', view=views.sample_decks, name="sample_decks"),
    path('search_collection/', view=views.search_collection, name="search_collection"),
    path('search_wanted/', view=views.search_wanted, name="search_wanted"),
    path('search_decks/', view=views.search_decks, name="search_decks"),
    path('get_decks/', view=views.get_decks, name="get_deck"),
    path('search_database/', view=views.search_database, name="search_database"),
    path('add_cards_to_collection/', view=views.add_cards_to_collection, name="add_cards_to_collection"),
    path('remove_cards_from_collection/', view=views.remove_cards_from_collection, name="remove_cards_from_collection"),
    path('add_cards_to_wanted/', view=views.add_cards_to_wanted, name="add_cards_to_wanted"),
    path('remove_cards_from_wanted/', view=views.remove_cards_from_wanted, name="remove_cards_from_wanted"),
    path('get_card_details/', view=views.get_card_details, name="get_card_details"),
    path('create_deck/', view=views.create_deck, name="create_deck"),   
    path('add_cards_to_deck/', view=views.add_cards_to_deck, name="add_cards_to_deck"),
    path('remove_cards_from_deck/', view=views.remove_cards_from_deck, name="remove_cards_from_deck"),
    path('get_deck_details/', view=views.get_deck_details, name="get_deck_details"),
    path('edit_deck/', view=views.edit_deck, name="edit_deck"),

    re_path(r"^(?!api/).*", view=views.index, name="frontend"),
]