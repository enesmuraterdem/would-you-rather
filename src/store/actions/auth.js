export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';

export const setAuthUser = payload =>  ({
    type: UPDATE_AUTH_USER,
    payload
})

export const loginUser = userId => dispatch => {
    dispatch(setAuthUser(userId));
} 