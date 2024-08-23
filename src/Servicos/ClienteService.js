import axios from 'axios';


const API_URL = 'http://localhost:8080/clientes';

// interceptores para depuração
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('Error Response:', error.response);
    return Promise.reject(error);
}
);

class ClienteService {
    getAllClientes() {
        return axios.get(API_URL);
    }

    getClienteById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createCliente(cliente) {
        return axios.post(API_URL, cliente);
    }

    updateCliente(id, cliente) {
        return axios.put(`${API_URL}/${id}`, cliente);
    }

    deleteCliente(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    getTiposTelefone() {
        return axios.get(`${API_URL}/tipos-telefone`);
    }    
}

const clienteServiceInstance = new ClienteService();
export default clienteServiceInstance;