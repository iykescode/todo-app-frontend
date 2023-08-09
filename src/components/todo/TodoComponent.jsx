import {useNavigate, useParams} from "react-router-dom";
import {createTodoApi, editTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAuth} from "./security/AuthContext";
import moment from "moment";

function TodoComponent() {

    const authContext = useAuth();
    const username = authContext.username;
    const navigate  = useNavigate();

    const { id } = useParams();
    const [ description, setDescription ] = useState('');
    const [ targetDate, setTargetDate ] = useState('');

    useEffect(
        () => retrieveTodos(),
        []
    )

    function retrieveTodos() {
        if( id >= 1 ) {
            editTodoApi(id)
                .then( ( response ) => {
                    setDescription( response.data.description )
                    setTargetDate( response.data.targetDate )
                } )
                .catch( ( error ) => console.log( error ) )
        }
    }

    function onSubmit( values ) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        };

        if( id >= 1 ) {
            updateTodoApi( id, todo )
                .then( ( response ) => {
                    navigate( '/todos' )
                } )
                .catch( ( error ) => console.log( error ) )
        } else {
            createTodoApi(todo, username)
                .then( ( response ) => {
                    navigate( '/todos' )
                } )
                .catch( ( error ) => console.log( error ) )
        }
    }

    function validate( values ) {
        let errors = {};

        if( values.description.length < 5 )
            errors.description = 'Description must be at least 5 characters';

        if( values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid() )
            errors.targetDate = 'Target Date must not be empty'

        return errors;
    }

    return (
        <div>
            <h1>Todo Component</h1>
            <div>
                <Formik initialValues={ { description, targetDate } } enableReinitialize={true} onSubmit={onSubmit} validate={validate}>
                    {
                        ( props ) => (
                            <Form>
                                <fieldset className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <Field type="text" className="form-control" name="description" id="description" />
                                        <ErrorMessage name="description" component="div" className="text-danger p-2" />
                                    </div>
                                </fieldset>
                                <fieldset className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="targetDate">Target date:</label>
                                    </div>
                                    <div className="col-sm-10">
                                        <Field type="date" className="form-control" name="targetDate" id="targetDate" />
                                    </div>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-5">Update</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}

export default TodoComponent;