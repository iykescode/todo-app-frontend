import "./Counter.css";
import {useState} from "react";
import CounterButton from "./CounterButton";

function Counter() {

    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(prop) {
        setCount(count + prop)
    }

    function decrementCounterParentFunction(prop) {
        setCount(count - prop)
    }

    function resetCounter() {
        setCount(0)
    }

    return (
        <div>
            <CounterButton prop={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <CounterButton prop={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <CounterButton prop={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
            <div>
                <span className="count">{count}</span>
            </div>
            <button className="resetButton" onClick={resetCounter}>Reset</button>
        </div>
    )
}

export default Counter;