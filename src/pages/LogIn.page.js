import { useState, useEffect } from "react";
import auth from "../services/auth.service";
import useValidator from "../controllers/useValidator";
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    Stack,
    Alert,
} from "@mui/material/";
import SimpleBackdrop from "../components/simpleBackdrop.component";

const LogIn = ({ setPage, pageNames, user }) => {
    const [isBackDropOpened, setIsBackDropOpened] = useState(false);

    const { register, handleSubmit, errors } = useValidator({
        ignoreConfirmPassword: true,
        ignoreAcceptTerms: true,
    });

    console.log("Render login page");

    const onSubmit = (formUserData) => {
        const loggedUser = auth.auth(formUserData);
        setIsBackDropOpened(true);
        if (!loggedUser) {
            console.log("User not found");
        } else {
            setTimeout(() => {
                setIsBackDropOpened(false);
                setPage(pageNames.userhome);
            }, 900);
            console.log("Logged successfully");
            console.log("Redirect to user homepage");
        }
    };

    useEffect(() => {
        user.id && setPage(pageNames.userhome);
    }, [pageNames.userhome, setPage, user]);

    return (
        <>
            <SimpleBackdrop
                isOpened={isBackDropOpened}
                setIsBackDropOpened={setIsBackDropOpened}
            >
                <Alert severity="error">User not found.</Alert>
            </SimpleBackdrop>
            <Paper elevation={4}>
                <Box px={3} py={2}>
                    <Typography variant="h6" align="center" margin="dense">
                        Log In to Vote
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="fullname"
                                name="fullname"
                                label="Full Name"
                                fullWidth
                                margin="dense"
                                {...register("fullname")}
                                error={errors.fullname ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.fullname?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                margin="dense"
                                {...register("email")}
                                error={errors.email ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register("password")}
                                error={errors.password ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Login
                                </Button>
                            </Stack>
                            <br />
                            <br />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack direction="row" justifyContent="center">
                                <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                >
                                    Don't have an account?
                                </Typography>
                            </Stack>
                            <br />
                            <Stack direction="row" justifyContent="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(pageNames.registration);
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};

export default LogIn;
