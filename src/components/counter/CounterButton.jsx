import {PropTypes} from "prop-types";

function CounterButton( {prop, incrementMethod, decrementMethod} ) {

    return (
        <div className="CounterButton">
            <div>
                <button className="counterButton" onClick={() => decrementMethod(prop)}>-{prop}</button>
                <button className="counterButton" onClick={() => incrementMethod(prop)}>+{prop}</button>
            </div>
        </div>
    );
}

CounterButton.propTypes = {
    prop: PropTypes.number
}

CounterButton.defaultProps = {
    prop: 1
}

export default CounterButton;