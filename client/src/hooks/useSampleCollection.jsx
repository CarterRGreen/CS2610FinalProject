import { useEffect, useState } from "react"
import { useRequest } from "./useRequest"
export function useSampleCollection(numCards,pageNum){

    const [sample, setSample] = useState([]);
    const makeRequest = useRequest();
    async function fetchCollectionCards(){
        const response = await makeRequest(`/sample_collection/?num_cards=${numCards}&page=${pageNum}`);
        if (response.ok){
            const { collection , collection_cards } = await response.json();
            for(let i = 0; i < collection_cards.length; i++){
                collection[i].amount = collection_cards[i].amount;
            }
            setSample(collection);
        }
        else{
            const errorMessage = await response.text();
            return errorMessage;
        }
    }
    
    useEffect(() => {
        fetchCollectionCards();
    }, []);

    return sample;
}
