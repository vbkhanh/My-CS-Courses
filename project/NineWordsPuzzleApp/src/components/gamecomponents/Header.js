//import PropTypes from 'prop-types';


const Header = ({username}) => {
    return (
        <header>
            <h1>WORD TARGET</h1>
            <h4>Hi {username}! Don't be a loser today.</h4>
        </header>
    );
}

/*Header.defaultProps = {
    name: 'NO NAME'
};

Header.propTypes = {
    name: PropTypes.string
}*/

export default Header;