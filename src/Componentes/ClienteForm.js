import React, { useState, useEffect } from 'react';
import ClienteService from '../Servicos/ClienteService';
import { useParams, useNavigate } from 'react-router-dom';

function ClienteForm() {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefones, setTelefones] = useState([{ numero: '', tipo: '' }]);
    const [emails, setEmails] = useState([{ endereco: '' }]);
    const [tiposTelefone, setTiposTelefone] = useState([]);
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

    const addTelefone = () => {
        setTelefones([...telefones, { numero: '', tipo: '' }]);
    };

    const addEmail = () => {
        setEmails([...emails, { endereco: '' }]);
    };

    const removeTelefone = (index) => {
        const newTelefones = telefones.filter((_, i) => i !== index);
        setTelefones(newTelefones);
    };

    const removeEmail = (index) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };

    const saveOrUpdateCliente = (e) => {
        e.preventDefault();
        const cliente = { nome, endereco, telefones, emails };

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
        <div>
            <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
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
                <div>
                    <label>Telefones:</label>
                    {telefones.map((telefone, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="numero"
                                value={telefone.numero || ''}
                                onChange={(e) => handleTelefoneChange(index, e)}
                                placeholder="Número"
                            />
                            <select
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
                            <button type="button" onClick={() => removeTelefone(index)}>Remover</button>
                        </div>
                    ))}
                    <button type="button" onClick={addTelefone}>Adicionar Telefone</button>
                </div>
                <div>
                    <label>Emails:</label>
                    {emails.map((email, index) => (
                        <div key={index}>
                            <input
                                type="email"
                                value={email.endereco || ''}
                                onChange={(e) => handleEmailChange(index, e)}
                                placeholder="Email"
                            />
                            <button type="button" onClick={() => removeEmail(index)}>Remover</button>
                        </div>
                    ))}
                    <button type="button" onClick={addEmail}>Adicionar Email</button>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default ClienteForm;
