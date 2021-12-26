import { SET_USERS } from '../actions/users';

const initialState = [];

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USERS:
            return payload.users;
    }
    return state;
}

export default users;