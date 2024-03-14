import { useState } from "react";

const Form = ({jwt, target, point, setPoint, correctAnswers, setCorrectAnswers, updateOrCreateUserData}) => {

    const [word, setWord] = useState('');
    const [messages, setMessages] = useState({
        correct: "Correct! Good Job, Buddy!",
        wrong: "Wrong! What a loser!",
        repeat: "Repeat! Don't try to fool me."
    });
    const [message, setMessage] = useState("");


    const onChange = (e) => {
        let input = e.target.value.trim();
        input = input.toLowerCase();
        setWord(input);
    };

    const submitWord = async (e) => {
        e.preventDefault();
        console.log(target);
        const response = await fetch('https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/checkword', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": jwt
            },
            body: JSON.stringify({target: target, word: word})
        });

        const data = await response.json();

        if(data.valid) {
            if(correctAnswers.includes(word)) {
                setMessage(messages.repeat);
            }
            else {
                setMessage(messages.correct);
                setPoint(point+data.score);
                setCorrectAnswers([...correctAnswers, word]);
            }
        }
        else {
            setMessage(messages.wrong);
        }

    };  
    
    return (
        <form className='frm' onSubmit={submitWord}>
            <h4>{message}</h4>
            <div>
                <label>Enter a word: </label>
                <input type="text" placeholder="God bless you..." value={word} onChange={onChange}/>
            </div>
            <br></br>
            <input className='btn' type="submit" value="Submit"/>
        </form>
        
    );
};


export default Form;