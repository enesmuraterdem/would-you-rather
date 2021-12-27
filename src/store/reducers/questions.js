import { UPDATE_QUESTIONS, ADD_ANSWER_TO_QUESTIONS, ADD_QUESTION_TO_POOL } from '../actions/questions';

const initialState = {};

const questions = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_QUESTIONS:
            return payload.questions;
        case ADD_ANSWER_TO_QUESTIONS:
            const { authedUser, qid, answer } = payload;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer]['votes'].concat(authedUser)
                    }
                }
            };
        case ADD_QUESTION_TO_POOL:
            const { id, ...question } = payload;
            return {
                ...state,
                [id]: {
                    id,
                    ...question
                }
            };
    }
    return state;
}

export default questions;