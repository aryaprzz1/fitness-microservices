
import { Box, Button, Chip, Container, Paper, Stack, Typography } from "@mui/material"
import { useCallback, useContext, useEffect } from "react"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router"
import { logout, setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import "./App.css";

const ActivitiesPage = () => {
  return (
    <Stack spacing={3}>
      <ActivityForm onActivityAdded = { () => window.location.reload()}/>
      <ActivityList />
    </Stack>
  );
}

function App() {
  
  const { token, tokenData, logIn, logOut } 
      = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
    }
  }, [token, tokenData, dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    logOut();
  }, [dispatch, logOut]);

  return (
    <Router>
      {!token ? (
        <Container maxWidth="lg" className="landing-shell" sx={{ py: { xs: 8, md: 12 } }}>
          <Stack spacing={3.5} className="landing-stack">
            <Paper className="hero-card" elevation={0}>
              <Box className="hero-layout">
                <Stack spacing={3}>
                  <Chip label="Fitness MicroServices" className="hero-chip" />
                  <Typography variant="h3" className="hero-title gradient-title">
                    Train smarter with AI-guided activity tracking
                  </Typography>
                  <Typography variant="body1" className="hero-subtitle">
                    Log workouts, monitor progress, and get actionable recommendations powered by your Keycloak-secured account.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} className="hero-actions">
                    <Button size="large" variant="contained" className="btn-primary" onClick={() => {logIn();}}>
                      LOGIN
                    </Button>
                    <Button
                      size="large"
                      variant="outlined"
                      className="btn-secondary"
                      href="#infra-section"
                    >
                      View Architecture
                    </Button>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} className="metric-pills">
                    <Chip label="Secure Keycloak Login" className="stat-chip stat-chip-primary" />
                    <Chip label="AI Recommendations" className="stat-chip stat-chip-violet" />
                    <Chip label="Realtime Service Flow" className="stat-chip stat-chip-gold" />
                  </Stack>
                  <Paper elevation={0} className="demo-credentials" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className="section-subtitle">
                      Recruiter demo credentials
                    </Typography>
                    <Typography variant="body2">
                      Username: <strong>user1</strong>
                    </Typography>
                    <Typography variant="body2">
                      Password: <strong>user1</strong>
                    </Typography>
                  </Paper>
                </Stack>

                <Paper elevation={0} className="hero-preview panel-card">
                  <Stack spacing={2}>
                    <Typography variant="overline" className="preview-tagline">
                      Why this stack
                    </Typography>
                    <Typography variant="h6" className="section-title">
                      Production-style microservices workflow
                    </Typography>
                    <Stack spacing={1} className="preview-list">
                      <Typography variant="body2">Gateway routes secure API calls</Typography>
                      <Typography variant="body2">Kafka streams activity events asynchronously</Typography>
                      <Typography variant="body2">Gemini-powered AI returns actionable feedback</Typography>
                      <Typography variant="body2">Eureka + Config keep services resilient</Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            </Paper>

            <Box className="highlight-grid">
              <Paper className="panel-card highlight-card highlight-card-blue" elevation={0}>
                <Typography variant="h6" className="section-title">Track Better</Typography>
                <Typography variant="body2" className="section-subtitle">
                  Log activity duration and calories with a clean dashboard experience.
                </Typography>
              </Paper>
              <Paper className="panel-card highlight-card highlight-card-green" elevation={0}>
                <Typography variant="h6" className="section-title">Analyze Faster</Typography>
                <Typography variant="body2" className="section-subtitle">
                  Get automatic analysis, suggestions, and safety guidance for each session.
                </Typography>
              </Paper>
              <Paper className="panel-card highlight-card highlight-card-violet" elevation={0}>
                <Typography variant="h6" className="section-title">Scale Confidently</Typography>
                <Typography variant="body2" className="section-subtitle">
                  Built on gateway, service discovery, config server, and async messaging.
                </Typography>
              </Paper>
            </Box>

            <Paper id="infra-section" className="panel-card infra-card" elevation={0}>
              <Stack spacing={2.5}>
                <Typography variant="h5" className="section-title gradient-title">
                  Backend Infrastructure
                </Typography>
                <Typography variant="body2" className="section-subtitle">
                  Service flow in this project
                </Typography>
                <Box
                  component="img"
                  src="/backend-infrastructure.jpg"
                  alt="Backend infrastructure architecture diagram"
                  className="infra-image"
                />
                <Stack spacing={1.5} className="infra-flow">
                  <Typography variant="body2">React Frontend</Typography>
                  <Typography variant="body2">Keycloak (Authentication)</Typography>
                  <Typography variant="body2">API Gateway</Typography>
                  <Typography variant="body2" className="infra-services-title">Core Services</Typography>
                  <Typography variant="body2">User Service (Postgres)</Typography>
                  <Typography variant="body2">Activity Service (MongoDB)</Typography>
                  <Typography variant="body2">AI Service (Gemini API)</Typography>
                  <Typography variant="body2">Kafka (Async Communication)</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      ) : (
        <Box className="dashboard-wrap" sx={{ py: { xs: 3, md: 5 } }}>
          <Container maxWidth="lg">
            <Paper elevation={0} className="app-shell">
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography variant="overline" className="brand-tagline">
                    Dashboard
                  </Typography>
                  <Typography variant="h4" className="brand-title">
                    Activity Command Center
                  </Typography>
                </Box>
                <Button variant="contained" className="btn-primary" onClick={handleLogout} >
                  LOGOUT
                </Button>
              </Stack>
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />}/>
                <Route path="/activities/:id" element={<ActivityDetail />}/>
                <Route path="/" element={token ? <Navigate to="/activities" replace/> :
                                      <div>Welcome! Please login</div>}/>
              </Routes>
            </Paper>
          </Container>
        </Box>
      )}
    </Router>
  )
}

export default App
