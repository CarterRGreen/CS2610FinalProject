import { useEffect, useState } from "react"
import { useRequest } from "../hooks/useRequest"
import { useNavigate, useParams } from "react-router"
import { Input } from "../components/Input";
import { DeckCard } from "../components/DeckCard";

export function Deck(){
    const [cards, setCards] = useState([]);
    const [deckType, setDeckType] = useState("");
    const [commander, setCommander] = useState("");
    const [name, setName] = useState("");
    const [isLegal, setIsLegal] = useState(true);
    const [legalReason, setLegalReason] = useState("");
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [cardsToRemove, setCardsToRemove] = useState([]);
    const [cardsToAdd, setCardsToAdd] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newName, setNewName] = useState("");
    const [newDeckType, setNewDeckType] = useState("");
    const [newCommander, setNewCommander] = useState("");
    const [isHoveringOnCard, setIsHoveringOnCard] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const {id} = useParams();
    const getRequest = useRequest();
    const navigate = useNavigate();

    useEffect(() => {
        getDeck();
    },[]);

    async function getDeck(){
        const response = await getRequest("/get_deck_details/?deck_id="+id);
        if (response.ok){
            const {deck, cards, deck_cards, commander} = await response.json();
            // Todo: sort cards by color and type
            for(let i = 0; i < deck_cards.length; i++){
                cards[i].quantity = deck_cards[i].quantity;
            }
            setCards(cards);
            setDeckType(deck.format);
            setName(deck.name);
            if (deck.format === "Commander"){
                setCommander(commander.card_name);
                // Todo: check if the deck is legal
            }
        }
        else {
            setIsError(true);
            setErrorMessage("Failed to get deck");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }
    
    async function removeFromDeck(){
        if (cardsToRemove.length === 0){
            return;
        }
        const cardDictionary = [cardsToRemove.map(card => {
            return {
                name: card.name,
                quantity: card.quantityToRemove
            }
        })];
        setCards(cards.map(card => {
            if (card.id === cardsToRemove.id){
                return {
                    ...card,
                    quantity: card.quantity - cardsToRemove.filter((cardToRemove) => card.name !== cardToRemove.name)[0]?.quantity
                };
            }
            return card;
        }
        ));
        const body = {deck_id: id, cards: cardDictionary};
        const response = await getRequest("/remove_cards_from_deck/", "POST", JSON.stringify(body));
        setCardsToRemove([]);
        if(!response.ok){
            setIsError(true);
            setErrorMessage("Failed to remove card from deck");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }
    async function addToDeck(){
        if (cardsToAdd.length === 0){
            return;
        }
        const cardDictionary = [{
            name: cardsToAdd,
            quantity: 1
        }];
        setCards(cards.map(card => {
            if (card.id === cardsToAdd.id){
                return {
                    ...card,
                    quantity: card.quantity + cardsToAdd.filter((cardToAdd) => card.name !== cardToAdd.name)[0]?.quantity
                };
            }
            return card;
        }
        ));
        const body = {deck_id: id, cards: cardDictionary};
        const response = await getRequest("/add_cards_to_deck/", "POST", JSON.stringify(body));
        setCardsToAdd([]);
        if(!response.ok){
            setIsError(true);
            setErrorMessage("Failed to add card to deck");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }
    async function editDeck(){
        let body;
        if (deckType === 'Commander'){
            if (newCommander === ""){
                setIsError(true);
                setErrorMessage("Deck needs a commander");
                setTimeout(() => {
                    setIsError(false);
                }, 7000);
                return;
            }
            body = {
                deck_id: id,
                name: newName,
                deck_type: newDeckType,
                commander: newCommander
            };
        };
        setCommander(newCommander);
        setDeckType(newDeckType);
        setName(newName);
        const response = await getRequest("/edit_deck/", "POST", JSON.stringify(body));
        if(!response.ok){
            setIsError(true);
            setErrorMessage("Failed to edit deck");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
        removeFromDeck();
        addToDeck();
        setIsInEditMode(false);
        setNewName("");
        setNewDeckType("");
        setNewCommander("");
        setCardsToRemove([]);
        setCardsToAdd([]);
    }
    async function changeEditMode(){
        if (isInEditMode){
            setIsInEditMode(false);
        }
        else{
            setNewName(name);
            setNewDeckType(deckType);
            setNewCommander(commander);
            setCardsToRemove([]);
            setCardsToAdd([]);
            setIsInEditMode(true);
        }
    }
    async function hoverOnCard(){

    }

    return (
        <>
            {isHoveringOnCard && <img src={hoveredCard.image}/>}
            { isLegal && <div className="warning">{legalReason}</div> }
            { isError && <div className="error">{errorMessage}</div> }
            <h2>View Deck</h2>
            <div className="deck_header">
                { isInEditMode? 
                    <>  <div>
                            Deck Name: 
                            <Input label="Name" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="deck_input"/>
                        </div>
                        <div>
                            Deck Type: 
                            <Input label="Deck Type" type="text" value={newDeckType} onChange={(e) => setNewDeckType(e.target.value)} className="deck_input"/>
                        </div>
                        {deckType === "Commander" &&
                            <div>
                                Commander: 
                                <Input label="Commander" type="text" value={newCommander} onChange={(e) => setNewCommander(e.target.value)} className="deck_input"/>
                            </div>
                        }
                        <button className="edit_button cancel" value="Cancel" onClick={changeEditMode}>Cancel</button>
                        <button className="edit_button save" value="Save" onClick={editDeck}>Save</button>
                    </>
                :
                    <>
                        <div className="deck_parameter">Name: {name}</div>
                        <div className="deck_parameter">Deck Type: {deckType}</div>
                        { deckType === "Commander" &&
                            <div className="deck_parameter">Commander: {commander}</div>
                        }
                        <button className="edit_button" value="Edit" onClick={changeEditMode}>Edit</button>
                    </>
                }
                <div>
                    <span>Add Card:</span>
                    <Input label="Add card" type="text" value={cardsToAdd} onChange={(e) => setCardsToAdd(e.target.value)} className="deck_input"/>
                    <button className="edit_button" value="Add Card" onClick={addToDeck}>Add</button>
                </div>
            </div>
            <div className="deck_display_container">
                <div className="deck_display_header">
                    <h3>Creatures</h3>
                    {cards.filter(card => card.type.includes("Creature")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />
                    ))}
                </div>
                <div className="deck_display_header">
                    <h3>Instants</h3>
                    {cards.filter(card => card.type.includes("Instant")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />
                    ))}
                </div>
                <div className="deck_display_header">
                    <h3>Sorceries</h3>
                    {cards.filter(card => card.type.includes("Sorcery")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />  
                    ))}
                </div>
                <div className="deck_display_header">
                    <h3>Enchantments</h3>
                    {cards.filter(card => card.type.includes("Enchantment")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />
                    ))}
                </div>
                <div className="deck_display_header">
                    <h3>Artifacts</h3>
                    {cards.filter(card => card.type.includes("Artifact")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />
                    ))}
                </div>
                <div className="deck_display_header">
                    <h3>Lands</h3>
                    {cards.filter(card => card.type.includes("Land")).map((thisCard) => (
                        <DeckCard 
                            key={thisCard.id}
                            card={thisCard} 
                            setHoveredCard={setHoveredCard} 
                            setIsHoveringOnCard={setIsHoveringOnCard}
                            navigate={navigate}
                            removeFromDeck={removeFromDeck}
                            isInEditMode={isInEditMode}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}