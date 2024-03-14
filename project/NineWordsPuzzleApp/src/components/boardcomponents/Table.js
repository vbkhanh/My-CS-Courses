
import Row from './Row';

const Table = ({board}) => {
    return (
        <table>
            <tbody>
            <tr>
                <th>User</th>
                <th>Point</th>
            </tr>
            {board.map((user) => {
                return <Row key={user.id} username={user.username} point={user.score}/>
            })}
            </tbody>
        </table>
    );
};

export default Table;