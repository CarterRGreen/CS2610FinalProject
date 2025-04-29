export function alert(setIsError, setErrorMessage, newErrorMessage) {
    setIsError(true);
    setErrorMessage(newErrorMessage);
    setTimeout(() => {
        setIsError(false);
    }, 7000);
}