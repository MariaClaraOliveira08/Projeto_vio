import { useState } from "react";
import sheets from "../axios/axios"; 
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_organizador: 1, 
  });
  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.descricao || !form.data_hora || !form.local) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Criar FormData para envio de arquivo + dados
      const data = new FormData();
      data.append("nome", form.nome);
      data.append("descricao", form.descricao);
      data.append("data_hora", form.data_hora);
      data.append("local", form.local);
      data.append("fk_id_organizador", form.fk_id_organizador);
      if (imagem) data.append("imagem", imagem);

      await sheets.createEvento(data); // ajustar sua função axios para aceitar FormData
      alert("Evento criado com sucesso!");

      // Limpar formulário
      setForm({
        nome: "",
        descricao: "",
        data_hora: "",
        local: "",
        fk_id_organizador: 1,
      });
      setImagem(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar evento: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <TextField
          fullWidth
          name="nome"
          label="Nome"
          value={form.nome}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="descricao"
          label="Descrição"
          value={form.descricao}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="data_hora"
          label="Data e hora"
          type="datetime-local"
          value={form.data_hora}
          onChange={handleChange}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          name="local"
          label="Local"
          value={form.local}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mb: 2 }}>
          Criar Evento
        </Button>
      </form>
      <Link to="/eventos">Listar Eventos</Link>
    </div>
  );
}

export default CreateEvent;
