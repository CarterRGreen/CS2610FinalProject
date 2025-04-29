import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router";
import { Input } from "../components/Input";
import { useRequest } from "../hooks/useRequest";
import { useSingleClick } from "../hooks/useSingleClick";

export function Decks(){
    const [nameBox, setNameBox] = useState(false);
    const [name, setName] = useState("");
    const [colorBox, setColorBox] = useState(false);
    const [red, setRed] = useState(false);
    const [blue, setBlue] = useState(false);
    const [white, setWhite] = useState(false);
    const [black, setBlack] = useState(false);
    const [green, setGreen] = useState(false);
    const [decks, setDecks] = useState([]);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [page, setPage] = useState(1);
    const [clickTimer, setClickTimer] = useState(null);

    const navigate = useNavigate();

    async function doSearch(){
        const getRequest = useRequest();
        let queryString = "?";
        if(nameBox){
            queryString = queryString + "name=" + name + "&"
        }
        if(colorBox){
            let colors = []
            if (red){
                colors.add
                colors.push("red")
            }
            if (blue){
                colors.push("blue")
            }
            if (white){
                colors.push("white")
            }
            if (black){
                colors.push("black")
            }
            if (green){
                colors.push("green")
            }
            queryString = queryString + "colors=" +colors + "&"
        }
        queryString = queryString + "page=" + page + "&"
        queryString = queryString + "num_decks=" + 50 + "&"
        const response = await getRequest("/search_decks/"+queryString);
        if (response.ok){
            const {decks, num_pages} = await response.json();
            setDecks(decks);
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
        else {
            setIsError(true);
            setErrorMessage("Error Searching Decks");
            setTimeout(() => {
                setIsError(false);
            }, 7000);
        }
    }

    useEffect(() => {
        doSearch();
    }, []);
    

    return(
        <>
            {isError && <Error>{errorMessage}</Error>}
            <h1>Decks</h1>
            <Link to="/create_deck" className="create_deck">Create Deck</Link>
            <div className="filter_container">
                <div className="filter_row">
                    <Input label="Name" type="Checkbox" value={nameBox} onChange={(e) => setNameBox(e.target.checked)} className="checkbox"/>
                    Filter by Name
                    {nameBox && <input className="search_bar" type="text" value={name} onChange={(e) => setName(e.target.value)}/>}
                </div>
                <div className="filter_row">
                    <Input label="Color" type="Checkbox" value={colorBox} onChange={(e) => setColorBox(e.target.checked)} className="checkbox"/>
                    Filter by Color
                    {colorBox && (
                        <>
                            <input type="checkbox" value={red} onChange={setRed}/> Red
                            <input type="checkbox" value={blue} onChange={setBlue}/> Blue
                            <input type="checkbox" value={white} onChange={setWhite}/> White
                            <input type="checkbox" value={black} onChange={setBlack}/> Black
                            <input type="checkbox" value={green} onChange={setGreen}/> Green
                        </>
                    )}
                </div>
                <button className="submit" onClick={doSearch}>Search</button>
            </div>
            <div className="page_selection">
                <div className="left_side">
                    {isPrevious && <button className="arrow" onClick={() => {setPage(page - 1); doSearch()}}>&lt;</button>}
                </div>
                <div className="right_side">
                    {isNext && <button className="arrow" onClick={() => {setPage(page + 1); doSearch()}}>&gt;</button>}
                </div>
            </div>
            <div className="display_container">
                {decks.map((deck) => (
                    <img 
                        key={deck.id}
                        src={deck.image} 
                        alt={deck.name} 
                        onClick={useSingleClick("deck",deck.id,clickTimer,setClickTimer,navigate)}
                    />
                    
                ))}
            </div>
        </>
    )
}