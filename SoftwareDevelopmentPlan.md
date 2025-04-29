# This is the software Development Plan for this project

# Stage 1: Project Requirements

### These are the features I want this project to have:

* As a user, I should be able to create an account.
* As a user, I should be able to sign in to that account.
* As a user, I should be able to delete my account.
* As a user, I should be able to search for cards (while being logged in).
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


# Stage 2: Psuedocode:

## Before I get into nitty gritty details, lets talk about page organization. 

The following pages will be done in Django: **Note that nice features to have are in parenthesis**
    
    Home, Login, Create Account, (Forgot Password)

The following pages will be done in React:

    Dashboard, Collection, Wanted, Decks, Deck, Card, Search, Create Deck, (Play Test)

Pages will have the following banner across the top:
    When a user is logged out: Home        *large gap*             Login *small gap* Create Account

    When a user is logged in: Dashboard *small gap* Collection *small gap* Wanted *small gap* Decks     *medium gap* Search Bar *small gap* search button *medium gap*      Logout

Note: The search bar will only search cards based on name.

Now to plan individual pages:
* Home: Under the banner, the following is present:
    1. "MTG Card and Deck Database"
    2. "Log in to start organizing your collection"

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
        for a color - is selected, then a text box will appear next to the check box for users to type in what they want exactly they want to filter by. Then after the filter options, there will be a page selection. It will let you move to the previous and next page
    2. *Cards*: The images for the page of at most 50 cards will be displayed. They will be in a flex box with overflow being wrap. So there will be many rows. Double clicking on a card will pull up a popup allowing the user to remove a specifiable quantity of that card from the collection.

* Decks: Under the banner, there will be a row that allows users to filter what decks they are viewing. Then the decks themselves, paginated.
    1. *Filter Options*, check boxes for name, color - separate ones for each color. If the name checkbox is selected, then a text box will appear next to it for users to type in what to filter by. Then after the filter options, there will be a page selection. It will let you move to the previous and next page. At the end of this row will be a button that says "Create Deck".
    2. *Decks*: The names of the decks and images of the commander (or first card) of the deck be displayed. They will be in a flex box with overflow being wrap. So there will be many rows. At most 50 decks will be on a page.

* Wanted Cards: Under the banner, there will be a row that allows users to filter what cards they are viewing. Then the cards themselves, paginated.
    1. *Filter Options*, check boxes for name, color - separate ones for each color , power, toughness, set, type, subtype. If a checkbox - except
        for a color - is selected, then a text box will appear next to the check box for users to type in what they want exactly they want to filter by. Then after the filter options, there will be a page selection. It will let you move to the previous and next page
    2. *Cards*: The images for the page of at most 50 cards will be displayed. They will be in a flex box with overflow being wrap. So there will be many rows. Double clicking on a card will pull up a popup allowing the user to remove a speicifiable quantity of that card from the wanted list either to the users collection or to nothing.

* Deck: Under the banner, there will be the following, in order:
    1. Warnings about the deck. If the deck is not a legal for the deck type, then a warning will be given here.
    2. A row/box that allows users to view the name, (deck type), commander (if applicable) of the deck. Normally, these fields will be view only. There will be an edit button in the bottom right of this. If selected, then the fields will be editable and the edit button will be replaced with a save and cancel button. If it is in 'edit mode', then a text box will appear here saying "add cards" and a button saying submit. Additionally, every card in the deck will get a minus symbol next to it. Clicking on the minus will delete the card from the deck.
    3. The cards in the deck will be sorted by type - as in land, creature, etc. There will be two columns of cards. Inside of each type, the cards will be sorted by mana value. Each row in each column will show the name of a card and its mana value. Hovering over the name will show an image of the card off to the side.

* Card: Under the banner, there will be two columns
    1. The first column will have the image of the card. The second column will have
        1. *Card Name* 
        2. *Card Type* 
        4. *Set name* 
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
    11. *The results of the search. They will be a paginated list of card images. There will be at most 100 cards. 

* Create Deck: Under the banner there will be the following:
    1. "Deck Type:" *Drop down list that currently only says Commander*
    2. "Deck Name:" *Text Box*
    3. (Because it is a Commander Deck) "Commander:" *Text Box*
    4. "Other Cards In Deck:" *Text Box*
    5. *Button saying "Submit"*

## Data Structures

Before we can make pseudocode, we need to plan out what data will be stored in the database. User authentication and session tokens will be taken care of by Django. So we just need to store Collections, Decks, Wanted Lists, and Card and the custom bridge tables CollectionCard, WantedCard, DeckCard

#### MyCard

Because this will be a small application only used by a few users, we will store some information about the cards in users collections, decks, and wanted list. This will save on API calls we make, because the free MTG API has a limit on the number of calls we can make. Each card will store the following information: (note: this is called myCard) because mtgsdk already uses Card

* id: Self-population
* card _name: a String, there will be an index on this
* card_id: a unique string for use with the MTG API
* colors: a list of strings
* image: a url to the image
* mana_cost: a string
* type: a string
* subtype: a string
* set: A string
* power: an integer
* toughness: an integer
* loyalty: an integer
* text: a text field
* rarity: a string

#### Collection

Collection will have a one to one relationship with users and a many to many relationship with Card. However, because we want to store the quantity, we will make a custom bridge table called CollectionCard

* id: Self-populationg
* user: User object

#### CollectionCard

This is a custom bridge table. It will have a one to many relationship with Collection and a one to many relationship with Card. It will let us store the quantity of cards a user has in their collection. It will store the following information:

* id: Self-population
* collection: Collection object
* card: Card object
* quantity: Integer
* date_added: date-time

#### Wanted

