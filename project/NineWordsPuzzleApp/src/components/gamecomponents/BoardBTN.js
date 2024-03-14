import { useNavigate } from 'react-router-dom';


const BoardBTN = () => {
    
    const navigate = useNavigate();

    const getBoard = (e) => {
        e.preventDefault();
        navigate("/leaderboard");
    };

    return (
        <input className='btn' type="submit" value="Leader Board" onClick={getBoard}/>
    );
};

export default BoardBTN;