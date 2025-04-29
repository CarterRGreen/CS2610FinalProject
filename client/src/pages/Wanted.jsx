import { useEffect, useState } from "react"
import { useRequest } from "../hooks/useRequest";
import { Error } from "../components/Error";
import { useNavigate } from "react-router";
import { Input } from "../components/Input";
import { CardFilterBar } from "../components/CardFilterBar";
import { useSingleClick } from "../hooks/useSingleClick";
import { useDoubleClick } from "../hooks/useDoubleClick";

export function Wanted() {
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
    const [isMoveToCollection, setIsMoveToCollection] = useState(false);
    const [amountToRemove, setAmountToRemove] = useState(1);
    const [amountToCollection, setAmountToCollection] = useState(1);
    const [clickTimer, setClickTimer] = useState(null);

    const navigate = useNavigate();

    async function doSearch(){
        const getRequest = useRequest();
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
        const response = await getRequest("/search_wanted/"+queryString);
        if (response.ok){
            const { wanted, wanted_cards, num_pages } = await response.json();
            for(let i = 0; i < wanted_cards.length; i++){
                wanted[i].quantity = wanted_cards[i].quantity;
            }
            setCards(wanted);
            if (num_pages > page){
                setIsNext(true);
            }
            else{
                setIsNext(false);
            }
            if (page > 1){
                setIsPrevious(true);
            }
            else{
                setIsPrevious(false);
            }
        }
        else{
            setIsError(true);
            setErrorMessage("Error Searching Wanted");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }

    }    

    useEffect(() => {
        doSearch();
    }, []);

    async function removeFromWanted(){
        const removeFunction = useRequest();
        let cardDictionary = {"cards":[{name: selectedCard.card_name, quantity:amountToRemove}]}
        const response = await removeFunction("/remove_cards_from_wanted/", "POST", JSON.stringify(cardDictionary));
        if (response.ok){
            setIsCardSelected(false);
            setCards(cards.filter(card => card.id !== selectedCard.id));
            if (isMoveToCollection){
                const addFunction = useRequest();
                let cardDictionary = {"cards":[{name: selectedCard.card_name, quantity:amountToCollection}]}             
                const addResponse = await addFunction("/add_cards_to_collection/", "POST", JSON.stringify(cardDictionary));
                if (addResponse.ok){
                    setCards(cards.filter(card => card.id !== selectedCard.id));
                    doSearch();
                }
                else{
                    setIsError(true);
                    setErrorMessage("Failed to add to Collection");
                    setTimeout(() => {
                        setIsError(false);
                    }, 7000);
                }
            }
            else{
                doSearch();
            }
        }
        else{
            setIsError(true);
            setErrorMessage("Failed to remove from Wanted");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }
    function updateAmountToRemove(e){
        const value = e.target.value;
        if (value > selectedCard.quantity){
            setAmountToRemove(selectedCard.quantity);
        }
        else if (value < 0){
            setAmountToRemove(0);
        }
        else{
            setAmountToRemove(value);
        }
    }
    function updateAmountToCollection(e){
        const value = e.target.value;
        if (value < 0){
            setAmountToCollection(0);
        }
        else {
            setAmountToCollection(value);
        }
    }

    return(
        <>
            { isError && <Error errorMessage={errorMessage}/>}
            { isCardSelected && <div className="popup">
                <div className="left_side">
                    <h3>Remove from Wanted</h3>
                    <div>{selectedCard.card_name}</div>
                    <Input label="Quantity to remove" type="number" value={amountToRemove} onChange={updateAmountToRemove}/>
                    <div>
                        <Input label="Add to Collection" type="checkbox" value={isMoveToCollection} onChange={(e) => setIsMoveToCollection(e.target.checked)}/>
                        Add to Collection
                    </div>
                    {isMoveToCollection && 
                        <div>
                        Amount to Add to Collection
                        <Input label="Amount to add to Collection" type="number" value={amountToCollection} onChange={updateAmountToCollection}/>
                        </div>
                    }
                </div>
                <div className="right_side">
                    <img src={selectedCard.image} alt={selectedCard.name}/>
                </div>
                <button onClick={removeFromWanted}>Submit</button>
                </div> 
            }
            { isCardSelected && <div className="cover"></div>}
            <div className="centered">
                <h1>Wanted</h1>
            </div>
            <CardFilterBar
                filters={filters}
                setFilters={setFilters}
                doSearch={doSearch}
            />
            <div className="page_selection">
                <div className="left_side">
                    {isPrevious? <button onClick={() => {
                        setPage(page - 1);
                        doSearch();
                    }}>Previous</button> : null}
                </div>
                <div className="right_side">
                    {isNext? <button onClick={() => {
                        setPage(page + 1);
                        doSearch();
                    }}>Next</button> : null}
                </div>
            </div>
            <div className="display_container" onClick={() => {
                setIsCardSelected(false);
                setSelectedCard(null);
            }}>
                {cards.map((card) => (
                    <div  key={card.id} className="card">
                        <img 
                            src={card.image} 
                            alt={card.name}
                            onClick={useSingleClick("card",card.card_id, clickTimer, setClickTimer, navigate)}
                            onDoubleClick={useDoubleClick(card, setIsCardSelected, setSelectedCard, clickTimer, setClickTimer)}
                        />
                        <div className="card_quantity">{card.quantity}</div>
                    </div>
                ))}
            </div>
        </>
    )
}