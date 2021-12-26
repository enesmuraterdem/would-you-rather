import { _getUsers } from '../../_DATA';

export const SET_USERS = 'SET_USERS';

const setUsers = users =>  ({
    type: SET_USERS,
    payload: {
        users
    }
})

export const getUsers = () => dispatch => {
    _getUsers().then(users => dispatch(setUsers(users)))
};