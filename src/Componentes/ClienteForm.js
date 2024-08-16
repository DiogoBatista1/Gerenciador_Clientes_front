import React, { useState, useEffect } from 'react';
import ClienteService from '../Servicos/ClienteService';
import { useParams, useNavigate } from 'react-router-dom';

function ClienteForm() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            ClienteService.getClienteById(id).then((response) => {
                setNome(response.data.nome);
                setEndereco(response.data.endereco);
            })
        }
    }, [id]);

    const saveOrUpdateCliente = (e) => {
        e.preventDefault();
        const cliente = { nome, endereco };

        if (id) {
            ClienteService.updateCliente(id, cliente).then(() => {
                NavigationPreloadManager('/clientes');
            });
        } else {
            ClienteService.createCliente(cliente).then(() => {
                NavigationPreloadManager('/clientes');
            })
        }
    }

    return (
        <div>
            <h2>{id ? 'Editar cliente' : 'Adicionar cliente'}</h2>
            <form onSubmit={saveOrUpdateCliente}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Endereço:</label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default ClienteForm;