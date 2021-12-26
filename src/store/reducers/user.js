import { UPDATE_USERS } from '../actions/user';

const initialState = [];

const user = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_USERS:
            return payload.users;
    }
    return state;
}

export default user;