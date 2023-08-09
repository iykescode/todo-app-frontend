import {deleteTodoApi, retrieveTodosByUsernameApi} from "./api/TodoApiService";
import {useEffect, useState} from "react";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

function ListTodosComponent() {

    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(
        () => refreshTodos(),
        []
    )

    function refreshTodos() {
        retrieveTodosByUsernameApi(username)
            .then( (response) => setTodos(response.data) )
            .catch( (error) => console.log(error) )
    }

    function deleteTodo(id) {
        deleteTodoApi(id)
            .then(
                () => {
                    setMessage('Todo deleted successfully!!')
                    refreshTodos()
                    setInterval(() => {
                        setMessage(null)
                    }, 5000)
                }
            )
            .catch( (error) => console.log(error) )
    }

    function editTodo( id ) {
        navigate( `/todos/${ id }` )
    }

    function addTodo() {
        navigate( '/todos/add' )
    }

    return (
        <div className="container">
            <h1>Things you want to do!</h1>
            { message && <div className="alert alert-info">{ message }</div> }
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           todos.map(
                               todo => (
                                   <tr key={todo.id}>
                                       <td>{todo.id}</td>
                                       <td>{todo.description}</td>
                                       <td>{todo.done.toString()}</td>
                                       <td>{todo.targetDate.toString()}</td>
                                       <td>
                                           <button className="btn btn-warning" onClick={() => editTodo(todo.id)}>Edit</button>
                                       </td>
                                       <td>
                                           <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                       </td>
                                   </tr>
                               )
                           )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-dark m-3" onClick={addTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent;