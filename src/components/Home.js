import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tabs, Card, Row } from 'antd';
import { getQuestions } from '../store/actions/questions';
import QuestionCard from './QuestionCard';

const Home = props => {
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
    }, [])

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (key) => {
        setPanel(key);
    };

    const handleClickAnswer = (questionId) => {
        console.log('questionId', questionId)
        navigate(`/question/${questionId}`)
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
/*
    return (
        <div sx={{ width: '100%' }}>
            <div sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div value={panel} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example" centered>
                    <div label="Unanswered" {...a11yProps(0)} />
                    <div label="Answered" {...a11yProps(1)} />
                </div>
            </div>
            <div value={panel} index={0}>
                {
                    Object
                    .keys(questions)
                    .filter(key => !authUser?.answers[key])
                    .map(key => (
                        <QuestionCard
                            isAnswered={false}
                            key={key}
                            id={key}
                            author={questions[key].author}
                            optionOne={questions[key].optionOne}
                            optionTwo={questions[key].optionTwo}
                            onClickAnswer={() => handleClickAnswer(key)}
                        />
                    ))
                }
            </div>
            <div value={panel} index={1}>
                {
                        Object
                        .keys(questions)
                        .filter(key => authUser?.answers[key])
                        .map(key => (
                            <QuestionCard
                                isAnswered={true}
                                key={key}
                                id={key}
                                author={questions[key].author}
                                optionOne={questions[key].optionOne}
                                optionTwo={questions[key].optionTwo}
                                onClickAnswer={() => handleClickAnswer(key)}
                            />
                        ))
                    }
            </div>
        </div>
    );
*/
}

export default Home;