Wanted will have a one to one relationship with users and a many to many relationship with Card. However, because we will want to store the quantity, we will make a custom bridge table called WantedCard. It will store the following:

* id: Self-population
* user: User object
* date_added: date-time

#### WantedCard

This is a custom bridge table. It will have a one to one to many relationship with Wanted and a one to many relationship with Card. It will store the following:

* id: Self-populating
* wanted: Wanted objec
* card: Card object
* quantity: Integer

#### Deck

Deck will have a one to many relationship with user and a many to many relatioship with Card. However, because we will want to store the quantity, we will make a custom bridge table called DeckCard. It will store the following:

* id: Self-population
* user: User object
* format: String
* description: String
* name: String
* colors: JSON
* image: url
* creation date
* last updated date

#### DeckCard

DeckCard is a custom bridge table. It will have a one to many relationship with Deck and a one to many relationship with Card. It will store the following:

* id: Self-population
* deck: Deck object
* card: Card object
* quantity: integer

## Django Endpoints

Now we are ready to build pseudocode for the endpoints in Django.

#### "/home"
    ```python
    def index(res):
        return and render the home page
    ```

#### "/registration/sign_in/"
    Given in Starter Code.

#### "/registration/sign_up/"
    Given in Starter Code
    Additionally, create a Collection and Wanted for the user.

#### "/registration/logout/"
    Given in Starter Code

#### "/create_deck/"
    Creates a deck in the database
    Input: dictionary in JSON
        "name": name of the deck
        "type": the type of deck to create
        "cards": a (possibly empty) list of cards to add to the deck
        "description": a (possibly empty) string saying the description of the deck
    Output: dictionary in JSON
        "success": True if creation was successful, false otherwise
        "name": name of the deck

    ```python
    def create_deck(req):
        extract the name of deck
        if it is a commander deck:
            extract the name of the commander
        extract the list of cards to add (might be none)
        create the deck
        if it is a commander deck:
            add the commander to the deck
        for every card in the list of cards to add:
            add the card to the deck
        return the deck in an HTTP Response
    ```

#### "/add_cards_to_deck/"
    Adds cards to a deck
    Input: Dictionary in JSON
        cards: List of cards to add 
        "deck_id": ID of deck
    Output: JsonResponse of a dictionary:
        "card_data": List of errors or card details
        "deck_exists": True or False, depending on whether the deck exists in the database

    ```python
    def add_cards(req):
        extract the name of the deck/Collection from the request
        extract the list of cards to add (might only be one)
        find the deck in the database
        if the deck/Collection does not exist, return an error in an HTTP Response
        create an empty list to return
        for every card in the list of cards:
            if the card is not already in the database:
                get the card details from the API
            else: 
                get card details from the API
                add card to database
            if the card does not exist, add an error message to the 'empty list'
            if the card exists, add card details to the 'empty list'
            add the card to the deck
        return the 'empty list' in an HTTP Response
    ```

#### "/add_cards_to_collection"
    functionally, the same as "/add_cards_to_deck/"

#### "/add_cards_to_wanted/"
    functionally, the same as "/add_cards_to_deck/"

#### "/remove_card_from_deck/"
    Removes a Card from a Deck (and the database if possible)
    Input: Dictionary in JSON
        "cards": List of cards to remove (only has their mtgsdk ids)
        "deck_id": id of deck to remove from
    Output: Dictionary in JSON
        "card_data": List of errors or card details
        "deck_exists": True or False, depending on whether the deck/Collection exists in the database

    ```python
    def remove_cards(req):
        extract the name of the deck/Collection from the request
        extract the list of cards to remove (might only be one)
        find the deck in the database
        if the deck/Collection does not exist, return an error in an HTTP Response
        create an empty list to return
        for every card in the list of cards:
            if the card is not already in the database:
                add an error message to the 'empty list'
            else if the card is not in the deck/Collection:
                add an error message to the 'empty list'
            else: 
                remove the card from the deck/Collection
                If the card is not in any other deck/Collection:
                    remove it from the database
                if the card exists, add card details to the 'empty list'
        return the 'empty list' in an HTTP Response
    ```
#### "/remove_card_from_collection/"
    functionally the same as "/remove_card_from_deck/"

#### "/remove_card_from_wanted/"
    functionally the same as "/remove_card_from_deck/"

#### "/get_card_details/"
    This gets details about a card
    Input: Dictionary in JSON
        card id: the mtgsdk id of the card
    Output: Dictionary in JSON
        card: the details of the card
    pseudocode:

    ```python
    def get_card_details(req):
        verify the card id was sent in the request
        send a request to the mtgsdk for details on the card
        bundle that request inside of a dictionary and return it
    ```

#### "/search_database/"
    This performs a search in the mtgsdk for card details
    Input: Dictionary in JSON (from query string)
        includes many filter options
    Output: Dictionary in JSON
        cards: a list of dictionaries of card details
    pseudocode:

    ```python
    def search_database(req){
        get num_cards and page from request
        search the mtgsdk database for cards based on the filter options
        return the search results
    }
    ```

#### "/sample_collection/"
    This grabs the most recent cards that have been added to the collection
    Input: Dictionary in JSON
        num_cards: the maximum number of cards to return
        page: the page of results
    Output: Dictionary in JSON
        cards: the list of cards
        numpages: the number of pages with this many cards

    ```python
    def sample_collection(req):
        unpack the input dictionary from the request. 
        If num_cards isn't in the dictionary, return an error
        grab the collection from the user
        if the page is too high, return an error
        grab the most recently added cards to the collection from the database
        chop off all but (at most) num_cards of them at that page
        return them in a JSON
    ```

