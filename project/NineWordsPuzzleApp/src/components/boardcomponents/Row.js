

const Row = ({username, point}) => {
    return (
        <tr>
            <td>{username}</td>
            <td>{point}</td>
        </tr>
    );
};

export default Row;