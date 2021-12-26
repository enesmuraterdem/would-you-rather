import { _getQuestions } from '../../_DATA';

export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

const setQuestions = questions =>  ({
    type: UPDATE_QUESTIONS,
    payload: {
        questions
    }
})

export const getQuestions = () => dispatch => {
    _getQuestions().then(questions => dispatch(setQuestions(questions)))
};