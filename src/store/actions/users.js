import { _getUsers } from '../../_DATA';

export const UPDATE_USERS = 'UPDATE_USERS';
export const ADD_ANSWER_TO_USERS = 'ADD_ANSWER_TO_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

const setUsers = users =>  ({
    type: UPDATE_USERS,
    payload: {
        users
    }
})

export const addAnswerToUsers = ({ authedUser, qid, answer }) =>  ({
    type: ADD_ANSWER_TO_USERS,
    payload: { authedUser, qid, answer }
})

export const addQuestionToUser = question =>  ({
    type: ADD_QUESTION_TO_USER,
    payload: question
})

export const getUsers = () => dispatch => {
    _getUsers().then(users => dispatch(setUsers(users)))
};