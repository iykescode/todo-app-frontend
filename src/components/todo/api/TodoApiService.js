import apiClient from "./ApiClient";

export const retrieveTodosByUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoApi
    = (id) => apiClient.delete(`/todos/${id}`)

export const editTodoApi
    = (id) => apiClient.get(`/todos/${id}`)

export const updateTodoApi
    = (id, todo) => apiClient.put(`/todos/${id}`, todo)

export const createTodoApi
    = (todo, username) => apiClient.post(`/users/${username}/todos/add`, todo)