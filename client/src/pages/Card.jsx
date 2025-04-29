import { use, useEffect, useState } from "react";
import { useRequest } from "../hooks/useRequest";
import { useParams } from "react-router";

export function Card(){
    const {id} = useParams();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [set, setSet] = useState("");
    const [image, setImage] = useState("");
    const [amountToAdd, setAmountToAdd] = useState(1);
    const [whereToAdd, setWhereToAdd] = useState("collection");
    const [deckToAddTo, setDeckToAddTo] = useState("");
    const [decks, setDecks] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getRequest = useRequest();
    useEffect(() => {
        getDetails();
    },[]);

    async function getDetails(){
        let request = await getRequest("/get_decks/");
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
        request = await getRequest("/get_card_details/?card_id="+id);
        if (request.ok){
            const {card} = await request.json();
            setName(card.name);
            setType(card.type);
            setSet(card.set);
            setImage(card.image);
        }
        else{
            setIsError(true);
            setErrorMessage("Failed to get card details");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }

    async function addCards(){
        let cardDictionary = {"cards":[{name: name, quantity: amountToAdd}]}
        if (whereToAdd === "collection"){
            const response = await getRequest("/add_cards_to_collection/", "POST", JSON.stringify(cardDictionary));
        }
        else if (whereToAdd === "wanted"){
            const response = await getRequest("/add_cards_to_wanted/", "POST", JSON.stringify(cardDictionary));
        }
        else if (whereToAdd === "deck"){
            const response = await getRequest("/add_cards_to_deck/"+deckToAddTo+"/", "POST", JSON.stringify(cardDictionary));
        }
        if (!response.ok){
            setIsError(true);
            setErrorMessage("Failed to add card");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }
    return(
        <>
            <h1>Card Details</h1>
            {isError && <div className="error">{errorMessage}</div>}
            <div className="column">
                <div className="left_side">
                    <img src={image} className="card_image" alt={name}/>
                </div>
                <div className="right_side">
                    <div className="card_details">{name}</div>
                    <div className="card_details">{type}</div>
                    <div className="card_details">{set}</div>
                </div>
            </div>
            <div className="addCard">
                <span>Add</span>
                <input type="number" value={amountToAdd} min="1" onChange={(e) => setAmountToAdd(e.target.value)}/>
                <span>copies of this card to</span>
                <select value={whereToAdd} onChange={(e) => setWhereToAdd(e.target.value)}>
                    <option value="collection">my Collection</option>
                    <option value="wanted">my Wanted</option>
                    <option value="deck">my deck</option>
                </select>
                {whereToAdd === "deck" && 
                    <select value={deckToAddTo} onChange={(e) => setDeckToAddTo(e.target.value)}>
                        {decks.map(deck => (
                            <option key={deck.id} value={deck.id}>{deck.name}</option>
                        ))}
                    </select>
                }
                <button onClick={addCards}>Add Card</button>
            </div>
        </>
    )
}