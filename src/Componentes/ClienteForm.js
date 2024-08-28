import React, { useState, useEffect } from 'react';
import ClienteService from '../Servicos/ClienteService';
import { useParams, useNavigate } from 'react-router-dom';

function ClienteForm() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefones, setTelefones] = useState([{ numero: '', tipo: '' }]);
    const [emails, setEmails] = useState([{ endereco: '' }]);
    const [tiposTelefone, setTiposTelefone] = useState([]);
    const [redesSociais, setRedesSociais] = useState([{ nome: '', url: '', tipo: 'OUTRO' }]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            ClienteService.getClienteById(id).then((response) => {
                const cliente = response.data;
                setNome(cliente.nome);
                setEndereco(cliente.endereco);
                setTelefones(cliente.telefones || [{ numero: '', tipo: '' }]);
                setEmails(cliente.emails || [{ endereco: '' }]);
                setRedesSociais(cliente.redesSociais || [{ nome: '', url: '', tipo: 'OUTRO' }]);
            }).catch(error => console.error('Erro ao buscar cliente:', error));
        }

        ClienteService.getTiposTelefone().then((response) => {
            setTiposTelefone(response.data);
        }).catch(error => console.error('Erro ao buscar tipos de telefone:', error));
    }, [id]);

    const handleTelefoneChange = (index, event) => {
        const newTelefones = [...telefones];
        newTelefones[index] = { ...newTelefones[index], [event.target.name]: event.target.value };
        setTelefones(newTelefones);
    };

    const handleEmailChange = (index, event) => {
        const newEmails = [...emails];
        newEmails[index] = { ...newEmails[index], endereco: event.target.value };
        setEmails(newEmails);
    };

    const handleRedeSocialChange = (index, event) => {
        const newRedesSociais = [...redesSociais];
        newRedesSociais[index] = { ...newRedesSociais[index], [event.target.name]: event.target.value };
        setRedesSociais(newRedesSociais);
    };

    const addTelefone = () => {
        setTelefones([...telefones, { numero: '', tipo: '' }]);
    };

    const addEmail = () => {
        setEmails([...emails, { endereco: '' }]);
    };

    const addRedeSocial = () => {
        setRedesSociais([...redesSociais, { nome: '', url: '', tipo: 'OUTRO' }]);
    };

    const removeTelefone = (index) => {
        const newTelefones = telefones.filter((_, i) => i !== index);
        setTelefones(newTelefones);
    };

    const removeEmail = (index) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };

    const removeRedeSocial = (index) => {
        const newRedesSociais = redesSociais.filter((_, i) => i !== index);
        setRedesSociais(newRedesSociais);
    };

    const saveOrUpdateCliente = (e) => {
        e.preventDefault();
        const cliente = { nome, endereco, telefones, emails, redesSociais };

        if (id) {
            ClienteService.updateCliente(id, cliente).then(() => {
                navigate('/clientes');
            }).catch(error => console.error('Erro ao atualizar cliente:', error));
        } else {
            ClienteService.createCliente(cliente).then(() => {
                navigate('/clientes');
            }).catch(error => console.error('Erro ao criar cliente:', error));
        }
    };

    return (
        <div className='container mt-4' style={{ paddingBottom: '80px' }}>
            <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <form onSubmit={saveOrUpdateCliente}>
                <div className="mb-3">
                    <label className="form-label">Nome:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefones:</label>
                    {telefones.map((telefone, index) => (
                        <div key={index}>
                            <div className="input-group mb-2" key={index}>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="numero"
                                    value={telefone.numero || ''}
                                    onChange={(e) => handleTelefoneChange(index, e)}
                                    placeholder="Número"
                                />
                                <button type="button" className="btn btn-danger" onClick={() => removeTelefone(index)}>Remover</button>
                            </div>

                            <select
                                className="form-select mt-2"
                                name="tipo"
                                value={telefone.tipo || ''}
                                onChange={(e) => handleTelefoneChange(index, e)}
                            >
                                <option value="">Selecione um tipo</option>
                                {tiposTelefone.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary mt-2" onClick={addTelefone}>Adicionar Telefone</button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Emails:</label>
                    {emails.map((email, index) => (
                        <div className="input-group mb-2" key={index}>
                            <input
                                type="email"
                                className="form-control"
                                value={email.endereco || ''}
                                onChange={(e) => handleEmailChange(index, e)}
                                placeholder="Email"
                            />
                            <button type="button" className="btn btn-danger" onClick={() => removeEmail(index)}>Remover</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addEmail}>Adicionar Email</button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Redes Sociais:</label>
                    {redesSociais.map((redeSocial, index) => (
                        <div key={index} className="mb-2">
                            <select
                                className="form-select"
                                name="tipo"
                                value={redeSocial.tipo || ''}
                                onChange={(e) => handleRedeSocialChange(index, e)}
                            >
                                <option value="FACEBOOK">Facebook</option>
                                <option value="TWITTER">Twitter</option>
                                <option value="LINKEDIN">LinkedIn</option>
                                <option value="INSTAGRAM">Instagram</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                            <div className="input-group mb-2" key={index}>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    name="url"
                                    value={redeSocial.url || ''}
                                    onChange={(e) => handleRedeSocialChange(index, e)}
                                    placeholder="URL"
                                />
                                <button type="button" className="btn btn-danger mt-2" onClick={() => removeRedeSocial(index)}>Remover</button>
                            </div>

                        </div>
                    ))}
                    <button type="button" className="btn btn-primary mt-2" onClick={addRedeSocial}>Adicionar Rede Social</button>
                </div>

                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        </div>
    );
}

export default ClienteForm;
