import React, { Fragment } from 'react';
import {
    Container,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthUser } from '../store/actions/auth';


const DefaultLayout = ({ children }) => {
    const dispatch = useDispatch();
    const pages = [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/create-pool',
            name: 'New Pool'
        },
        {
            path: '/leaderboard',
            name: 'Leaderboard'
        },
    ]

    const handleLogout = () => {
        dispatch(setAuthUser(null))
    }

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        {pages.map((page, index) => (
                        <Button
                            component={Link}
                            to={page.path}
                            key={`${page.name}-${index}`}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.name}
                        </Button>
                        ))}
                    </Box>
                    <Button
                        onClick={handleLogout}
                        sx={{ color: 'white' }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs" sx={{ mt: 6 }}>
                { children }
            </Container>
        </Fragment>
    )
}

export default DefaultLayout;