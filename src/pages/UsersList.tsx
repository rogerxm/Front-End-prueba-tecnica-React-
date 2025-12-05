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
  Box,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { EmailOutlined, AccountCircleOutlined } from "@mui/icons-material";

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
        setError(`Error al cargar los usuarios: ${err}`);
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

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Button key={0} variant="text" disabled sx={{ minWidth: 40 }}>
          ...
        </Button>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <Button
          key={page}
          variant={currentPage === page ? "contained" : "outlined"}
          color="primary"
          onClick={() => handlePageChange(page)}
          sx={{ minWidth: 40, mx: 0.5 }}
        >
          {page}
        </Button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <Button
          key={totalPages + 1}
          variant="text"
          disabled
          sx={{ minWidth: 40 }}
        >
          ...
        </Button>
      );
    }
    return pageNumbers;
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h5" sx={{ ml: 2 }}>
          Cargando usuarios...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" color="error" align="center">
          ⚠️ {error}
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, mb: 3 }}
      >
        👥 Listado de Usuarios
      </Typography>

      {/* Campo de busqueda */}
      <TextField
        label="Buscar usuario por Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Grid de Usuarios */}
      <Grid container spacing={4}>
        {paginatedUsers.map((user) => (
          <Grid key={user.id}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-5px)",
                },
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <AccountCircleOutlined
                    color="primary"
                    sx={{ mr: 1, fontSize: 28 }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {user.name}
                  </Typography>
                </Box>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ mb: 1, ml: 1 }}
                >
                  @{user.username}
                </Typography>

                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                  <EmailOutlined color="action" sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {user.email}
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    size="medium"
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 5 }}>
          {renderPaginationButtons()}
        </Box>
      )}

      {/* Mensaje de No Resultados */}
      {filteredUsers.length === 0 && !loading && (
        <Box
          sx={{
            mt: 5,
            textAlign: "center",
            p: 3,
            border: "1px dashed grey",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            😔 No se encontraron usuarios con el nombre "{searchTerm}".
          </Typography>
          <Typography variant="body2" color="text.hint" sx={{ mt: 1 }}>
            Intenta con otro término de búsqueda.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default UsersList;
