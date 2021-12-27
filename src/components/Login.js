import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/actions/users';
import { loginUser } from '../store/actions/auth';
import { Row, Col, Image, Card, Select, Avatar, Button } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector(({ users }) => ({
        users
    }));
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        dispatch(getUsers());
    }, [ dispatch ])

    const handleUserSelect = value => {
        setUserId(value)
    }

    const handleClick = () => {
        dispatch(loginUser(userId, navigate))
    }

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col flex="320px">
                <Card title="Welcome to the Would You Rather?">
                    <Row>
                        <Col span={24} align="middle" style={{ marginBottom: 24 }}>
                            <Image
                                width={ 150 }
                                src="/images/wouldYouRather.png"
                                preview={false}
                            />
                        </Col>
                        <Col span={24} style={{ marginBottom: 8 }}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select user.."
                                value={userId}
                                onChange={handleUserSelect}
                            >
                                {
                                    Object
                                    .keys(users)
                                    .map(key => (
                                        <Select.Option
                                            key={key}
                                            value={users[key].id}
                                        >
                                            <Avatar
                                                alt={users[key].name}
                                                src={users[key].avatarURL}
                                                style={{ marginRight: 10 }}
                                                size="small"
                                            />
                                            { users[key].name }
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Col>
                        <Col span={24} align="middle">
                            <Button
                                block
                                onClick={() => handleClick()}
                                disabled={!userId}
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;