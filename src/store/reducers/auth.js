import { SET_AUTH_USER } from '../actions/auth';

const initialState = null;

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AUTH_USER:
            return payload.id;
    }
    return state;
}

export default auth;