import { useEffect, useState } from "react"
import { useRequest } from "./useRequest"
export function useSampleWanted(numCards,pageNum){

    const [cards, setCards] = useState([]);
    const makeRequest = useRequest();
    async function fetchWantedCards(){
        const response = await makeRequest(`/sample_wanted/?num_cards=${numCards}&page=${pageNum}`);
        if (response.ok){
            const { wanted , wanted_cards} = await response.json();
            for(let i = 0; i < wanted_cards.length; i++){
                wanted[i].amount = wanted_cards[i].amount;
            }
            setCards(wanted);
        }
        else{
            const errorMessage = await response.text();
            return errorMessage;
        }
    }
    
    useEffect(() => {
        fetchWantedCards();
    }, []);

    return cards;
}
