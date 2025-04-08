<<<<<<< HEAD
# CS2610FinalProject
A MTG card search, storage, and deck storage


**Carter Green**
**CS 2610 Final Project Proposal**


 ## General Overview
The project I will be developing will be a Magic the Gathering (the trading card game) based project. It will allow users to store which cards they have in their physical collection, build decks online and search for cards. It will be useful for players of the game who have a lot of cards in their collection and want to be able to build decks and see which cards they already own in these decks.

 ## Feature List
### Must Have Features
    * As a user, I should be able to create an account.
    * As a user, I should be able to sign in to that account.
    * As a user, I should be able to delete my account \faFrownO.
    * As a user, I should be able to search for cards without being logged in.
    * As a user, I should be able to add cards to my collection (meaning cards that I own), but only while logged in. I should be able to specify how many of each card I have.
    * As a user, I should be able to search the cards I own for a specific card, color, power, toughness, etc.
    * As a user, I should be able to add cards to a list of cards I want to buy (similar to a cart but without actually being able to purchase anything).
    * As a user, I should be able to create a EDH format deck (with a name too).
    * As a user, I should be able to edit my deck by adding/removing cards from it, or by editing the name.
    * As a user, I should be able to see which cards are in a deck.
    * As a user, I should be able to look at a list of decks that I have created, and have the option to click on a deck to look at the cards in that deck.
    * As a user, I should be able to visually see which cards in my deck are cards that are in my card collection.
    * As a user, I should be able to look at the cards that are in my collection (just the list of names).
    * As a user, I should be able to click on a card (from any page) and go to a page that has a large image of the card and technical specifics about the card. This page should also say if the card is in my collection, how many I have, and what decks it is in.
    * As a user, I should be able to search for specific cards/features of a card, then be able to add those cards to either my owned cards, my wish-list, or a deck.
    * There should be some sort of home page.
### Nice to Have Features
    * As a user, It would be nice to be able to create decks of types other than EDH.
    * As a user, I should be able to look at the cards that are in my collection with their full image being available.
    * As a user, It would be nice to be able to playtest a deck. Meaning that you are given a starting hand, and can play/draw cards and take turns as usual. It would be a one player game.
    
## Technical Challenges
    * I anticipate having to load a lot of cards in a search, so I will need to implement pagination.
    * I will have to request data from the MTG API, so I will have to implement their API.
    * I will have to push and pull data to and from a SQLite database, so I will have to learn how to do that with DJANGO and React.

## Requirements
    * This will be a single-page application, so it meets that requirement.
    * My app will have multiple pages, including a home page, a login page, a deck building page, and a search page.
    * I will require my users to log in before using most of the apps features.
    * My app will be useful because it will allow users to digitize and utilize their MTG card collection.
    * My app will have a consistent design by having the same color palette, headers, etc. across pages.
    * I will use the backend and the database to save users decks and card collection.
=======
# 2610 Django + Vite Starting Point
This project serves as a starting point you to use as a starting point for Django applications that use Vite as the asset server for development. You are welcome to us this project for all of your assignments beginning with Module 5.

## Strategy
This application is a hybrid MPA and SPA. It reuses all of the login stuff that we did at the end of module 3 - there is a separate page for signup/signin. Once a user is logged in they are redirected to the / view which then renders the SPA application created using React and Vite.

## Creating a new application
1. Clone the repo `git clone git@github.com:dittonjs/2610DjangoViteStarter.git <your-new-project-name>`. Replace `<your-new-project-name>` with the name you want give to your project.
   - If you are using GitHub for version control, a better option would be to fork the repository instead of clone it.
3. Open the pyproject.toml file and change the `name` property. You should use `-` to separate words in your name for this property.
4. This project was set up using Python 3.11. You might have an older version installed. If you run into an error later that says that your activated Python version isn't compatible, the in the pyproject.toml file, just change the version there to match the version that you have installed. If you do this, you need to make sure that the lock file gets regenerated. You can do this by running `poetry lock --no-update` or by simply deleting the poetry.lock file (it will get regenerated when you run poetry install)/

## Initial Setup
1. Change the name property in the `pyproject.toml` file to be something unique to your project.
1. In the root directory, install the python dependencies `poetry install --no-root`
2. In the `client` directory, install the javascript dependencies `npm install`
3. In the `_server` directory, create a new file called `.env`
4. Copy the contents of `_server/.env.example` into the newly created `.env` file.
5. Activate the poetry env `poetry shell`, or, if you do not have the poetry shell plugin use `poetry run <the command you want to run>` to run somesomething
6. In the `_server` directory, run the migrations `python manage.py migrate`

## Running the appliction
1. In the `client` directory run `npm run dev`
2. In the `_server` directory (with your poetry env activated) run `python manage.py runserver`
3. Visit your application at `http://localhost:8000`

## Using this project for future classes/personal projects
Many students in the past have chosen to use this starter app template for projects in other classes like CS3450 and for personal projects. I strongly encourage you to do so! Please check with your other instructors before you use this project as a starting point for their classes. You may also want to add your name to the author field in the `pyproject.toml` file.
>>>>>>> 5f7a6b929b5eecc062f1db2e62b22706be4875fe
