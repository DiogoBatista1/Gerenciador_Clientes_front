import React, { useEffect, useState } from "react";
import ClienteService from "../Servicos/ClienteService";
import { Link } from 'react-router-dom';

function ClienteList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        ClienteService.getAllClientes().then((reponse) => {
            setClientes(response.data);
        });
    }, []);

    const deleteCliente = (id) => {
         ClienteService.deleteCliente(id).then(() => {
            setClientes(clientes.filter(cliente => cliente.id !== id));
         });
    };

    return (
        <div>
            <h2>Lista de clientes</h2>
            <Link to="/add">Adicionar cliente</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {clientes.map((cliente)=> {
                    <tr key={cliente.id}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.endereco}</td>
                        <td>
                            <Link to={`/edit/${cliente.id}`}>Editar</Link>
                            <button onClick={() => deleteCliente(cliente.id)}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </div>        
    )
}

export default ClienteList;