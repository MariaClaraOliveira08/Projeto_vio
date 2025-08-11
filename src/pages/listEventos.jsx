import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalCriarIngresso from "../components/ModalCriarIngresso";
import { useNavigate } from "react-router-dom";

function ListEventos() {
  const [eventos, setEventos] = useState([]);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

  const navigate = useNavigate();

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  async function getEventos() {
    try {
      const response = await api.getEvento();
      console.log(response.data.events);
      setEventos(response.data.events);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  }

  async function deleteEvento(id) {
    try {
      await api.deleteEvento(id);
      await getEventos();
      showAlert("success", "Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  }

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getEventos();
  }, []);

  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (event) => {
    setEventoSelecionado(event);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado(null);
  };

  const listEventsRows = eventos.map((event) => (
    <TableRow key={event.id_evento}>
      <TableCell align="center">{event.nome}</TableCell>
      <TableCell align="center">{event.descricao}</TableCell>
      <TableCell align="center">{event.data_hora}</TableCell>
      <TableCell align="center">{event.local}</TableCell>
      <TableCell align="center">{event.fk_id_organizador}</TableCell>
      <TableCell align="center">
        <img
          src={`http://localhost:5000/api/v1/evento/imagem/${event.id_evento}`}
          alt="Imagem do evento"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteEvento(event.id_evento)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Button variant="outlined" onClick={() => abrirModalIngresso(event)}>
          Adicionar
        </Button>
      </TableCell>
    </TableRow>
  ));

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

      <ModalCriarIngresso
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />

      {eventos.length === 0 ? (
        <h1>Carregando eventos...</h1>
      ) : (
        <div>
          <h2>Lista de eventos</h2>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#c22d86", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Id organizador</TableCell>
                  <TableCell align="center">Imagem</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                  <TableCell align="center">Criar ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEventsRows}</TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            onClick={logout}
            sx={{ backgroundColor: "#c22d86" }}
          >
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListEventos;
