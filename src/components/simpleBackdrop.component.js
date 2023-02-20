import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const SimpleBackdrop = ({
    isOpened = false,
    children,
    setIsBackDropOpened,
}) => {
    const [open, setOpen] = useState(isOpened);
    const [message, setMessage] = useState(false);

    const handleClose = () => {
        setIsBackDropOpened(false);
    };

    useEffect(() => {
        setOpen(isOpened);
        if (isOpened) {
            setMessage(false);
            setTimeout(() => setMessage(true), 1000);
        }
    }, [isOpened]);

    // const handleToggle = () => {
    //     setOpen(!open);
    // };

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
        >
            {message ? children : <CircularProgress color="inherit" />}
        </Backdrop>
    );
};

export default SimpleBackdrop;
