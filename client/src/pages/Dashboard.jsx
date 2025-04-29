import { useSampleCollection } from "../hooks/useSampleCollection"
import { useSampleWanted } from "../hooks/useSampleWanted"
import { useSampleDecks } from "../hooks/useSampleDecks"
import { Link } from "react-router"
export function Dashboard(){

    const collectionCards =  useSampleCollection(10,1)
    const wantedCards = useSampleWanted(10,1)
    const decks = useSampleDecks(10,1)

    return (
        <>
            <Link to="/collection" className="link">View Collection</Link>
            <div className="collection_cards">
                {collectionCards.map((card) => (
                    <Link to={`/card/${card.card_id}`} key={card.id}>
                        <img src={card.image} alt={card.name} />
                    </Link>
                ))}
            </div>
            <Link to="/decks" className="link">View Decks</Link>
            <div className="decks">
                {decks.map((deck) => (
                    <Link to={`/deck/${deck.id}`} key={deck.id}>
                        <img src={deck.image} alt={deck.name} />
                    </Link>
                ))}
            </div>
            <Link to="/wanted" className="link">View Wanted Cards</Link>
            <div className="wanted_cards">
                {wantedCards.map((card) => (
                    <Link to={`/card/${card.card_id}`} key={card.id}>
                        <img src={card.image} alt={card.name} />
                    </Link>
                ))}
            </div>
        </>
    )
}