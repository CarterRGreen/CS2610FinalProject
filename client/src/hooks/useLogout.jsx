export function getLogout() {
    async function logout() {
        const res = await fetch("/registration/logout/", {
        credentials: "same-origin", // include cookies!
        });

        if (res.ok) {
        // navigate away from the single page app!
        window.location = "/registration/sign_in/";
        } else {
        // handle logout failed!
        }
    }
    return logout;
}