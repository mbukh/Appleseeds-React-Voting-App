import { users } from "./dbUsers.service";

const auth = (userData) => {
    const { fullname, email, password } = userData;
    const userLoggedIn = users.find(
        (user) =>
            user.email === email &&
            user.name === fullname &&
            user.password === password
    );
    if (userLoggedIn) {
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: userLoggedIn.id,
                name: userLoggedIn.name,
                email: userLoggedIn.email,
            })
        );
        return userLoggedIn;
    }
    return false;
};

const logOut = () => {
    localStorage.removeItem("user");
};

const currentUser = () =>
    localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : { id: null, name: null, email: null };

const exportObject = { auth, logOut, currentUser };

export default exportObject;
