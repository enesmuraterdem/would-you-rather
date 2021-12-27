import { UPDATE_AUTH_USER } from '../actions/auth';

const initialState = null;

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_AUTH_USER:
            return payload;
        default:
            return state;
    }
}

export default auth;