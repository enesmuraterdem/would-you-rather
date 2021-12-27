import React from 'react';
import { Card, Avatar, Button, Divider, Row, Col } from 'antd';
const QuestionCard = ({
    isAnswered = false,
    author = 'N/A',
    optionOne,
    optionTwo,
    onClickAnswer = () => {}
}) => (
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
        <Row>
            <Col style={{ textAlign: 'center' }} span={24}>
                <span>{ optionOne.text }</span>
                <Divider style={{ fontSize: 12, margin: '6px 0' }}>OR</Divider>
                <span>{ optionTwo.text }</span>
            </Col>
        </Row>
        <Row>
            <Col span={24} style={{ marginTop: 10}}>
                <Button
                    block
                    onClick={onClickAnswer}
                >
                    {
                        isAnswered
                            ? 'Results'
                            : 'Answer Pool'
                    }
                </Button>
            </Col>
        </Row>
    </Card>
)

export default QuestionCard;