#### "/sample_wanted/"
    This grabs the most recent cards that have been added to the wanted list
    Input: Dictionary in JSON
        num_cards: the maximum number of cards to return
        page: the page of results
    Output: Dictionary in JSON
        cards: the list of cards
        numpages: the number of pages with this many cards

    ```python
    def sample_wanted(req):
        get num_cards and page from the query string
        grab the wanted from the user
        if the page is too high, return an error
        grab the most recently added cards to the wanted from the database
        chop off all but (at most) num_cards of them at that page
        return them in a JSON
    ```

#### "/sample_decks/"
    This grabs the most recently edited decks
    Input: Dictionary in JSON
        num_decks: the maximum number of decks to return
        page: the page of results
    Output: Dictionary in JSON
        decks: the list of decks
        numpages: the number of pages with this many decks

    ```python
    def sample_decks(req):
        get num_decks and page from the query string
        grab the most recently edited decks from the database
        if the page is too high, return an error
        chop off all but (at most) num_decks of them at that page
        return them in a JSON
    ```

#### "/search_collection/"
    This performs a search on the cards in the collection
    Input: Dictionary in query
        num_cards: the maximum number of cards to return
        page: the page of results (number)
        name: the name of the card (string)
        colors: a dictionary of colors (string)
        set: the name of the set (string)
        type: the type of the card (string)
        subtype: the subtype of the card (string)
        power: the power of the card (int)
        toughness: the toughness of the card (int)
    Output: Dictionary in JSON
        cards: a list of collection_cards
        num_pages: how many pages of results there are
    Pseudocode:

    ```python
    def search_collection(req):
        get num_cards and page from the query string
        get name from the query string
        get colors from the dictionary
        ...
        get power from the dictionary (default value of -1)
        get toughness from the dictionary (default value of -1)
        filter the collection for cards that contain the name (store in cards)
        if the colors is not an empty list, for each color in the list:
            filter the cards by if they have that color
        if the set is not an empty string:
            filter the cards by if they are in that set
        if the type is not an empty string:
            filter the cards by if they are that type
        if the subtype is not an empty string:
            filter the cards by if they are that subtype
        if the power is not -1:
            filter the cards by if they are that power
        if the toughness is not -1:
            filter the cards by if they are that toughness
        paginate the cards by num_cards
        return a dictionary containing cards and num_pages
    ```

#### "/search_wanted/"
    This performs a search on the cards in the wanted
    Input: Dictionary in JSON 
        num_cards: the maximum number of cards to return
        page: the page of results (number)
        name: the name of the card (string)
        colors: a dictionary of colors (string)
        set: the name of the set (string)
        type: the type of the card (string)
        subtype: the subtype of the card (string)
        power: the power of the card (int)
        toughness: the toughness of the card (int)
    Output: Dictionary in JSON
        cards: a list of cards
        num_pages: how many pages of results there are
    Pseudocode:

    ```python
    def search_wanted(req):
        get the dictionary from the body
        if num_cards or page are missing, return an error
        get name from the dictionary
        get colors from the dictionary
        ...
        get power from the dictionary (default value of -1)
        get toughness from the dictionary (default value of -1)
        filter the wanted for cards that contain the name (store in cards)
        if the colors is not an empty list, for each color in the list:
            filter the cards by if they have that color
        if the set is not an empty string:
            filter the cards by if they are in that set
        if the type is not an empty string:
            filter the cards by if they are that type
        if the subtype is not an empty string:
            filter the cards by if they are that subtype
        if the power is not -1:
            filter the cards by if they are that power
        if the toughness is not -1:
            filter the cards by if they are that toughness
        paginate the cards by num_cards
        return a dictionary containing cards and num_pages
    ```

#### "search_decks"
This performs a search on the users decks
    Input: Dictionary in JSON 
        num_decks: the maximum number of decks to return
        page: the page of results (number)
        name: the name of the deck (string)
        colors: a dictionary of colors (string)
    Output: Dictionary in JSON
        decks: a list of decks
        num_pages: how many pages of results there are
    Pseudocode:

    ```python
    def search_decks(req):
        get the dictionary from the body
        if num_decks or page are missing, return an error
        get name from the dictionary
        get colors from the dictionary
        filter the deckslist for decks that contain the name (store in decks)
        if the colors is not an empty list, for each color in the list:
            filter the decks by if they have that color
        paginate the decks by num_decks
        return a dictionary containing decks and num_pages
    ```

#### "/":
    Does React Stuff
    Given in Starter Code

## React Components

#### "Header"
    Props: This doesn't have props
    Uses: This will be used on every page that has a header (so every single page)
    Output: the .jsx (html?) of the header
    Psuedocode:
    ```jsx
    export function Header() {
        return(
            <>
                create a div with the className "header"
                    create a div with the className "left_side"
                        create a link saying "Dashboard" and staying in reactRouter to go to "/dashboard"
                        create a link saying "Collection" and staying in reactRouter to go to "/collection"
                        create a link saying "Wanted" and staying in reactRouter to go to "/wanted"
                        create a link saying "Decks" and staying in reactRouter to go to "/decks"
                    create a div with the className "center"
                        Display a search bar with default text "Search Cards"
                        Display a button with text "Search"
                    create a div with the className "right_side"
                        create a link saying "Logout" and leaving reactRouter to go to "/registration/logout/"
                a div with className "header_filler"
            </>
        )
    }
    ```

#### "Input"
    props: This takes in state variables (for state hoisting purposes)
    Uses: this is a component. It will be used to collect input
    Output: JSX
    Pseudocode:

    ```jsx
    export function Input({label, ...props}){
        return(
            label with className "input_label"
                the label
                Input with className="input", and the props ({...props})
        )
    }
    ```
#### "Error"
    props: 
        errorMessage: the error message
    Uses: this is a component. It is used to output errors on the screen
    Output: JSX
    Pseudocode:

    ```jsx
    export function Error(errorMessage){
        return (
            div with className "error_message" and text errorMessage
        )
    }
    ```


