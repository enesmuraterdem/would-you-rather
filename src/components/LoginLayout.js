import { Container, Grid } from '@mui/material';

const LoginLayout = ({ children }) => {
    return (
        <Container component="main" maxWidth="xs">
            { children }
        </Container>
    )
}

export default LoginLayout;