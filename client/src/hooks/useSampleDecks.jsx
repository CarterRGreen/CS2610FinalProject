import { useEffect, useState } from "react"
import { useRequest } from "./useRequest"
export function useSampleDecks(numDecks,pageNum){

    const [sample, setSample] = useState([]);
    const makeRequest = useRequest();
    async function fetchDecks(){
        const response = await makeRequest(`/sample_decks/?num_decks=${numDecks}&page=${pageNum}`);
        if (response.ok){
            const { decks } = await response.json();
            setSample(decks);
        }
        else{
            const errorMessage = await response.text();
            return errorMessage;
        }
    }
    
    useEffect(() => {
        fetchDecks();
    }, []);

    return sample;
}
