import { UPDATE_USERS, ADD_ANSWER_TO_USERS, ADD_QUESTION_TO_USER } from '../actions/users';

const initialState = {};

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_USERS:
            return payload.users;
        case ADD_ANSWER_TO_USERS:
            const { authedUser, qid, answer } = payload;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            };
        case ADD_QUESTION_TO_USER:
                const {  id, author, ...question } = payload;
                return {
                    ...state,
                    [author]: {
                        ...state[author],
                        questions: state[author].questions.concat([ id ])
                    }
                };
    }
    return state;
}

export default users;