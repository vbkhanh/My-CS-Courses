import { useState, useEffect } from "react";
import PlayBTN from "./boardcomponents/PlayBTN";
import Table from "./boardcomponents/Table";

const LeaderBoard = () => {
    
    const [jwt, setJWT] = useState('');
    const [board, setBoard] = useState([]); 
    const [target, setTarget] = useState('');

    const fetchBoard = async () => {
        const response = await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/getscores", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": jwt
            },
            body: JSON.stringify({letters: target, limit: 5})
        });
        const data = await response.json();
        return data.result;
    };

    useEffect(() => {
        setTarget(localStorage.getItem('target'));
    }, []);

    useEffect(() => {
        setJWT(localStorage.getItem('jwt'));
        const getBoard = async () => {
            const data = await fetchBoard();
            if(data.hasOwnProperty('Items')) {
                let list = data.Items;
                for(let i=0; i<list.length; i++) {
                    list[i].id = i;
                }
                setBoard(list);
            }
        };

        if(jwt != "") {
            getBoard();
        }
    }, [jwt])

    return (
        <div>
            <PlayBTN />
            <h2>Leader Board</h2>
            <Table board={board}/>
        </div>
    );
};

export default LeaderBoard;