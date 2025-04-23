import cookies from "js-cookie";
export function useRequest(){
    async function getRequest(
        uri,
        method="GET",
        body=null,
        headers =  {"Content-Type": "application/json", "X-CSRFToken": cookies.get("csrftoken")} 
    ){
        const options = {
            method,
            credentials: "same-origin",
            headers,
        }
        if (method !== "GET"){
            options.body = body
        }
        const response = await fetch(uri, options);
        // Generically handle errors
        // Handle Parsing
        return response;
        
    }
    return getRequest
}