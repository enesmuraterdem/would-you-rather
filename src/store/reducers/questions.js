import { UPDATE_QUESTIONS } from '../actions/questions';

const initialState = [];

const questions = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_QUESTIONS:
            return payload.questions;
    }
    return state;
}

export default questions;