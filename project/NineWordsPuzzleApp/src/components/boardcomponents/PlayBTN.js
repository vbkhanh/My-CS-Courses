
import { useNavigate } from 'react-router-dom';


const PlayBTN = () => {

    const navigate = useNavigate();

    const playGame = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <input className='btn' type="submit" value="Play" onClick={playGame}/>
    );
};


export default PlayBTN;