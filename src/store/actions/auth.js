export const SET_AUTH_USER = 'SET_AUTH_USER';

export const setAuthUser = userId =>  ({
    type: SET_AUTH_USER,
    payload: { id: userId }
})