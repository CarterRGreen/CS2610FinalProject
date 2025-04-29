export function useSingleClick(url,page_parameter,clickTimer, setClickTimer, navigate) {

    return () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
                setClickTimer(null);
            }
            setClickTimer(setTimeout(() => {
                navigate(`/${url}/${page_parameter}`);
            }, 200));
        };
}