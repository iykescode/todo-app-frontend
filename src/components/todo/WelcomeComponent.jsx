import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";

function WelcomeComponent() {

    const {username} = useParams();
    const [message, setMessage] = useState();

    function callHelloWorldBeanRestApi() {
        retrieveHelloWorldBean()
            .then( (response) => successfulResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('cleanup') )
    }

    function callHelloWorldPathVariableRestApi() {
        retrieveHelloWorldPathVariable("Ranga")
            .then( (response) => successfulResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('cleanup') )
    }

    function successfulResponse(response) {
        console.log(response);
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <div className="WelcomeComponent">
            <div>
                <h1>Welcome {username}</h1>
                <div>
                    Manage your <Link to="/todos">Todos</Link>
                </div>
                <div>
                    <button className="btn btn-success m-5" onClick={callHelloWorldBeanRestApi}>Call Hello World</button>
                    <button className="btn btn-success m-5" onClick={callHelloWorldPathVariableRestApi}>Call Hello World Path Variable 'Ranga'</button>
                </div>
                <div>
                    <h3 className="text-info">{message}</h3>
                </div>
            </div>
        </div>
    )
}

export default WelcomeComponent;