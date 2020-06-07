import React from "react";
import {
    Button,
    TextField,
    Box,
    Paper,
    Container,
    Typography,
} from "@material-ui/core";

const Login = () => {
    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
            >
                <Box style={{ width: "40%" }}>
                    <Paper>
                        <Box p={5} textAlign="center">
                            <Typography> Login</Typography>
                            <form onSubmit={submit}>
                                <Box py={1} px={2}>
                                    <TextField fullWidth label="Email" />
                                </Box>
                                <Box py={1} px={2}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="Pasword"
                                    />
                                </Box>
                                <Box py={1} px={2}>
                                    <Button color="primary" variant="contained">
                                        Login
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
