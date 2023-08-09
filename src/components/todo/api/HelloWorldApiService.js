import apiClient from "./ApiClient";

export const retrieveHelloWorldBean
    = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldPathVariable
    = (name) => apiClient.get(`/hello-world/path-variable/${name}`)