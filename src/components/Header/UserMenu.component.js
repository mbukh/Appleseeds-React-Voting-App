import { useState } from "react";
import { pageNames } from "../../constants";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const UserMenu = ({ user, logOutHandler, setPage }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const auth = user.id;
    const isAdmin = auth && user.type === "admin";

    const menuUser = ["Profile", "Userhome", "Logout"];
    const menuAdmin = ["Profile", "Dashboard", "Votes", "Logout"];
    const menuGuest = ["Registration", "Login"];

    console.log("Render usermenu component");

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        const menuItem = e.target.innerText.toLowerCase();
        if (!menuItem) return;
        console.log("Menu item:", menuItem);
        switch (menuItem) {
            case pageNames.logout:
                logOutHandler();
                break;
            default:
                setPage(pageNames[menuItem]);
                break;
        }
    };

    return (
        <>
            {auth || (
                /* Guest user  */
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="User menu">
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
                        {menuGuest.map((setting) => (
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
                    <Tooltip title="User menu">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {user.image ? (
                                <Avatar
                                    alt={user.name}
                                    src={user.image || ""}
                                />
                            ) : (
                                <Avatar alt={user.name} src={user.image || ""}>
                                    {user.name[0]}
                                </Avatar>
                            )}
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
                        {(isAdmin ? menuAdmin : menuUser).map((setting) => (
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
        </>
    );
};

export default UserMenu;