## Reach Custom Hooks
The following are custom hooks that this project will use

#### getLogout
    Props: none
    Uses: gets a function to call to use to logout
    Output: a function that can be called
    Pseudocode:

    ```jsx
    export function getLogout() {
        async function logout() {
            send a request to the server to logout

            if the request is ok:
                go to the sign in page
            else:
                show a popup error
        }
        return logout;
    }   
    ```

#### "getRequest"
    Input: 
        none. but the returned function has the following input:
            uri: where to send the request
            method="GET": an optional request method
            body=null: an optional body for the request
            headers =  {"Content-Type": "application/json", "X-CSRFToken": Cookies.get("csrftoken")}: and optional header
    Uses: to make requests from the Django server
    Output: 
        a function to call to make the request
    Pseudocode:

    ```jsx
    export function getRequest(){
        async function request(
            uri,
            method="GET",
            body=null
            headers =  {"Content-Type": "application/json", "X-CSRFToken": Cookies.get("csrftoken")} 
        ){
            const options = {
                method,
                credentials: "same-origin",
                headers,
            }
            if (method !== GET){
                options.body = body
            }
            const response = await fetch('uri/to/request', options);
            // Generically handle errors
            // Handle Parsing
            return response;
            
        }
    }
    ```

#### "useSampleCollection"
    Input:
        numCards: the number of cards to return
        pageNum: the page number of the paginated results
    Uses: This will be used on the Dashboard to show collection cards
    Output: a function to call to get the list of cards
    Psuedocode:

    ```jsx
    export function SampleCollection(numCards, pageNum){
        set sample to be a state variable
        define an async function fetchCollectionCards(){
            make a request to the server requesting numCards cards on pageNum
            if the request is OK:
                set sample to be a state variable
            otherwise:  
                return the error message
        }
        define a useEffect that will call fetCollectionCards exactly once
        return sample
    }
    ```

#### "SampleWanted"
    Input:
        numCards: the number of cards to return
        pageNum: the page number of the paginated results
    Uses: This will be used on the Dashboard to show wanted cards
    Output: a list of cards
    Psuedocode:

    ```jsx
    export function SampleWanted(numCards, pageNum){
        set a 'sample' to be a state variable
        define an async function fetchWantedCards(){
            make a request to the server requesting numCards cards on pageNum
            if the request is OK:
                update 'sample' to be the list of cards
            otherwise:  
                output an error message
        }
        create a side effect that will run only once{
            call fetchWantedCards()
        }
        return 'sample'
    }
    ```

#### "SampleDecks"
    Input:
        numDecks: the number of cards to return
        pageNum: the page number of the paginated results
    Uses: This will be used on the Dashboard to show decks
    Output: a list of decks
    Psuedocode:

    ```jsx
    export function SampleDecks(numDecks, pageNum){
        set a 'sample' to be a state variable
        define an async function fetchDecks(){
            make a request to the server requesting numDecks decks on pageNum
            if the request is OK:
                update 'sample' to be the list of decks
            otherwise:  
                output an error message
        }
        create a side effect that will run only once{
            call fetchDecks()
        }
        return 'sample'
    }
    ```

## Reach Pages

#### "Layout"
    Props: This doesn't have any props
    Uses: This will be the template for every page
    Output: JSX
    Pseudocode:
    ```jsx
    export default Layout(){
        <Header />
        <main>
            <Outlet />
        </main>
    }
    ```

#### "Dashboard"
    Props: This doesn't have any props
    Uses: This will be one of the router pages
    Output: JSX
    Pseudocode:
    ```jsx
    export function Dashboard(){
        make collectionCards a state variable
        make wantedCards a state variable
        make decks a state variable

        set collectionCards equal to SampleCollection(10,1)
        set wantedCards equal to sampleCollection(10,1)
        set decks equal to sampleDecks(10,1)

        return (
            <>
                a link saying "View Collection", leading (within reactRouter) to the collection page
                a div with className equal to "collection_cards"
                    map all the cards in collectionCards to an image with the cards URL and when clicked, lead to (within reactRouter) that card's page
                a link saying "View Decks", leading (within reactRouter) to the decks page
                a div with className equal to "decks"
                    map all the decks in decks to an image with the decks URL and when clicked, lead to that deck's page
                a link saying "View Wanted Cards", leading (within reactRouter) to the wanted page
                a div with className equal to "wanted_cards"
                    map all the cards in wantedCards to an image with the cards URL and when clicked, lead to (within reactRouter) that card's page
            </>
        )
    }
    ```

