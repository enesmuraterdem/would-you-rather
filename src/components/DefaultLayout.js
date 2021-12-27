import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Row, Col } from 'antd';
import { setAuthUser } from '../store/actions/auth';

const DefaultLayout = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { authUser } = useSelector(({ auth, users }) => ({
        authUser: users[auth],
     }));
    const pages = {
        '/': 'Home',
        '/add': 'New Poll',
        '/leaderboard': 'Leaderboard'
    }

    const handleLogout = () => {
        dispatch(setAuthUser(null))
    }

    return (
        <Layout style={{ height: '100%'}}>
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white' }}>
                <Row>
                    <Col flex="auto">
                        <Menu
                            mode="horizontal"
                            style={{ flex: '50%' }}
                            selectedKeys={ location.pathname }
                        >
                            {
                                Object.keys(pages).map((path) => (
                                    <Menu.Item key={path}>
                                        <Link to={path}>{pages[path]}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                    </Col>
                    <Col style={{ margin: '0 20px' }}>
                        <Avatar
                            alt={authUser.name}
                            src={authUser.avatarURL}
                            style={{ marginRight: 10 }}
                            size="small"
                        />
                        <span style={{ color: '#333' }}>{ authUser.name }</span>
                    </Col>
                    <Col>
                        <Button
                            style={{ marginLeft: 'auto' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content style={{ marginTop: 60, padding: '32px 0' }}>
                { children }
            </Layout.Content>
        </Layout>
    )
}

export default DefaultLayout;