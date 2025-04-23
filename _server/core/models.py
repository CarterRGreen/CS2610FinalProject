from django.db import models

# Create your models here.
class MyCard(models.Model):
    id = models.AutoField(primary_key=True)
    card_name = models.CharField(max_length=255, db_index=True)
    card_id = models.CharField(max_length=255, unique=True)
    colors = models.JSONField()
    image = models.URLField()
    mana_cost = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    subtype = models.CharField(max_length=255)
    set = models.CharField(max_length=255)
    power = models.IntegerField()
    toughness = models.IntegerField()
    loyalty = models.IntegerField()
    text = models.TextField()
    rarity = models.CharField(max_length=255)

class Collection(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='collection')

class CollectionCard(models.Model):
    id = models.AutoField(primary_key=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='collection_cards')
    card = models.ForeignKey(MyCard, on_delete=models.CASCADE, related_name='collection_card')
    quantity = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

class Wanted(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='wanted')

class WantedCard(models.Model):
    id = models.AutoField(primary_key=True)
    wanted = models.ForeignKey(Wanted, on_delete=models.CASCADE, related_name='wanted_cards')
    card = models.ForeignKey(MyCard, on_delete=models.CASCADE, related_name='wanted_card')
    quantity = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

class Deck(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='decks')
    name = models.CharField(max_length=255)
    description = models.TextField()
    format = models.CharField(max_length=255)
    colors = models.JSONField()
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    commander = models.ForeignKey(MyCard, on_delete=models.CASCADE, related_name='commanders', null=True, blank=True)

class DeckCard(models.Model):
    id = models.AutoField(primary_key=True)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='cards')
    card = models.ForeignKey(MyCard, on_delete=models.CASCADE, related_name='decks')
    quantity = models.IntegerField()