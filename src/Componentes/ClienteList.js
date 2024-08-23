import React, { useEffect, useState } from "react";
import ClienteService from "../Servicos/ClienteService";
import { Link } from 'react-router-dom';

function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        ClienteService.getAllClientes()
            .then((response) => {
                setClientes(response.data);
                setError(null);
            })
            .catch((error) => {
                setError('Não foi possível carregar os dados dos clientes.');
                console.error(error);
            });
    }, []);

    const deleteCliente = (id) => {
        ClienteService.deleteCliente(id)
            .then(() => {
                setClientes(clientes.filter(cliente => cliente.id !== id));
                setError(null);
            })
            .catch((error) => {
                setError('Não foi possível excluir o cliente.')
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Lista de clientes</h2>
            <Link to="/add">Adicionar cliente</Link>
            {error && <p className="error">{error}</p>}
            {clientes.length === 0 ? (
                <p>Não há clientes cadastrados.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>
                                    {cliente.telefones && cliente.telefones.map(t =>
                                        <p key={t.id}>{t.numero}</p>)}
                                </td>
                                <td>
                                    {cliente.emails && cliente.emails.map(e =>
                                        <p key={e.id}>{e.endereco}</p>)}
                                </td>
                                <td>
                                    <Link to={`/edit/${cliente.id}`}>Editar</Link>
                                    <button onClick={() => deleteCliente(cliente.id)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ClienteList;