#### "Collection"
    props: this doesn't use any props
    Uses: this is one of the router pages
    Output: JSX
    Style Notes: 
        the search filter will have multiple rows, each row with a checkbox to turn on and off the search feature
        the error message will be the same across pages, a white box with red border
        when a card is selected, the popup will be on the top of the page, but not covering the header (the popup will be two columns)
            then a gray backdrop will appear behind all the cards and header buttons but in front of everything else
    Pseudocode:

    ```jsx
    export function Collection() {
        create state variables for the search bar:
            "nameBox" (to turn on name search), "name" (to search by name), "colorBox", "red", "blue", "white", "black", "green", "powerBox", "power", "toughnessBox", "toughness", "setBox", "set", "typeBox", "type", "subtypeBox", "subtype"
        create a state variable "cards": to hold the list of cards returned by the search
        create a state variable "isPrevious": to say whether there is a previous page
        create a state variable "isNext": to say whether there is a next page
        create a state variable "page": to say the current page number
        create a state variable "isError": to say whether an error showed up in the search
        create a state variable "errorMessage": to be the message of the error
        create a state variable "isCardSelected": to say whether or not a card has been double clicked on
        create a state variable "selectedCard": to be the double clicked card
        create a state variable "isMoveToWanted": to show whether the card will be moved to the wanted collection
        create a state variable "amountToRemove": the number of cards to remove from the collection
        create a state variable "amountToWant": the number of cards to add to the wanted collection
        
        create an asyncronous function doSearch(){
            send the search request to the Django server
            if the request is a success:
                update the cards
                if there is a next page, set isNext to true
                if there is a previous page, set isPrevious to true
            if the request is a failure:
                set isError to true
                say an error occured in the search
                in 7 seconds, set isError to false
        }

        create an asynchronous function removeFromCollection(){
            send a remove request to the Django server
            if the request is a success:
                if the user wants to add the card to the wanted list:
                    send the add request to the Django server
                    if that request is a success:
                        remove the card from the list of cards
                        call doSearch to refresh collection page
                    if that request is a failure
                        set isError to true
                        say an error occured adding to wanted
                        in 7 seconds, set isError to false
            if the request is a failure:
                set isError to true
                say an error occured removing from collection
                in 7 seconds, set isError to false
        }

        create a side effect that calls the search on initial load

        return(
            <>
                if isError is true: a div with className "error_message" and text errorMessage; else: nothing
                if isCardSelected: a div with className "popup"; else: nothing
                    a div with className "left_side"
                        a h3 header saying "Remove from Collection"
                        a div saying the card name
                        an Input with label="Quantity to remove", type=number, value=amountToRemove, onChange = update amountToRemove (ensuring it doesn't exceed the amount in collection)
                        an Input with label="Add to Wanted", type="Checkbox", value="isMoveToWanted", onChange = update isMoveToWanted
                        if isMoveToWanted: an Input with label "Amount to add to Wanted", type=number, value=amountToWant, onChange = update amountToWant (ensuring it doesn't exceed the amount in collection)
                    a div with className "right_side"
                        the image of the card
                    A button saying submit that when pressed, calls removeFromCollection
                if isCardSelected: a div with className "cover"; else nothing
                A header saying "Collection"
                a div with className "filter_container"
                    a div with className "filter_row"
                        an Input with label="Name", type="Checkbox", value=name_box, onChange=(e => update name_box), className="checkbox"
                        if name_box is true, an input with className="search_bar", type="text", value=name, onChange(update name)
                    a div with className "filter_row"
                        an Input with label="Color", type="Checkbox", value="color_box", onChange=(update name), className="checkbox"
                        if color_box is true, a checkbox for Red, Blue, White, Black, Red
                    repeat this process for power, toughness, set, type, subtype (correct input types for each)
                    a button with className = "submit" and text "Search" and onClick= call doSearch
                a div with className "page_selection"
                    a div with className "left_side"
                        If there is a prior page of results, display a previous arrow with onClick = update page then call doSearch
                    a div with className "right_side"
                        If there is a next page of results, display a next arrow with onClick = update page then call doSearch
                a div with className "display_container" with when clicked
                    for every card in cards:
                        create an image with the src being the URL from the card, and when clicked redirects to that card's page (card/cardID)
                        when double clicking on the card (dblclick), set isCardSelected to true and selectedCard to this card
            </>
        )
    }
    ```

#### "Decks"
    props: This doesn't use any props
    Uses: This is one of the router pages
    Output: JSX
    Style Notes:
        the search filter will have multiple rows, each row with a checkbox to turn on and off the search feature
        the error message will be the same across pages, a white box with red border
    Pseudocode:

    ```jsx
    export function Decks(){
        create state variables for the search bar: "nameBox", "name", "colorBox", "red", "blue", "white", "black", "green" 
        create a state variable "decks": to hold the list of decks
        create a state variable "isPrevious": to say whether there is a previous page
        create a state variable "isNext": to say whether there is a previous page

        create an asynchronous function doSearch(){
            send the search request to the Django server
            if the request is a success:
                update the decks
                if there is a next page, set isNext to true
                if there is a previous page, set isPrevious to true
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }
        

        return(
            <>
                if isError is true: a div with className "error_message" and text errorMessage; else: nothing
                A header saying "Decks"
                a button saying "Create New Deck"
                a div with className "filter_container"
                    a div with className "filter_row"
                        an Input with label="Name", type="Checkbox", value=name_box, onChange=(e => update name_box), className="checkbox"
                        if name_box is true, an input with className="search_bar", type="text", value=name, onChange(update name)
                    a div with className "filter_row"
                        an Input with label="Color", type="Checkbox", value="color_box", onChange=(update name), className="checkbox"
                        if color_box is true, a checkbox for Red, Blue, White, Black, Red
                    a button with className = "submit" and text "Search" and onClick= call doSearch
                a div with className "page_selection"
                    a div with className "left_side"
                        If there is a prior page of results, display a previous arrow with onClick = update page then call doSearch
                    a div with className "right_side"
                        If there is a next page of results, display a next arrow with onClick = update page then call doSearch
                a div with className "display_container" with when clicked
                    for every deck in decks:
                        create an image with the src being the URL from the deck, and when clicked redirects to that deck's page (deck/cardID)
            </>
        )
    }
    ```

