import { Input } from "./Input";
import { Link } from "react-router";
import { getLogout } from "../hooks/useLogout";
export function Header() {
    const logout = getLogout();
    return(
        <>
            <div className="header">
                <div className="left_side">
                    <Link to="/" className="link">Dashboard</Link>
                    <Link to="/collection" className="link">Collection</Link>
                    <Link to="/wanted" className="link">Wanted</Link>
                    <Link to="/decks" className="link">Decks</Link>
                </div>
                <div className="center">
                    <Input type="text" placeholder="Search Cards" />
                    <button className="search_button">Search</button>
                </div>
                <div className="right_side">
                    <button onClick={logout} className="link">Logout</button>
                </div>
            </div>
            <div className="header_filler"></div>
        </>
    )
}