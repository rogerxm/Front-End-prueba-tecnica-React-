import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserById } from "../services/userService";
import type { User } from "../types/user";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserDetail = () => {
  // Obtiene el ID de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getUserById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          `No se pudo cargar el detalle del usuario con ID: ${id}, ${err}`
        );
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h5" color="error" align="center">
        {error}
      </Typography>
    );

  if (!user)
    return (
      <Typography variant="h5" align="center">
        Usuario no encontrado
      </Typography>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Volver al listado
      </Button>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          {user.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Username: @{user.username}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Contacto Personal
            </Typography>
            <Box
              sx={{
                pl: 1,
                borderLeft: "3px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Teléfono:</strong> {user.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Web:</strong>{" "}
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography variant="h6" gutterBottom>
              Información de Empresa
            </Typography>
            <Box
              sx={{
                pl: 1,
                borderLeft: "3px solid",
                borderColor: "secondary.main",
              }}
            >
              <Typography variant="body1">
                <strong>Compañía:</strong> {user.company.name}
              </Typography>
              <Typography variant="body2" fontStyle="italic">
                "Catchphrase": {user.company.catchPhrase}
              </Typography>
              <Typography variant="body2">Sector: {user.company.bs}</Typography>
            </Box>
          </Grid>

          <Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Dirección
            </Typography>
            <Typography variant="body1">
              {user.address.street}, {user.address.suite}
            </Typography>
            <Typography variant="body1">
              {user.address.city}, {user.address.zipcode}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDetail;
