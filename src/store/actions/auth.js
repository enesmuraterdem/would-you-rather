export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';

export const setAuthUser = payload =>  ({
    type: UPDATE_AUTH_USER,
    payload
})

export const loginUser = userId => (dispatch, getState) => {
    const state     = getState();
    const users     = state.users || {};
    const authUser  = users[userId] || null;
    dispatch(setAuthUser(authUser));
}