#### "Wanted"
    props: this doesn't use any props
    Uses: this is one of the router pages
    Output: JSX
    Style Notes: 
        the search filter will have multiple rows, each row with a checkbox to turn on and off the search feature
        the error message will be the same across pages, a white box with red border
        when a card is selected, the popup will be on the top of the page, but not covering the header (the popup will be two columns)
            then a gray backdrop will appear behind all the cards and header buttons but in front of everything else
    Pseudocode:

    ```jsx
    export function Wanted() {
        create state variables for the search bar:
            "name_box" (to turn on name search), "name" (to search by name), "color_box", "red", "blue", "white", "black", "green", "power_box", "power", "toughness_box", "toughness", "set_box", "set", "type_box", "type", "subtype_box", "subtype"
        create a state variable "cards": to hold the list of cards returned by the search
        create a state variable "isPrevious": to say whether there is a previous page
        create a state variable "isNext": to say whether there is a next page
        create a state variable "page": to say the current page number
        create a state variable "isError": to say whether an error showed up in the search
        create a state variable "errorMessage": to be the message of the error
        create a state variable "isCardSelected": to say whether or not a card has been double clicked on
        create a state variable "selectedCard": to be the double clicked card
        create a state variable "isMoveToCollection": to show whether the card will be moved to the wanted collection
        create a state variable "amountToRemove": the number of cards to remove from the collection
        create a state variable "amountToCollection": the number of cards to add to the wanted collection
        
        create an asyncronous function doSearch(){
            send the search request to the Django server
            if the request is a success:
                update the cards
                if there is a next page, set isNext to true
                if there is a previous page, set isPrevious to true
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }

        create an asynchronous function removeFromWanted(){
            send a remove request to the Django server
            if the request is a success:
                if the user wants to add the card to the Collection:
                    send the add request to the Django server
                    if that request is a success:
                        remove the card from the printed list of cards
                        call doSearch to refresh wanted page
                    if that request is a failure
                        set isError to true
                        set errorMessage to the message in the request
                        in 7 seconds, set isError to false
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }

        return(
            <>
                if isError is true: a div with className "error_message" and text errorMessage; else: nothing
                if isCardSelected: a div with className "popup"; else: nothing
                    a div with className "left_side"
                        a h3 header saying "Remove from Wanted"
                        a div saying the card name
                        an Input with label="Quantity to remove", type=number, value=amountToRemove, onChange = update amountToRemove (ensuring it doesn't exceed the amount in collection)
                        an Input with label="Add to Collecction", type="Checkbox", value="isMoveToCollection", onChange = update isMoveToCollection
                        if isMoveToCollection: an Input with label "Amount to add to Collection", type=number, value=amountToColllection, onChange = update amountToColllection (ensuring it doesn't exceed the amount in wanted)
                    a div with className "right_side"
                        the image of the card
                    A button saying submit that when pressed, calls removeFromWanted
                if isCardSelected: a div with className "cover"; else nothing
                A header saying "Wanted"
                a div with className "filter_container"
                    a div with className "filter_row"
                        an Input with label="Name", type="Checkbox", value=name_box, onChange=(e => update name_box), className="checkbox"
                        if name_box is true, an input with className="search_bar", type="text", value=name, onChange(update name)
                    a div with className "filter_row"
                        an Input with label="Color", type="Checkbox", value="color_box", onChange=(update name), className="checkbox"
                        if color_box is true, a checkbox for Red, Blue, White, Black, Red
                    repeat this process for power, toughness, set, type, subtype (correct input types for each)
                    a button with className = "submit" and text "Search" and onClick= call doSearch
                a div with className "page_selection"
                    a div with className "left_side"
                        If there is a prior page of results, display a previous arrow with onClick = update page then call doSearch
                    a div with className "right_side"
                        If there is a next page of results, display a next arrow with onClick = update page then call doSearch
                a div with className "display_container"
                    for every card in cards:
                        create an image with the src being the URL from the card, and when clicked redirects to that card's page (card/cardID)
                        when double clicking on the card (dblclick), set isCardSelected to true and selectedCard to this card
            </>
        )
    }
    ```

