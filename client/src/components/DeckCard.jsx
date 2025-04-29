export function DeckCard({card, setHoveredCard, setIsHoveringOnCard, navigate, removeFromDeck, isInEditMode}) {
    return (
        <div className="card_info">
            <div className="card_quantity">
                {card.quantity}
            </div>
            <div 
                className="card_name" 
                onMouseOver={() => {setHoveredCard(card); setIsHoveringOnCard(true)}} 
                onMouseOut={() => {setHoveredCard(null); setIsHoveringOnCard(false)}}
                onClick={() => navigate(`/card/${card.card_id}`)}
            >
                {card.card_name} 
            </div>
            <div className="card_mana">{card.mana_cost}</div>
            {isInEditMode && 
                <div className="card_removal" onClick={() => removeFromDeck(card)}> - </div>
            }
        </div>
    )
}