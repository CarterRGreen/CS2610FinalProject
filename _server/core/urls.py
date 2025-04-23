from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('home/', view=views.home, name="home"),
    path('sample_collection/', view=views.sample_collection, name="sample_collection"),
    path('sample_wanted/', view=views.sample_wanted, name="sample_wanted"),
    path('sample_decks/', view=views.sample_decks, name="sample_decks"),
]