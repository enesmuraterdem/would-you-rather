import { _getUsers } from '../../_DATA';

export const UPDATE_USERS = 'UPDATE_USERS';

const setUsers = users =>  ({
    type: 'UPDATE_USERS',
    payload: {
        users
    }
})

export const getUsers = () => dispatch => {
    _getUsers().then(users => dispatch(setUsers(users)))
};