import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../../_DATA';
import { addAnswerToUsers, addQuestionToUser } from './users';

export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const ADD_ANSWER_TO_QUESTIONS = 'ADD_ANSWER_TO_QUESTIONS';
export const ADD_QUESTION_TO_POOL = 'ADD_QUESTION_TO_POOL';

const setQuestions = questions =>  ({
    type: UPDATE_QUESTIONS,
    payload: {
        questions
    }
})

const addAnswerToQuestions = ({ authedUser, qid, answer }) =>  ({
    type: ADD_ANSWER_TO_QUESTIONS,
    payload: { authedUser, qid, answer }
})

const addQuestionToPool = question =>  ({
    type: ADD_QUESTION_TO_POOL,
    payload: question
})

export const getQuestions = () => dispatch => {
    _getQuestions().then(questions => dispatch(setQuestions(questions)))
};

export const answerToQuestion = ({ authedUser, qid, answer }) => dispatch => {
    _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
        dispatch(addAnswerToQuestions({ authedUser, qid, answer }))
        dispatch(addAnswerToUsers({ authedUser, qid, answer }))
    })
}

export const addNewQuestion = (question, navigate) => dispatch => {
    _saveQuestion(question).then(formattedQuestion => {
        dispatch(addQuestionToPool(formattedQuestion))
        dispatch(addQuestionToUser(formattedQuestion))
        navigate('/')
    })
}