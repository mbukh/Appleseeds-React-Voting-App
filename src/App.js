import "normalize.css";
import "reset-css";
import "./styles/App.css";
import { pages } from "./pages";

function App() {
    return (
        <>
            <pages.Landing />
            <pages.LogIn />
            <pages.Registration />
            <pages.UserHome />
            <pages.UserInfo />
            <pages.AdminHome />
            <pages.AdminInfo />
            <pages.AdminStats />
            <pages.LogOut />
        </>
    );
}

export default App;
