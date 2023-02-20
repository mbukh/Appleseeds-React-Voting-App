import "normalize.css";
import "reset-css";
import "./styles/App.css";
import { pages } from "./pages";
import { pageNames } from "./constants";
import { components } from "./components/";
import auth from "./services/auth.service";
import { useState, useEffect } from "react";

function App() {
    const [user, setUser] = useState(auth.currentUser());
    const [page, setPage] = useState(pageNames.landing);
    const { id: userId, email, name } = auth.currentUser();

    let PageContent;

    useEffect(() => {
        userId && setUser({ id: userId, email, name });
    }, [userId, email, name]);

    const logOutHandler = () => {
        auth.logOut();
        setUser(null);
        console.log("User logged out");
    };

    switch (page) {
        case pageNames.landing:
            PageContent = <pages.Landing user={user} />;
            break;
        case pageNames.login:
            PageContent = (
                <pages.LogIn
                    pageNames={pageNames}
                    setPage={setPage}
                    user={user}
                />
            );
            break;
        case pageNames.registration:
            PageContent = (
                <pages.Registration
                    pageNames={pageNames}
                    setPage={setPage}
                    user={user}
                />
            );
            break;
        case pageNames.userhome:
            PageContent = (
                <pages.UserHome
                    pageNames={pageNames}
                    setPage={setPage}
                    user={user}
                />
            );
            break;
        case pageNames.userinfo:
            PageContent = <pages.UserInfo user={user} />;
            break;
        case pageNames.adminhome:
            PageContent = <pages.AdminHome user={user} />;
            break;
        case pageNames.admininfo:
            PageContent = <pages.AdminInfo user={user} />;
            break;
        case pageNames.adminstats:
            PageContent = <pages.AdminStats user={user} />;
            break;
        case pageNames.logout:
            PageContent = <pages.LogOut user={user} />;
            break;
        default:
            PageContent = <pages.Landing user={user} />;
            break;
    }

    return (
        <>
            <components.Header
                user={user}
                logOutHandler={logOutHandler}
                setPage={setPage}
            />
            {PageContent}
            {/* <components.Footer /> */}
        </>
    );
}

export default App;
