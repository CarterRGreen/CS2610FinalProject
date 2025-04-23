import { Header } from "../components/Header";
import { Outlet } from "react-router";
export function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}