import "normalize.css";
import "reset-css";
import "./styles/App.css";
import { pages } from "./pages";
import { components } from "./components/";
import { useState, useEffect } from "react";

const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

function App() {
    const [user, setUser] = useState(userData);
    // const [page, setPage] = useState();

    useEffect(() => {
        if (!user) {
        }
    }, [user]);

    const logOutHandler = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <>
            <components.Header user={user} logOutHandler={logOutHandler} />
            <pages.Landing />
            {/* <pages.LogIn />
            <pages.Registration />
            <pages.UserHome />
            <pages.UserInfo />
            <pages.AdminHome />
            <pages.AdminInfo />
            <pages.AdminStats />
            <pages.LogOut /> */}
            <components.Footer />
        </>
    );
}

export default App;
