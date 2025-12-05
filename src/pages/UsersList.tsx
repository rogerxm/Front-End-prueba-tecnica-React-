import { useState, useEffect, useMemo, useCallback } from "react";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";
import { Link } from "react-router";

import {
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Box,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";

// Funcion para sanitizar
const sanitizeInput = (input: string): string => {
  // Elimina caracteres HTML para prevenir inyección de código
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const USERS_PER_PAGE = 5;

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Error al cargar los usuarios.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const filteredUsers = useMemo(() => {
    // Sanitiza y convierte el término de búsqueda a minúsculas
    const safeSearchTerm = sanitizeInput(searchTerm.toLowerCase());

    // Filtra por nombre
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(safeSearchTerm)
    );

    // Reinicia la paginación al filtrar
    setCurrentPage(1);
    return filtered;
  }, [users, searchTerm]);

  // Logica para la paginacion
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Funcion  para generar los numero de página
  const renderPaginationButtons = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(
        <Button
          key={page}
          variant={currentPage === page ? "contained" : "outlined"}
          onClick={() => handlePageChange(page)}
          sx={{ minWidth: 40 }}
        >
          {page}
        </Button>
      );
    }
    return pageNumbers;
  };

  if (loading)
    return <Typography variant="h5">Cargando usuarios...</Typography>;

  if (error)
    return (
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    );

  return (
    <>
      <Typography variant="h4">Listado de Usuarios</Typography>

      <TextField
        label="Buscar por Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {paginatedUsers.map((user) => (
          <Grid key={user.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" color="primary">
                  {user.name}
                </Typography>
                <Typography color="text.secondary">@{user.username}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Email: {user.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/users/${user.id}`}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Control de Paginacion */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          {renderPaginationButtons()}
        </Box>
      )}

      {filteredUsers.length === 0 && !loading && (
        <Typography variant="subtitle1" sx={{ mt: 3, textAlign: "center" }}>
          No se encontraron usuarios
        </Typography>
      )}
    </>
  );
};

export default UsersList;
