import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest";
import { CardFilterBar } from "../components/CardFilterBar";
import { useSingleClick } from "../hooks/useSingleClick";
import { useDoubleClick } from "../hooks/useDoubleClick";

export function Search() {
    const [filters, setFilters] = useState({
            nameBox: false,
            name: "",
            colorBox: false,
            colors: [],
            powerBox: false,
            power: 0,
            toughnessBox: false,
            toughness: 0,
            setBox: false,
            set: "",
            typeBox: false,
            type: "",
            subtypeBox: false,
            subtype: ""
    });

    const [cards, setCards] = useState([]);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [page, setPage] = useState(1);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [whereToAdd, setWhereToAdd] = useState("collection");
    const [deckToAddTo, setDeckToAddTo] = useState("");
    const [amountToAdd, setAmountToAdd] = useState(1);
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
    const getRequest = useRequest();
    const [clickTimer, setClickTimer] = useState(null);
    
    useEffect(() => {
        getDecks();
    },[]);

    async function getDecks(){
        const request = await getRequest("/get_decks/");
        if (request.ok){
            const {decks} = await request.json();
            setDecks(decks);
        }
        else{
            setIsError(true);
            setErrorMessage("Failed to get decks");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }

    async function doSearch(){
        if (!filters.nameBox && !filters.colorBox && !filters.powerBox && !filters.toughnessBox && !filters.setBox && !filters.typeBox && !filters.subtypeBox){
            setIsError(true);
            setErrorMessage("Please select at least one filter");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
            return;
        }
        let queryString = "?";
        if(filters.nameBox){
            queryString = queryString + "name=" + filters.name + "&"
        }
        if(filters.colorBox){
            queryString = queryString + "colors=" +filters.colors + "&"
        }
        if (filters.powerBox){
            queryString = queryString + "power=" + filters.power + "&"
        }
        if (filters.toughnessBox){
            queryString = queryString + "toughness=" + filters.toughness + "&"
        }
        if (filters.setBox){
            queryString = queryString + "set=" + filters.set + "&"
        }
        if (filters.typeBox){
            queryString = queryString + "type=" + filters.type + "&"
        }
        if (filters.subtypeBox){
            queryString = queryString + "subtype=" + filters.subtype + "&"
        }
        queryString = queryString + "page=" + page + "&"
        queryString = queryString + "num_cards=" + 50 + "&"
        const response = await getRequest("/search_database/"+queryString);
        if (response.ok) {
            const { cards, is_next_page } = await response.json();
            setCards(cards);
            setIsNext(is_next_page);
            if (page > 1) {
                setIsPrevious(true);
            } else {
                setIsPrevious(false);
            }
        }
        else {
            setIsError(true);
            setErrorMessage("Error Searching Collection");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }

    async function addCards(){
        if(whereToAdd === "collection"){
            const response = await getRequest("/add_cards_to_collection/", 
                "POST",
                JSON.stringify({cards:[{
                    name: selectedCard.name,
                    card_id: selectedCard.card_id,
                    quantity: amountToAdd
                }]})
            );
            if (!response.ok) {
                setIsError(true);
                setErrorMessage("Failed to add card to collection");
                setTimeout(() => {
                    setIsError(false);
                }, 7000);
            }
            else{
                setIsCardSelected(false);
                setSelectedCard(null);
            }
        }
        else if(whereToAdd === "wanted"){
            const response = await getRequest("/add_to_wanted/", 
                "POST",
                JSON.stringify({
                    name: selectedCard.name,
                    card_id: selectedCard.card_id,
                    quantity: amountToAdd
                })
            );
            if (!response.ok) {
                setIsError(true);
                setErrorMessage("Failed to add card to wanted");
                setTimeout(() => {
                    setIsError(false);
                }, 7000);
            }
        }
        else if(whereToAdd === "deck"){
            const response = await getRequest("/add_to_deck/", 
                "POST",
                JSON.stringify({
                    deck_id: deckToAddTo,
                    name: selectedCard.name,
                    card_id: selectedCard.card_id,
                    quantity: amountToAdd
                })
            );
            if (!response.ok) {
                setIsError(true);
                setErrorMessage("Failed to add card to deck");
                setTimeout(() => {
                    setIsError(false);
                }, 7000);
            }
        }
    }

    return(
        <>
            { isError && <Error>{errorMessage}</Error> }
            { isCardSelected && 
            <>
                <div className="popup">
                    <div className="addCard">
                        <span>Add</span>
                        <input type="number" value={amountToAdd} onChange={(e) => setAmountToAdd(e.target.value)} min="1"/>
                        <span>copies of {selectedCard.name} to</span>
                        <select value={whereToAdd} onChange={(e) => setWhereToAdd(e.target.value)}>
                            <option value="collection">my Collection</option>
                            <option value="wanted">my Wanted</option>
                            <option value="deck">my deck</option>
                        </select>
                        { whereToAdd === "deck" && 
                            <select value={deckToAddTo} onChange={(e) => setDeckToAddTo(e.target.value)}>
                                { decks.map(deck => (
                                    <option key={deck.id} value={deck.id}>{deck.name}</option>
                                ))}
                            </select>
                        }
                        <button onClick={addCards}>Add Card</button>
                    </div>
                </div>
                <div className="cover"></div>
            </>
            }
            <h1>Search</h1>
            <CardFilterBar filters={filters} setFilters={setFilters} doSearch={doSearch}/>
            <div className="page_selection">
                <div className="left_side">
                    {isPrevious && <button onClick={() => {setPage(page - 1); doSearch();}}>Previous</button>}
                </div>
                <div className="right_side">
                    {isNext && <button onClick={() => {setPage(page + 1); doSearch();}}>Next</button>}
                </div>
            </div>
            <div className="display_container">
                {cards.map((card) => (
                    <img 
                        key={card.card_id} 
                        src={card.image}
                        alt={card.name} 
                        loading="lazy"
                        onClick={useSingleClick("card",card.card_id, clickTimer, setClickTimer, navigate)}
                        onDoubleClick={useDoubleClick(card, setIsCardSelected, setSelectedCard, clickTimer, setClickTimer)}
                    />
                ))}
            </div>
        </>
    )
}