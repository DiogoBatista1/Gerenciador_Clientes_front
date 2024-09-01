import React, { useEffect, useState } from "react";
import ClienteService from "../Servicos/ClienteService";
import { Link } from 'react-router-dom';
import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const [expandedCliente, setExpandedCliente] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    const fetchClientes = async (page, search) => {
        try {
            const response = await ClienteService.getClientesPaginados(page, 10, search);
            const data = response.data;
            setClientes(data.content);
            setPageCount(data.totalPages);
            setError(null);
        } catch (err) {
            setError('Não foi possível carregar os dados dos clientes.');
            console.error(err);
        } 
    }


    useEffect(() => {
        fetchClientes(currentPage, searchTerm)
    }, [currentPage, searchTerm]);

    const deleteCliente = (id) => {
        ClienteService.deleteCliente(id)
            .then(() => {
                setClientes(clientes.filter(cliente => cliente.id !== id));
                setError(null);
            })
            .catch((error) => {
                setError('Não foi possível excluir o cliente.');
                console.error(error);
            });
    };

    const toggleExpandCliente = (id) => {
        setExpandedCliente(expandedCliente === id ? null : id);
    };

    const handlePageClick = (data) => {
        const newPage = data.selected;
        setCurrentPage(newPage);
        fetchClientes(newPage, searchTerm);
    };


    return (
        <Container>
            <Row className="my-4 d-flex align-items-center">
                <Col className="text-center">
                    <h2 className="mb-4">Lista de Clientes</h2>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs={2} className="d-flex justify-content-start">
                    <Link to="/add">
                        <Button
                            variant="primary"
                            style={{
                                height: '40px',
                                marginRight: '10px'
                            }}
                        >Adicionar Cliente</Button>
                    </Link>
                </Col>
                <Col xs={9} className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Pesquisar cliente por nome"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="form-control mb-4"
                        style={{
                            height: '40px'
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {clientes.length === 0 ? (
                        <Alert variant="warning" className="text-center">Não há clientes cadastrados.</Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover className="align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nome</th>
                                        <th>Endereço</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Redes Sociais</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes
                                        .filter((cliente) =>
                                            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((cliente) => (
                                            <tr
                                                key={cliente.id}
                                                onClick={() => toggleExpandCliente(cliente.id)}
                                                onMouseEnter={() => setExpandedCliente(cliente.id)}
                                                onMouseLeave={() => setExpandedCliente(null)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <td>{cliente.nome}</td>
                                                <td>{cliente.endereco}</td>
                                                <td>
                                                    {expandedCliente === cliente.id ? (
                                                        cliente.telefones.map(t => (
                                                            <p key={t.id}>
                                                                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
                                                                <a href={`https://wa.me/${t.numero}`} target="_blank" rel="noopener noreferrer">
                                                                    {t.numero}</a>
                                                            </p>
                                                        ))
                                                    ) : (
                                                        <p>
                                                            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
                                                            {cliente.telefones[0]?.numero || "Sem telefone"}
                                                        </p>
                                                    )}
                                                </td>
                                                <td>
                                                    {expandedCliente === cliente.id ? (
                                                        cliente.emails.map(e => <p key={e.id}>{e.endereco}</p>)
                                                    ) : (
                                                        <p>{cliente.emails[0]?.endereco || "Sem email"}</p>
                                                    )}
                                                </td>
                                                <td>
                                                    {expandedCliente === cliente.id ? (
                                                        cliente.redesSociais.length > 0 ? (
                                                            <div className="social-buttons-group">
                                                                {cliente.redesSociais.map((redeSocial, index) => (
                                                                    <a
                                                                        key={index}
                                                                        href={redeSocial.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className={`btn btn-social ${redeSocial.nome.toLowerCase()} btn-sm`}
                                                                    >
                                                                        {redeSocial.nome}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p>Sem redes sociais</p>
                                                        )
                                                    ) : (
                                                        <p>
                                                            {cliente.redesSociais.length > 0 ? (
                                                                <a
                                                                    href={cliente.redesSociais[0]?.url || "#"}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`btn btn-social ${cliente.redesSociais[0]?.nome.toLowerCase()} btn-sm`}
                                                                >
                                                                    {cliente.redesSociais[0]?.nome || "Sem redes sociais"}
                                                                </a>
                                                            ) : "Sem redes sociais"}
                                                        </p>
                                                    )}
                                                </td>


                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Ações">
                                                        <Link to={`/edit/${cliente.id}`} className="btn btn-warning btn-sm ml-2">
                                                            Editar
                                                        </Link>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteCliente(cliente.id);
                                                            }}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                            <ReactPaginate
                                previousLabel={"Anterior"}
                                nextLabel={"Próximo"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                nextClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </Container >
    );
}

export default ClienteList;
