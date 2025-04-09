# This is the software Development Plan for this project

# Stage 1: Project Requirements

### These are the features I want this project to have:

* As a user, I should be able to create an account.
* As a user, I should be able to sign in to that account.
* As a user, I should be able to delete my account.
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

### Thus, the project will have the following pages:

* Home page: This is the home page for the application. It will show some details about what the app offers. Users will not need to be logged in.
* Login page: This is the page to login at. Users will not need to be logged in.
* Create Account pages: This is the page to create an account at. Users will not need to be logged in.
* Dashboard page: This is the main logged in page for users. It will highlight a few cards they own, a few cards they want to buy, and a few of their decks. It will require users to be logged in.
* Collection Page: This is the page that shows users the cards they own. It will have to paginate the cards. Users will have to be logged in.
* Wanted Page: This is the page that will show users the cards that they have on their wanted list. Users will have to be logged in.
* Decks Page: This is the page that will show users the decks they have created. Users will have to be logged in.
* Deck Page: This is the page that will show users a specific deck. It will have a change to the URL for each of their decks. Users will have to be logged in. Users will be able to edit their deck on this page if wanted.
* Card Page: This is the page that will show users the details of a specific card. It will have a change to the URL for each card. Users will not have to be logged in.
* Search Page: This is the page that will allow users to search for details of cards. Users will not have to be logged in. However, if they wish to add the card to anything, they will need to be logged in.
* (if time) Play Test Page: This is the page that will allow users to play test a deck.
* Forgot password page: Where users can get a password reset link


# Psuedocode:

### Before I get into nitty gritty details, lets talk about page organization. 

The following pages will be done in Django: **Note that nice features to have are in parenthesis**
    
    Home, Login, Create Account, (Forgot Password)

The following pages will be done in React:

    Dashboard, Collection, Wanted, Decks, Deck, Card, Search, (Play Test)

Pages will have the following banner across the top:
    When a user is logged out: Home        *medium gap* Search Bar *medium gap*              Login *small gap* Create Account

    When a user is logged in: Home *small gap* Dashboard *small gap* Collection *small gap* Wanted *small gap* Decks     *medium gap* Search Bar *medium gap*      Logout

Note: The search bar will only search cards based on name.

Now to plan individual pages:
* Home: Under the banner, the following is present:
    1. "MTG Card and Deck Database"
    2. "Log in to start organizing your collection, or search for cards"

* Login: Under the banner, there will be a box. Inside the box will be the following rows:
    1. "Username:" *username box*
    2. "Password:" *password box*
    3. *button saying "Login"*
    4. (*Link saying "Forgot Password?"*) *Link saying "Create Account"*

* Create Account: Under the banner there will be a box. Inside the box will be the following rows:
    1. "Username:" *username box*
    2. "Email:" *email box*
    3. "Password:" *password box*
    4. "Confirm Password:" *password box*
    5. *button saying "Create Account"*
    6. *Link Saying "Already have an account?"*

* (Forgot Password): Under the banner there will be a box. Inside the box will be the following rows:
    1. "Email:" *email box"
    2. *button saying send email

* Dashboard: Under the banner, there will be a few rows:
    1. *Link saying "View Collection"*
    2. *The images of the most recently added cards fill the row*
        Clicking on a specific card pulls up the Card Page of that card and all the cards that can fit are here.
    3. *Link saying "View Decks"*
    4. *The images of the most recently added decks fill the row*
        Clicking on a specific deck pulls up the Deck Page of that deck and all the decks that can fit are here.
    5. *Link saying "View Wanted Cards"*
    6. *The images of the most recently added cards fill the row*
        Clicking on a specific card pulls up the Card Page of that card and all the cards that can fit are here.

* Collection: Under the banner, there will be a row that allows users to filter what cards they are viewing. Then the cards themselves, paginated.
    1. *Filter Options*, check boxes for name, color - separate ones for each color , power, toughness, set, type, subtype. If a checkbox - except
        for a color - is selected, then a text box will appear next to the check box for users to type in what they want exactly they want to filter by. Then after the filter options, there will be a page selection. It will be of the type that shows the number of page currently on, then allows users to select among the next three pages in either direction and the very first and last page.
    2. *Cards*: The images for the page of at most 50 cards will be displayed. They will be in a flex box with overflow being wrap. So there will be many rows.

* Decks: Under the banner, there will be a row that allows users to filter what decks they are viewing. Then the decks themselves, paginated.
    1. *Filter Options*, check boxes for name, color - separate ones for each color. If the name checkbox is selected, then a text box will appear next to it for users to type in what to filter by. Then after the filter options, there will be a page selection. It will be of the type that shows the number of page currently on, then allows users to select among the next three pages in either direction and the very first and last page.
    2. *Cards*: The names of the decks and images of the commander (or first card) of the deck be displayed. They will be in a flex box with overflow being wrap. So there will be many rows. At most 50 decks will be on a page.

* Wanted Cards: Under the banner, there will be a row that allows users to filter what cards they are viewing. Then the cards themselves, paginated.
    1. *Filter Options*, check boxes for name, color - separate ones for each color , power, toughness, set, type, subtype. If a checkbox - except
        for a color - is selected, then a text box will appear next to the check box for users to type in what they want exactly they want to filter by. Then after the filter options, there will be a page selection. It will be of the type that shows the number of page currently on, then allows users to select among the next three pages in either direction and the very first and last page.
    2. *Cards*: The images for the page of at most 50 cards will be displayed. They will be in a flex box with overflow being wrap. So there will be many rows.

* Deck: Under the banner, there will be the following, in order:
    1. Warnings about the deck. If the deck is not a legal for the deck type, then a warning will be given here.
    2. A row/box that allows users to view the name, (deck type), commander (if applicable) of the deck. Normally, these fields will be view only. There will be an edit button in the bottom right of this. If selected, then the fields will be editable and the edit button will be replaced with a save and cancel button. If it is in 'edit mode', then a text box will appear here saying "add cards" and a button saying submit. Additionally, every card in the deck will get a minus symbol next to it. Clicking on the minus will delete the card from the deck.
    3. The cards in the deck will be sorted by type - as in land, creature, etc. There will be two columns of cards. Inside of each type, the cards will be sorted by mana value. Each row in each column will show the name of a card and its mana value. Hovering over the name will show an image of the card off to the side.

* Card: Under the banner, there will be two columns
1. The first column will have the image of the card. The second column will have
    1. Card Name: *Card Name* 
    2. Card Type: *Card Type* 
    3. Card Legalities: *legalities* 
    4. Card Set: *Set name* 
2. Add card:
3. *Integer field initialized to 1*, *Drop down box initialized to collection, but allowing wanted list and decks*, *button saying "Add"*

    

* Search: under the banner, there will be the following:
    1. "Search"
    2. "Card Name:" *text box for card name*
    3. "Color:" *Check box for each color*
    4. "Power:" *Number box for power*
    5. "Toughness:" *Number box for toughness*
    6. "Set:" *Text box for set*
    7. "Type:" *Text box for type*
    8. "Subtype:" *Text box for subtype*
    9. *Button saying "Search"*
    10. "Results:" *If needed, arrows to go between pages of results*
    11. *The results of the search. They will be a paginated row of card names. There will be at most 100 rows. Each row will have the card name and the set that card was released in.

