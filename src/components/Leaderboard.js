import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    Avatar,
    Button,
    Divider,
    Row,
    Col,
    Badge
} from 'antd';
import {
    TrophyOutlined,
  } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const Leaderboard = () => {
    const { users } = useSelector(({ users }) => ({
        users
    }));

    const getUserPoint = ({ answers = {}, questions = {} }) => {
        const answerCount = Object.keys(answers).length;
        const questionCount = Object.keys(questions).length;
        return answerCount + questionCount;
    }

    const userRankProperties = [
        {
            color: 'gold'
        },
        {
            color: 'grey'
        },
        {
            color: 'orange'
        }
    ]

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col>
            {
                Object.keys(users)
                .sort((firstKey, secondKey) => {
                    const firstUserPoint = getUserPoint(users[firstKey]);
                    const secondUserPoint = getUserPoint(users[secondKey]);
                    return getUserPoint(users[secondKey]) - getUserPoint(users[firstKey])
                })
                .map((key, index) => {
                    const user = users[key];
                    return (
                        <Badge.Ribbon
                            key={key}
                            text={<TrophyOutlined /> || null}
                            color={ userRankProperties[index].color || 'cyan' }
                        >
                            <Card style={{ width: 300, marginTop: 16 }}>
                                <Row>
                                    <Col span={4}>
                                        <Avatar
                                            size={28}
                                            src={ user.avatarURL }
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <h3>{user.name}</h3>
                                    </Col>
                                    <Col span={4}>
                                        <Avatar 
                                            size={36}
                                            style={{ color: 'white', backgroundColor: userRankProperties[index].color }}
                                        >
                                            { getUserPoint(user) }
                                        </Avatar>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <span>Answered questions: { Object.keys(user.answers).length }</span>
                                    </Col>
                                    <Col span={24}>
                                        <span>Questions: { Object.keys(user.questions).length }</span>
                                    </Col>
                                </Row>
                            </Card>
                        </Badge.Ribbon>
                            
                    )
                })
            }
            </Col>
        </Row>
    )
}

export default Leaderboard;