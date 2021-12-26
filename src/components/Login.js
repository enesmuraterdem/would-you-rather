import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/actions/users';
import { loginUser } from '../store/actions/auth';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

const Login = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => ({
        users: state.users
    }));
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    const handleUserSelect = e => {
        setUserId(e.target.value)
    }

    const handleClick = () => {
        dispatch(loginUser(userId))
    }

    return (
        <Fragment>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img style={{ maxWidth: 200 }} src="./images/wouldYouRather.png" />
                <FormControl sx={{ mt:6 }} fullWidth>
                    <InputLabel id="user-id">Select User</InputLabel>
                    <Select
                        labelId="user-id"
                        autoFocus
                        onChange={handleUserSelect}
                        value={userId}
                        label="Select User"
                    >
                        <MenuItem value="">None</MenuItem>
                        {
                            Object.keys(users).map(key => (
                                <MenuItem key={key} value={users[key].id}>{ users[key].name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleClick()}
                >
                    Login
                </Button>
            </Box>
        </Fragment>
    )
}

export default Login;