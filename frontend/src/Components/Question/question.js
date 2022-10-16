import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import "./question.css";
import { getQuestion } from '../../apiCalls/axios'
import { sleep } from '../Sleep/sleep'
import { MyContext } from '../../store'


const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Question() {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(null);
    const [number, setNumber] = useState(0)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const { totalQuestions, setTotalQuestions } = useContext(MyContext)

    const fetchQuestions = () => {
        if (totalQuestions === number) {
            navigate('/result');
        } else {
            getQuestion(number + 1).then(async (data) => {
                setNumber(number + 1)
                setQuestion(data.question);
                setAnswer(data.answers);
                setTotalQuestions(data.questionscount)
                setCounter(data.question.allowedtime)
                // setCounter(5)
            })
        }
    }

    const waitFetchQuestions = async () => {
        await sleep(3000)
        fetchQuestions()
    }

    const submitAnswer = async (option) => {
        setSelectedOption(option)
        if (answer.answer === option) {
            let mark = parseInt(localStorage.getItem('mark'))
            mark = mark + 1
            localStorage.setItem('mark', mark)
            setCounter(0)
        }
        else {
            setCounter(0)
        }
    }

    useEffect(() => {
        if (counter > 0) {
            const interval = setInterval(() => {
                setCounter((counter) => counter - 1);
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
        if (counter === 0) {
            waitFetchQuestions()
        }
    }, [counter]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchQuestions()
        }
    }, []);

    return (
        <div className="question">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Box className="left">
                    <Typography color='black'>
                        There are {totalQuestions - question.questionNumber} queries left in {totalQuestions}
                    </Typography>
                </Box>
                <Typography>
                    {question.questionNumber}. {question.question}
                </Typography>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    {
                        counter === 0 ?
                            <Grid item xs={6} md={6}>
                                {
                                    answer.answer === 'option1'
                                        ? <Item className="Answer" style={{ backgroundColor: '#90EE90' }}>{answer.option1}</Item>
                                        : <>
                                            {
                                                selectedOption === 'option1' ?
                                                    <Item className="Answer" style={{ backgroundColor: 'red' }}>{answer.option1}</Item>
                                                    : <Item className="Answer">{answer.option1}</Item>
                                            }
                                        </>
                                }
                                {
                                    answer.answer === 'option2'
                                        ? <Item className="Answer" style={{ backgroundColor: '#90EE90' }}>{answer.option2}</Item>
                                        : <>
                                            {
                                                selectedOption === 'option2' ?
                                                    <Item className="Answer" style={{ backgroundColor: 'red' }}>{answer.option2}</Item>
                                                    : <Item className="Answer">{answer.option2}</Item>
                                            }
                                        </>
                                }
                                {
                                    answer.answer === 'option3'
                                        ? <Item className="Answer" style={{ backgroundColor: '#90EE90' }}>{answer.option3}</Item>
                                        : <>
                                            {
                                                selectedOption === 'option3' ?
                                                    <Item className="Answer" style={{ backgroundColor: 'red' }}>{answer.option3}</Item>
                                                    : <Item className="Answer">{answer.option3}</Item>
                                            }
                                        </>
                                }
                                {
                                    answer.answer === 'option4'
                                        ? <Item className="Answer" style={{ backgroundColor: '#90EE90' }}>{answer.option4}</Item>
                                        : <>
                                            {
                                                selectedOption === 'option4' ?
                                                    <Item className="Answer" style={{ backgroundColor: 'red' }}>{answer.option4}</Item>
                                                    : <Item className="Answer">{answer.option4}</Item>
                                            }
                                        </>
                                }
                            </Grid> :
                            <Grid item xs={6} md={6}>
                                <Item className="Answer" onClick={() => { submitAnswer('option1') }}>{answer.option1}</Item>
                                <Item className="Answer" onClick={() => { submitAnswer('option2') }}>{answer.option2}</Item>
                                <Item className="Answer" onClick={() => { submitAnswer('option3') }}>{answer.option3}</Item>
                                <Item className="Answer" onClick={() => { submitAnswer('option4') }}>{answer.option4}</Item>
                            </Grid>
                    }
                </Grid>
                {counter > 0 &&
                    <Box className="counter">
                        {counter < 10 ?
                            <Typography color='red'>
                                {counter} Second left
                            </Typography> :
                            <Typography color='black'>
                                {counter} Second left
                            </Typography>
                        }
                    </Box>
                }
                {/* <Button color="success" variant="contained" onClick=''>Enter to next Question</Button> */}


            </Grid>
        </div>
    )
}