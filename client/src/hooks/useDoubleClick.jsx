
export function useDoubleClick(card, setIsCardSelected, setSelectedCard, clickTimer, setClickTimer) {

    return () => {
        if (clickTimer) {
            clearTimeout(clickTimer);
            setClickTimer(null);
        }
        setClickTimer(setTimeout(() => {
            setIsCardSelected(true);
            setSelectedCard(card);
        }, 200));
        setIsCardSelected(true);
        setSelectedCard(card);
    };
}