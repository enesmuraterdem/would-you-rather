import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Divider, Row, Col, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addNewQuestion } from '../store/actions/questions';

const CreatePool = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { author } = useSelector(({ auth }) => ({
        author: auth,
    }));
    const [ options, setOptions ] = useState({
        optionOneText: '',
        optionTwoText: ''
    });

    const handleChange = (node, value) => {
        setOptions({
            ...options,
            [node]: value
        })
    }

    const onSubmit = () => {
        dispatch(addNewQuestion({
            author,
            ...options
        }, navigate))
        setOptions({
            optionOneText: '',
            optionTwoText: ''
        })
    }

    return (
        <Row justify="center" style={{ paddingTop: 0 }}>
            <Card title="Create poll" >
                <Input
                    placeholder={"Enter option one..."}
                    onChange={(e) => handleChange('optionOneText', e.target.value)}
                />
                <Divider style={{ fontSize: 12, margin: '6px 0' }}>OR</Divider>
                <Input
                    placeholder={"Enter option two..."}
                    onChange={(e) => handleChange('optionTwoText', e.target.value)}
                />
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Button
                            block
                            disabled={!options.optionOneText || !options.optionTwoText}
                            onClick={onSubmit}
                        >
                            Add Pool
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default CreatePool;