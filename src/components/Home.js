import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Row } from 'antd';
import { getQuestions } from '../store/actions/questions';
import QuestionCard from './QuestionCard';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, users, authUser } = useSelector(({ questions, auth, users }) => ({
       questions,
       authUser: users[auth],
       users
    }));
    const [ panel, setPanel ] = useState('Unanswered')

    useEffect(() => {
        dispatch(getQuestions());
    }, [ dispatch ])

    const handleChange = (key) => {
        setPanel(key);
    };

    const handleClickAnswer = (questionId) => {
        navigate(`/questions/${questionId}`)
    };

    const panelContentList = {
        Unanswered: Object
                        .keys(questions)
                        .filter(key => !authUser?.answers[key])
                        .sort((firstKey, secondKey) => questions[secondKey].timestamp - questions[firstKey].timestamp)
                        .map(key => (
                            <QuestionCard
                                isAnswered={false}
                                key={key}
                                id={key}
                                author={users[questions[key].author]}
                                optionOne={questions[key].optionOne}
                                optionTwo={questions[key].optionTwo}
                                onClickAnswer={() => handleClickAnswer(key)}
                            />
                        )),
        Answered: Object
                    .keys(questions)
                    .filter(key => authUser?.answers[key])
                    .sort((firstKey, secondKey) => questions[secondKey].timestamp - questions[firstKey].timestamp)
                    .map(key => (
                        <QuestionCard
                            isAnswered={true}
                            key={key}
                            id={key}
                            author={users[questions[key].author]}
                            optionOne={questions[key].optionOne}
                            optionTwo={questions[key].optionTwo}
                            onClickAnswer={() => handleClickAnswer(key)}
                        />
                    )),
    };

    return (
        <Row justify="center" style={{ paddingTop: 0 }}>
            <Card
                tabList={[
                    {
                      key: 'Unanswered',
                      tab: 'Unanswered',
                    },
                    {
                      key: 'Answered',
                      tab: 'Answered',
                    },
                ]}
                tabProps={{
                    centered: true
                }}
                activeTabKey={panel}
                onTabChange={handleChange}
            >
                {
                    panelContentList[panel]
                }
            </Card>
        </Row>
        

    )
}

export default Home;