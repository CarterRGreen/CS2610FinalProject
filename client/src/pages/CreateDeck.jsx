import { useState } from 'react';
import { alert } from '../hooks/alert';
import { useRequest } from '../hooks/useRequest';
import { Input } from '../components/Input';
import { Error } from '../components/Error';
export function CreateDeck(){
    const [name, setName] = useState("");
    const [type, setType] = useState("Commander");
    const [commander, setCommander] = useState("");
    const [cards, setCards] = useState([]);
    const [description, setDescription] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const makeRequest = useRequest();

    async function create(){
        let deck = {
            name: name,
            type: type,
            commander: commander,
            cards: cards
        }
        const response = await makeRequest("/create_deck/", "POST", JSON.stringify(deck));
        if (response.ok){
            const { deck_id } = await response.json();
            window.location.href = `/deck/${deck_id}/`;
        }
        else{
            setIsError(true);
            setErrorMessage("Error creating deck");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }

    return (
        <>
            { isError && <Error errorMessage={errorMessage}/>}
            <h2>Create a Deck</h2>
            <Input
                label="Deck Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter deck name"
            />
            <select
                label="Deck Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="Commander">Commander</option>
            </select>
            {type === "Commander" && (
                <Input
                    label="Commander Name"
                    type="text"
                    value={commander}
                    onChange={(e) => setCommander(e.target.value)}
                    placeholder="Enter commander name"
                />
            )}
            <Input
                label="Deck Description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter deck description"
            />
            <Input
                label="Other Cards"
                type="textarea"
                value={cards}
                onChange={(e) => setCards(e.target.value)}
                placeholder="Enter other cards"
            />
            <button onClick={create}>Submit</button>
        </>
    )
}