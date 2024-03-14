import Header from './gamecomponents/Header';
import Form from './gamecomponents/Form';
import Grid from './gamecomponents/Grid';
import Hint from './gamecomponents/Hint';
import Point from './gamecomponents/Point';
import Signout from './Signout';
import BoardBTN from './gamecomponents/BoardBTN';
import Subscribe from './gamecomponents/Subscribe';
import { useState, useEffect } from "react";
import { useAuthContext } from "./Authentication";

// how to get state from local storage: https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js/28314706#28314706

const GameArea = () => {
  const [userData, setUserData] = useState({username:""});
  const [letters, setLetters] = useState([]);
  const [target, setTarget] = useState('');
  const [point, setPoint] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [jwt, setJWT] = useState('');

  const { getCurrentUser, getCurrentUserData } = useAuthContext();

  

  const fetchWord = async () => {
    const response = await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/getword", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": jwt
      }
    });
    const data = await response.json();
    return data.target;
  };

  const updateOrCreateUserData = async (currentUserName, userEmail) => {
    const response = await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/updateuser", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": jwt
      },
      body: JSON.stringify({username: currentUserName, email: userEmail, letters: target, score: point, answers: correctAnswers})
    });
    const data = await response.json();
    return data;
  };

  const fetchUserData = async (currentUserName) => {
    const response = await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/getuser", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": jwt
      },
      body: JSON.stringify({username: currentUserName, letters: target})
    });
    const data = await response.json();
    return data.user.Item;
  };

  const getUserEmail = async () => {
    let data = await getCurrentUserData();
    return data[2]["Value"];
  };

  const updateOrCreateUser = async () => {
    let currentUser = getCurrentUser();
    let email = await getUserEmail();
    const response = await updateOrCreateUserData(currentUser.username, email);
    return response;
  }

  useEffect(() => {
    setJWT(localStorage.getItem('jwt'));
    const getWord = async () => {
        const word = await fetchWord();
        setTarget(word);
       
        const letters = word.split("");
        let list = [];
        for(let i=0; i<letters.length; i++) {
            let letter = {
                id: i+1,
                text: letters[i]
            }
            list.push(letter);
        }
        setLetters(list);
    }
    if(jwt !== "") {
      getWord();
    }
   

  },[jwt]);

  useEffect(() => {
    const getUser = async () => {
      let currentUser = getCurrentUser();
      const data = await fetchUserData(currentUser.username);
      setUserData(data);
    }

    if(target !== "") {
      localStorage.setItem('target', target);
      getUser();
    }

  }, [target]);
  
  useEffect(() => {
    if(userData.username !== "") {
      if(userData.username === null) {
        updateOrCreateUser();
      }
      else {
        setPoint(userData.score);
        setCorrectAnswers(userData.answers);
      }
    }
  }, [userData]);

  useEffect(() => {
    if(point !== 0 && correctAnswers.length !== 0) {
      updateOrCreateUser();
    }
  }, [correctAnswers, point]);

  return (
    <div>
      <div className="ctn2">
        <BoardBTN />
        <Signout />
        <Subscribe email={userData.email} jwt={jwt}/>
      </div>
      <Header username={getCurrentUser().username}/>
      <div className="ctn1">
        <Point point={point}/>
        <Grid letters={letters}/>
        <Hint jwt={jwt}/>
      </div>
      <Form jwt={jwt} target={target} point={point} setPoint={setPoint} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} updateOrCreateUserData={updateOrCreateUserData}/>
    </div>
  );

};

export default GameArea;