#### "Deck/deckID"
    props: this has no props
    Uses: this is one of the router pages
    Output: JSX
    Style Notes: 
        the warning will be a whole row on the page. It will not be a popup
        the error message will be the same across pages, a white box with red border
        when a card is selected, the popup will be on the top of the page, but not covering the header (the popup will be two columns)
            then a gray backdrop will appear behind all the cards and header buttons but in front of everything else
    Pseudocode:

    ```jsx
    export function Deck(){
        create a state variable "cards": to hold the cards in the deck
        create a state variable "deckType": to hold the Type of the deck
        create a state variable "commander": to hold the commander, if it is a commander deck
        create a state variable "name": to hold the name of the deck
        create a state variable "isLegal": to state whether the deck is legal in the given Type (format)
        create a state variable "legalReason": to hold why the deck is illegal, if it is
        create a state variable "isInEditMode": to state whether the deck is in edit move
        create a state variable "cardToRemove": to hold the card to remove
        create a state variable "cardToAdd": to hold the card to add
        create a state variable "isError": to state whether there was an error
        create a state variable "errorMessage": to hold the error message
        create a state variable "newName": to hold a new name
        create a state variable "newDeckType": to hold a new deck type
        create a state variable "newCommander": to hold a new commander
        create a state variable "isHoveringOnCard": to say whether the user is hovering over a card
        create a state variable "hoveredCard": to whold which card is being hovered over

        create a sideEffect to get the deck from the server when the page is initially loaded (e =>{
            request the deck from the Django server
            if the request is ok:
                set cards equal to the card list
                sort the cards by color and type
                set deckType equal to the deckType given
                set name equal to the name given
                if the deckType is commander:
                    set the commander to the given commander
            else:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        },[])
        
        create an asynchronous function removeFromDeck(){
            remove the card from cards
            make the request
            if the request is not ok:
                add the card back to cards
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }
        create an asynchronous function addToDeck(){
            make the request to the server
            if the request is a success:
                add the card to cards
                sort the cards by color and type
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false

        }
        create an asynchronous function editDeck(){
            change the name
            change the commander
            if there are cards to remove:
                call removeFromDeck
            change isInEditMode to false
            make the request to the server
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request and ask them to reload the page
                in 7 seconds, set isError to false
        }
        create an asynchronous function changeEditMode(){
            if isInEditMode:
                set isInEditMode to false
            else:
                set newName to the value of Name
                set newCommander to the value of Commander
                set newDeckType to the value of deckType
                set cardToRemove to null
                set isInEditMOde to true
        }
        create an asynchronous function hoverOnCard(){
            
        }

        return (
            <>
                if not isLegal: a div with className "warning" and text legalReason
                a div h2 with text "View Deck"
                a div with className "deck_header"
                    if isInEditMode:
                        an Input with label="Name", type="text", value=newName, onChange = edit newName, className="deck_input"
                        an Input with label="Deck Type", type="text", value=newDeckType, onChange= edit newDeckType, className="deck_input"
                        if the deckType is commander:
                            an Input with label="Commander", type="text", value=newCommander, onChange=edit newCommmander, className="deck_input"
                        a button sith className="edit_button" and value "Cancel" and when pressed calls changeEditMode
                        a button sith className="edit_button" and value "Save" and when pressed calls editDeck
                    else:
                        a div with className="deck_parameter" and value="Name: " + Name 
                        a div with className="deck_parameter" and value="Deck Type: " + deckType 
                        if the deckType is commander:
                            a div with className="deck_parameter" and value="Commander" + Commander
                        a button sith className="edit_button" and value "Edit" and when pressed calls changeEditMode
                    an Input with label="Add card", type="text", value=cardToAdd, onchange = update cardToAdd, className="add_card"
                    a button with className="edit_button", and value "Add Card" and when pressed calls addCard
                a div with className "deck_display_container"
                    a div with className "deck_display_header" and text "Creatures"
                        for every card in cards:
                            if the card is a creature:
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true & onmouseout sets isCardHovering to false
                                    create a div with className "card_mana" and the text be the mana cost of the card
                    a div with className "deck_display_header" and text "Instants"
                        for every card in cards:
                            if the card is a instant:
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true & onmouseout sets isCardHovering to false
                                    create a div with className "card_mana" and the text be the mana cost of the card
                                    if isInEditMode:
                                        create a div with className "card_removal" and the text to be a minus that when pressed, adds the card to cardsToRemove and removes it from cards
                    a div with className "deck_display_header" and text "Sorceries"
                        for every card in cards:
                            if the card is a sorcery:
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true & onmouseout sets isCardHovering to false
                                    create a div with className "card_mana" and the text be the mana cost of the card
                                    if isInEditMode:
                                        create a div with className "card_removal" and the text to be a minus that when pressed, adds the card to cardsToRemove and removes it from cards
                    a div with className "deck_display_header" and text "Enchantments"
                        for every card in cards:
                            if the card is a enchantment (and nothing prior):
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true & onmouseout sets isCardHovering to false
                                    create a div with className "card_mana" and the text be the mana cost of the card
                                    if isInEditMode:
                                        create a div with className "card_removal" and the text to be a minus that when pressed, adds the card to cardsToRemove and removes it from cards
                    a div with className "deck_display_header" and text "Artifacts"
                        for every card in cards:
                            if the card is a artifact (and nothing prior):
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true, onmouseout sets isCardHovering to false, if it is owned, make it have a green border
                                    create a div with className "card_mana" and the text be the mana cost of the card
                                    if isInEditMode:
                                        create a div with className "card_removal" and the text to be a minus that when pressed, adds the card to cardsToRemove and removes it from cards
                    a div with className "deck_display_header" and text "Lands"
                        for every card in cards:
                            if the card is a land (and nothing prior):
                                create a div with className "card_info"
                                    create a div with className "card_name" and text name of card and onmouseover sets the hoveredCard to this card and isCardHovering to true & onmouseout sets isCardHovering to false
                                    create a div with className "card_mana" and the text be the mana cost of the card
                                    if isInEditMode:
                                        create a div with className "card_removal" and the text to be a minus that when pressed, adds the card to cardsToRemove and removes it from cards
            </>
        )
    }
    ```

#### "Card/cardid"
    props: this has no props
    Uses: this is a page
    Output: JSX
    
    Pseudocode:

    ```jsx
    export function Card(){
        create a state variable "name" that will hold the card name
        create a state variable "type" that will hold the card type
        create a state variable "set" that will hold the set
        create a state variable "image" that will hold the card image url
        create a state variable "amountToAdd" that will hold the amount to add to something
        create a state variable "whereToAdd" that will hold where to add the card (Collection, Wanted, or Deck)
        create a state variable "deckToAddTo" that will hold the name of the deck to add the card to (if we are adding to a deck)
        create a state variable "decks" that will hold the names of the decks of the user (a list of dictionaries)
        create a state variable "isError" to say whether there was an error
        create a state variable "errorMessage" to say the error message

        create a a side effect that will only load once(() =>{
            get the decks from the Django Server
            if the request is a success:
                store the decks in the variable decks
            else:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
            get the card details from the Django server
            if the request is a success:
                store the name, type, set, and url in the state variables
            else:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        },[])

        create an async function addCards(){
            if whereToAdd is "collection":
                add the card to the collection by sending a request to the Django server
            else if whereToAdd is "wanted":
                add the card to the wanted by sending a request to the Django server
            else if whereToAdd is "deck":
                add the card to the specified deck by sending a request to the Django server
            if the request is not a success:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }

        return(
            <>
                a div with className "column"
                    a div with className "left_side"
                        a url with src = image and className="card_image"
                    a div with className "right_side"
                        a div with text name and className="card_details"
                        a div with text type and className="card_details"
                        a div with text set and className="card_details"
                a div with className "addCard"
                    a span with text "Add" 
                    a number input that is based on amountToAdd (ensure it doesn't go below one)
                    a span with text "copies of this card to"
                    an dropdown menu with options "my Collection", "my Wanted", and "my deck", with values "collection", "wanted," and "deck" respectively and onChange updates whereToAdd
                    if whereToAdd is "deck":
                        a dropdown menu with options being decknames and values being deck ids and onChange updates deckToAddTo
                a button saying "Add Card" that when pressed, calls addCard
            </>
        )
    }
    ```

