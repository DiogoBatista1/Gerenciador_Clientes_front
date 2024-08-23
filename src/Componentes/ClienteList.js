import React, { useEffect, useState } from "react";
import ClienteService from "../Servicos/ClienteService";
import { Link } from 'react-router-dom';
import { Table, Button, Alert, Container, Row, Col, AlertLink } from 'react-bootstrap';

function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const [expandedCliente, setExpandedCliente] = useState(null);
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

    const toggleExpandCliente = (id) => {
        setExpandedCliente(expandedCliente === id ? null : id);
    }

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2 className="text-center">Lista de Clientes</h2>
                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/add">
                            <Button variant="primary">Adicionar Cliente</Button>
                        </Link>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {clientes.length === 0 ? (
                        <Alert variant="warning">Não há clientes cadastrados.</Alert>
                    ) : (
                        <Table striped bordered hover>
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
                                    <tr key={cliente.id}
                                        onClick={() => toggleExpandCliente(cliente.id)}
                                        onMouseEnter={() => setExpandedCliente(cliente.id)}
                                        onMouseLeave={() => setExpandedCliente(null)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>
                                            {expandedCliente === cliente.id ? (
                                                cliente.telefones.map(t => <p key={t.id}>{t.numero}</p>)
                                            ) : 
                                            (
                                                <p>{cliente.telefones[0]?.numero || "Sem telefone"}</p>
                                            )}
                                        </td>
                                        <td>
                                            {expandedCliente === cliente.id ? (
                                                cliente.emails.map(e => <p key={e.id}>{e.endereco}</p>)
                                            ) : (
                                                <p>{cliente.emails[0]?.endereco || "Sem email"}</p>
                                            )}
                                        </td>
                                        <td className="d-flex justify-content-around">
                                            <Link to={`/edit/${cliente.id}`} className="btn btn-warning btn-sm">
                                                Editar
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteCliente(cliente.id)
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ClienteList;