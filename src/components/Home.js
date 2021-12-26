import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Box,
    Typography,
    AppBar
} from '@mui/material';
import { getQuestions } from '../store/actions/questions';
import QuestionCard from './QuestionCard';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            { children }
          </Box>
        )}
      </div>
    );
}

const Home = props => {
    const dispatch = useDispatch();
    const { questions, auth } = useSelector(({ questions, auth}) => ({
       questions,
       auth,
    }));
    const [ panel, setPanel ] = useState(0)

    useEffect(() => {
        dispatch(getQuestions());
    }, [])

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setPanel(newValue);
    };

    const handleClickAnswer = (event) => {
        
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={panel} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Unanswered" {...a11yProps(0)} />
                    <Tab label="Answered" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={panel} index={0}>
                {
                    Object
                    .keys(questions)
                    .filter(key => !auth.answers[key])
                    .map(key => (
                        <QuestionCard
                            key={key}
                            id={key}
                            author={questions[key].author}
                            optionOne={questions[key].optionOne}
                            optionTwo={questions[key].optionTwo}
                            onClickAnswer={() => handleClickAnswer(key)}
                        />
                    ))
                }
            </TabPanel>
            <TabPanel value={panel} index={1}>
                {
                        Object
                        .keys(questions)
                        .filter(key => auth.answers[key])
                        .map(key => (
                            <QuestionCard
                                key={key}
                                id={key}
                                author={questions[key].author}
                                optionOne={questions[key].optionOne}
                                optionTwo={questions[key].optionTwo}
                                onClickAnswer={() => handleClickAnswer(key)}
                            />
                        ))
                    }
            </TabPanel>
        </Box>
    );
  }
export default Home;