#### "Search"
    props: this doesn't use any props
    Uses: this is one of the router pages
    Output: JSX
    Style Notes: 
        the search filter will have multiple rows, each row with a checkbox to turn on and off the search feature
        the error message will be the same across pages, a white box with red border
        when a card is selected, the popup will be on the top of the page, but not covering the header (the popup will be two columns)
            then a gray backdrop will appear behind all the cards and header buttons but in front of everything else
    Pseudocode:

    ```jsx
    export function Search() {
        create state variables for the search bar:
            "name_box" (to turn on name search), "name" (to search by name), "color_box", "red", "blue", "white", "black", "green", "power_box", "power", "toughness_box", "toughness", "set_box", "set", "type_box", "type", "subtype_box", "subtype"
        create a state variable "cards": to hold the list of cards returned by the search
        create a state variable "isPrevious": to say whether there is a previous page
        create a state variable "isNext": to say whether there is a next page
        create a state variable "page": to say the current page number
        create a state variable "isError": to say whether an error showed up in the search
        create a state variable "errorMessage": to be the message of the error
        create a state variable "isCardSelected": to say whether or not a card has been double clicked on
        create a state variable "selectedCard": to be the double clicked card
        create a state variable "whereToAdd" that will hold where to add the card (Collection, Wanted, or Deck)
        create a state variable "deckToAddTo" that will hold the name of the deck to add the card to (if we are adding to a deck)
        create a state variable "amountToAdd" that will hold the amount to add to something
        create a state variable "decks" that will hold the names of the decks of the user (a list of dictionaries)
        
        create a side effect that will only run once(
            get the decks from the server
            if the request is a success:
                store them in the variable decks
            else:
                post the error on the screen as usual
        ,[])

        create an asyncronous function doSearch(){
            send the search request to the Django server
            if the request is a success:
                update the cards
                if there is a next page, set isNext to true
                if there is a previous page, set isPrevious to true
            if the request is a failure:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }

        create an async function addCards(){
            if whereToAdd is "collection":
                add the card to the collection by sending a request to the Django server
            else if whereToAdd is "wanted":
                add the card to the wanted by sending a request to the Django server
            else if whereToAdd is "deck":
                add the card to the specified deck by sending a request to the Django server
            if the request is not a success:
                set isError to true
                set errorMessage to the message in the request
                in 7 seconds, set isError to false
        }

        return(
            <>
                if isError is true: a div with className "error_message" and text errorMessage; else: nothing
                if isCardSelected: a div with className "popup"; else: nothing
                    a div with className "addCard"
                        a span with text "Add" 
                        a number input that is based on amountToAdd (ensure it doesn't go below one)
                        a span with text "copies of this card to"
                        an dropdown menu with options "my Collection", "my Wanted", and "my deck", with values "collection", "wanted," and "deck" respectively and onChange updates whereToAdd
                        if whereToAdd is "deck":
                            a dropdown menu with options being decknames and values being deck ids and onChange updates deckToAddTo
                    a button saying "Add Card" that when pressed, calls addCard
                if isCardSelected: a div with className "cover"; else nothing
                A header saying "Search"
                a div with className "filter_container"
                    a div with className "filter_row"
                        an Input with label="Name", type="Checkbox", value=name_box, onChange=(e => update name_box), className="checkbox"
                        if name_box is true, an input with className="search_bar", type="text", value=name, onChange(update name)
                    a div with className "filter_row"
                        an Input with label="Color", type="Checkbox", value="color_box", onChange=(update name), className="checkbox"
                        if color_box is true, a checkbox for Red, Blue, White, Black, Red
                    repeat this process for power, toughness, set, type, subtype (correct input types for each)
                    a button with className = "submit" and text "Search" and onClick= call doSearch
                a div with className "page_selection"
                    a div with className "left_side"
                        If there is a prior page of results, display a previous arrow with onClick = update page then call doSearch
                    a div with className "right_side"
                        If there is a next page of results, display a next arrow with onClick = update page then call doSearch
                a div with className "display_container"
                    for every card in cards:
                        create an image with the src being the URL from the card, and when clicked redirects to that card's page (card/cardID)
                        when double clicking on the card (dblclick), set isCardSelected to true and selectedCard to this card
            </>
        )
    }
    ```
    
#### "Create Deck
    props: this has no props
    Uses: this is one of the router pages
    Output: JSX

    Pseudocode:

    ```jsx
    export function CreateDeck(){
        create a state variable "name": this will hold the name of the deck
        create a state variable "type": this will hold the Type of the deck
        create a state variable "commander": this will hold the commander if it is a commander deck
        create a state variable "cards": this will hold the other cards in the deck

        create a async function create(){
            send the request to the Django server
            if the request is a success:
                go to the page of the deck that was created
            if the request is not a success:
                do the normal error stuff
        }
        return (
            <>
                a h2 saying "Create a Deck"
                an Input saying "Deck Name" and is a text box and connected to name
                an Input saying "Deck Type" and is a dropdown with the only value being "Commander" and connected to type
                if the type is commander: an input saying "Commander Name" and is connected to commander
                an Input saying "Other Cards" and is a text box and is connected to cards
                a button saying Submit that when pressed, calls create
            </>
        )
    }
    ```