

const Subscribe = ({email, jwt}) => {

    const subscribe = async (e) => {
        e.preventDefault();
        await fetch("https://7nmaj6z49h.execute-api.us-east-2.amazonaws.com/test/subscribe", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": jwt
            },
            body: JSON.stringify({email: email})
        });
        alert("You successfully subscribed. Check your email for our latest notification!");
    };

    return (
        <input className='btn' onClick={subscribe} type="submit" value="Subscribe"/>
    );
};

export default Subscribe;