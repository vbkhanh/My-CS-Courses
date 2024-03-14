import { useState } from "react";


const Hint = ({jwt}) => {
    
    const [hint, setHint] = useState("");
    const [value, setValue] = useState("Yes");

    const getHint = async (e) => {
        e.preventDefault();
        
        if(value === "No") {
            setHint("");
            setValue("Yes");
            return;
        }

        const response = await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/hint", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": jwt
            },
            body: JSON.stringify({len: 3})
        });
        const data = await response.json();
        
        setHint(data.hint);

        setValue("No");
    };

    return (
        <form className='frm' onSubmit={getHint}>
            <h4>Wanna a hint?</h4>
            <p>{hint}</p>
            <input className='btn' type="submit" value={value}/>
        </form>
    );
};

export default Hint;