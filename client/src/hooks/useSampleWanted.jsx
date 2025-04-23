import { useEffect, useState } from "react"
import { useRequest } from "./useRequest"
export function useSampleWanted(numCards,pageNum){

    const [sample, setSample] = useState([]);
    const makeRequest = useRequest();
    async function fetchWantedCards(){
        const response = await makeRequest(`/sample_wanted/?num_cards=${numCards}&page=${pageNum}`);
        if (response.ok){
            const { wanted } = await response.json();
            setSample(wanted);
        }
        else{
            const errorMessage = await response.text();
            return errorMessage;
        }
    }
    
    useEffect(() => {
        fetchWantedCards();
    }, []);

    return sample;
}
