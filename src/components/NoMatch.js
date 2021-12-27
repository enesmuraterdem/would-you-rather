import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Empty, Row, Button } from 'antd';

const NoMatch = () => {
    const navigate = useNavigate();
    return (
        <Layout.Content style={{ height: '100vh' }}>
            <Row justify="center" align="middle" style={{ height: '100%' }}>
                <Empty description="Nothing to see here">
                    <Button onClick={() => { navigate('/'); }}>
                        Back
                    </Button>
                </Empty>
            </Row>
        </Layout.Content>
    )
}

export default NoMatch;