import Letter from "./Letter";

const Grid = ({letters}) => {

    return (
        <div className="grid">
        {letters.map((letter) => {
            if(letter.id === 5) {
                return <Letter key={letter.id} letter={letter.text} className="fifthLetter" />
            }
            else {
                return <Letter key={letter.id} letter={letter.text} className="letter" />
            }
        })}
        </div>
    );
};


export default Grid;