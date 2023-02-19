import { useState } from "react";
import { pageNames } from "../../constants";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settingsAuth = ["Profile", "Logout"];
const settingsAdmin = ["Profile", "Dashboard", "Votes", "Logout"];
const settings = ["Registration", "Login"];

const UserMenu = ({ user, logOutHandler, setPage }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const auth = !!user?.id;
    const isAdmin = auth && user.type === "admin";

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        const menuItem = e.target.innerText.toLowerCase();
        console.log(menuItem);
        console.log(pageNames.logout);
        switch (menuItem) {
            case pageNames.logout:
                logOutHandler();
                console.log("gere");
                break;
            default:
                setPage(pageNames[menuItem]);
                console.log("gere2");

                break;
        }
    };

    return (
        <>
            {auth || (
                /* Guest user  */
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Login">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={handleCloseUserMenu}
                            >
                                <Typography textAlign="center">
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            )}

            {auth && (
                /* Registered user  */
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.name} src={user.image || ""} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {(isAdmin ? settingsAdmin : settingsAuth).map(
                            (setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            )
                        )}
                    </Menu>
                </Box>
            )}
        </>
    );
};

export default UserMenu;
