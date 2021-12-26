import { Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({

});

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                { children }
            </Container>
        </ThemeProvider>
    )
}

export default Layout;