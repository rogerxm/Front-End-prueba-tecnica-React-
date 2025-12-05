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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error" align="center" component="div">
          ⚠️ {error}
        </Typography>
      </Container>
    );

  if (!user)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" component="div">
          Usuario no encontrado
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        variant="text"
        sx={{ mb: 3 }}
      >
        Volver al listado
      </Button>

      <Paper elevation={8} sx={{ p: { xs: 2, sm: 3, md: 5 }, borderRadius: 2 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            {user.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mt: 0.5 }}>
            @{user.username}
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Contenido en Grid responsivo */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Contacto Personal */}
          <Grid>
            <Typography
              variant="h5"
              gutterBottom
              color="text.primary"
              sx={{ borderBottom: "2px solid", borderColor: "divider", pb: 1 }}
            >
              📞 Contacto Personal
            </Typography>
            <Box
              sx={{
                pl: 2,
                mt: 2,
                borderLeft: "4px solid",
                borderColor: "primary.light",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Teléfono:</strong> {user.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Web:</strong>{" "}
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {user.website}
                </a>
              </Typography>
            </Box>
          </Grid>

          {/* Información de Empresa */}
          <Grid>
            <Typography
              variant="h5"
              gutterBottom
              color="text.primary"
              sx={{ borderBottom: "2px solid", borderColor: "divider", pb: 1 }}
            >
              🏢 Información de Empresa
            </Typography>
            <Box
              sx={{
                pl: 2,
                mt: 2,
                borderLeft: "4px solid",
                borderColor: "secondary.light",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Compañía:</strong> {user.company.name}
              </Typography>
              <Typography
                variant="subtitle1"
                fontStyle="italic"
                sx={{ my: 1, color: "text.secondary" }}
              >
                "Catchphrase": {user.company.catchPhrase}
              </Typography>
              <Typography variant="body2">
                Sector: **{user.company.bs}**
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Dirección */}
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid>
            <Typography
              variant="h5"
              gutterBottom
              color="text.primary"
              sx={{ borderBottom: "2px solid", borderColor: "divider", pb: 1 }}
            >
              📍 Dirección
            </Typography>
            <Box sx={{ mt: 2, pl: 1 }}>
              <Typography variant="body1">
                {user.address.street}, {user.address.suite}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.address.city}, {user.address.zipcode}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                (Geo: {user.address.geo.lat}, {user.address.geo.lng})
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDetail;
