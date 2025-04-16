import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios"; // API corrigida
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

function listEvento() {
  const [evento, setEvento] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: ""
  });

  // Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  // Fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  // Função para buscar eventos
  async function getEvento() {
    try {
      const response = await api.get('/events');
      console.log(response.data.events);
      setEvento(response.data.events);
    } catch (error) {
      console.log("Erro ", error);
    }
  }

  // Função para excluir evento
  async function deleteEvento(id) {
    try {
      await api.delete(`/events/${id}`);
      await getEvento(); // Atualiza a lista após exclusão
      showAlert("success", "Evento excluído com sucesso!");
    } catch (error) {
      console.log("Erro ao deletar evento...", error);
      showAlert("error", error.response?.data?.error || "Erro ao excluir evento");
    }
  }

  // Mapeamento dos eventos para exibição na tabela
  const listEventos = evento.map((evento) => {
    return (
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteEvento(evento.id_evento)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  // Função para logout (remover item de autenticação)
  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/"); // Redireciona para a página inicial
  }

  // Chama a função getEvento quando o componente for montado
  useEffect(() => {
    getEvento();
  }, []);

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {evento.length === 0 ? (
        <h1>Carregando eventos...</h1>
      ) : (
        <div>
          <h5>Lista de eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#c4006f", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvento}</TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            onClick={logout}
            sx={{ backgroundColor: "#c4006f" }}
          >
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default listEvento;
