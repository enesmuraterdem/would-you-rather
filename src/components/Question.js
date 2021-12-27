import React, { useState } from 'react';
import {
    Card,
    Avatar,
    Button,
    Divider,
    Row,
    Col,
    Radio,
    Progress,
    Badge
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { answerToQuestion } from '../store/actions/questions';

const QuestionForm = ({
    answer = null,
    question = {},
    handleChange = () => {},
    handleSubmit = () => {},
}) => {
    return (
        <>
            <Row>
                <Col style={{ textAlign: 'center' }} span={24}>
                    <Radio.Group onChange={handleChange} value={answer}>
                        <Radio value="optionOne">
                            { question?.optionOne?.text }
                        </Radio>
                        <Divider style={{ fontSize: 12, margin: '6px 0' }}>OR</Divider>
                        <Radio value="optionTwo">
                            { question?.optionTwo?.text }
                        </Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginTop: 10}}>
                    <Button
                        block
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    )
}

const QuestionMark = ({
    question = {},
    answer = null,
    optionKey = 'optionOne'
}) => {
    const percentageOf = ({ optionOne, optionTwo }) => {
        const optionOneVotes = (optionOne.votes || []).length;
        const optionTwoVotes = (optionTwo.votes || []).length;

        return {
            optionOne: Math.round((100 * optionOneVotes) / (optionOneVotes + optionTwoVotes)),
            optionTwo: Math.round((100 * optionTwoVotes) / (optionOneVotes + optionTwoVotes)),
        }
    }

    if(optionKey === answer) {
        return (
            <Badge.Ribbon size="small" text="Your vote" color="green">
                <Card style={{ borderColor: '#52c41a' }}>
                    { question[optionKey].text }
                    <Progress percent={percentageOf(question)[optionKey]} size="small" />
                    { question[optionKey].votes.length } of { question.optionOne.votes.length + question.optionTwo.votes.length}
                </Card>
            </Badge.Ribbon>
        )
    }

    return (
        <Card>
            { question[optionKey].text }
            <Progress percent={percentageOf(question)[optionKey]} size="small" />
            { question[optionKey].votes.length } of { question.optionOne.votes.length + question.optionTwo.votes.length}
        </Card>
    )
    
}

const QuestionResult = ({
    question = {},
    answer = null
}) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/')
    }

    return (
        <>
            <Row>
                <Col style={{ textAlign: 'center' }} span={24}>
                    <QuestionMark
                        question={question}
                        answer={answer}
                        optionKey="optionOne"
                    />
                    <Divider style={{ fontSize: 12, margin: '6px 0' }}></Divider>
                    <QuestionMark
                        question={question}
                        answer={answer}
                        optionKey="optionTwo"
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginTop: 20}}>
                    <Button
                        block
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </Col>
            </Row>
        </>
    )
}

const Question = () => {
    const { question_id } = useParams();
    const dispatch = useDispatch();
    const { authUser, users, question } = useSelector(({ questions, auth, users }) => ({
        question: questions[question_id] || {},
        authUser: users[auth] || {},
        users
    }));

    const [ answer, setAnswer ] = useState(authUser?.answers[question_id] || null);

    const handleSubmit = () => {
        dispatch(answerToQuestion({
            authedUser: authUser?.id,
            qid: question_id,
            answer
        }))
    }

    const handleChange = (e) => {
        setAnswer(e.target.value);
    }

    const author = question.author ? users[question.author] || {} : {};

    return (
        <Row justify="center" style={{ paddingTop: 0 }}>
            <Card style={{ width: 300, marginTop: 16 }}>
                <Row>
                    <Col span={8}>
                        <Avatar
                            size={48}
                            src={ author.avatarURL }
                        />
                    </Col>
                    <Col span={16}>
                        <h3>{`${author.name} asks:`}</h3>
                        <p>Would you rather?</p>
                    </Col>
                </Row>
                {
                    authUser.answers[question_id]
                        ?   <QuestionResult
                                answer={answer}
                                question={question}
                            />
                        :   <QuestionForm
                                answer={answer}
                                question={question}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                }
            </Card>
        </Row>
    )
}

export default Question;