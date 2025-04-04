# CS2610FinalProject
A MTG card search, storage, and deck storage

```math
\noindent\large Carter Green\\
\noindent{\bf \large CS 2610 Final Project Proposal }\\
\noindent \underline{\hspace{4in}}\\

\normalsize
%%%%  %%%%

\section{General Overview}
The project I will be developing will be a Magic the Gathering (the trading card game) based project. It will allow users to store which cards they have in their physical collection, build decks online and search for cards. It will be useful for players of the game who have a lot of cards in their collection and want to be able to build decks and see which cards they already own in these decks.

\section{Feature List}
    \subsection{Must Have Features}
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
    \subsection{Nice to Have Features}
        * As a user, It would be nice to be able to create decks of types other than EDH.
        * As a user, I should be able to look at the cards that are in my collection with their full image being available.
        * As a user, It would be nice to be able to playtest a deck. Meaning that you are given a starting hand, and can play/draw cards and take turns as usual. It would be a one player game.
    
\section{Technical Challenges}
    * I anticipate having to load a lot of cards in a search, so I will need to implement pagination.
    * I will have to request data from the MTG API, so I will have to implement their API.
    * I will have to push and pull data to and from a SQLite database, so I will have to learn how to do that with DJANGO and React.

\section{Requirements}
    * This will be a single-page application, so it meets that requirement.
    * My app will have multiple pages, including a home page, a login page, a deck building page, and a search page.
    * I will require my users to log in before using most of the apps features.
    * My app will be useful because it will allow users to digitize and utilize their MTG card collection.
    * My app will have a consistent design by having the same color palette, headers, etc. across pages.
    * I will use the backend and the database to save users decks and card collection.
```