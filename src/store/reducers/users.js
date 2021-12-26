import { UPDATE_USERS } from '../actions/users';

const initialState = [];

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_USERS:
            return payload.users;
    }
    return state;
}

export default users;