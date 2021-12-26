import React from 'react';

const QuestionCard = ({
    author = 'N/A',
    optionOne,
    optionTwo,
    onClickAnswer = () => {}
}) => {
    return (
        <div>
            {author } asks:
            would you rather?
            <div>
                { optionOne.text } 
            </div>
            <div>
                { optionTwo.text } 
            </div>
            <button onClick={onClickAnswer}>Answer Pool</button>
        </div>
    )
}

export default QuestionCard;