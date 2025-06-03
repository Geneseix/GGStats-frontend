// src/pages/SummonerPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Stack,
  Button,
  Chip,
  Paper,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function SummonerPage() {
  const { gameName, tagLine } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get('region') || 'EUW1';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMasteries, setShowAllMasteries] = useState(false);
  const [expandedMatchIds, setExpandedMatchIds] = useState({});

  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:8080/summoner/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    axios
      .get(url)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [gameName, tagLine, region]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#181c24">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="error" variant="filled">
          Error al cargar los datos.
        </Alert>
      </Container>
    );
  }

  if (!data) return null;

  const {
    accountDTO: { gameName: name, tagLine: tag },
    profileIconId,
    summonerLevel,
    leagueEntries,
    championMasteries,
    recentMatches,
  } = data;

  const toggleMatch = matchId => {
    setExpandedMatchIds(prev => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };

  return (
    <Box bgcolor="#181c24" minHeight="100vh" py={6}>
      <Container maxWidth="lg">
        {/* Cabecera */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#232946',
            borderRadius: 4,
            mb: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <Avatar
            src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`}
            alt="Icono de invocador"
            sx={{ width: 80, height: 80, border: '4px solid #3182f6', mr: 4 }}
          />
          <Box flex={1}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography variant="h4" fontWeight="bold" color="#fff">
                {name}
              </Typography>
              <Typography variant="h5" color="#90caf9" fontWeight="bold">
                #{tag}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip label={`Nivel ${summonerLevel}`} color="primary" sx={{ fontWeight: 'bold', bgcolor: '#3182f6', color: '#fff', fontSize: 16 }} />
              <Chip label={region} sx={{ bgcolor: '#232a38', color: '#fff', fontWeight: 'bold', fontSize: 16 }} />
            </Stack>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Liga */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 4,
                bgcolor: '#232a38',
                color: '#fff',
                p: 3,
                mb: 2,
                minHeight: 220,
              }}
            >
              <Typography variant="h6" color="#90caf9" fontWeight="bold" mb={2}>
                Liga
              </Typography>
              <Stack spacing={2}>
                {leagueEntries.length > 0 ? (
                  leagueEntries.map(entry => (
                    <Box
                      key={entry.queueType}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#263043',
                        border: '1px solid #3a4756',
                        borderRadius: 3,
                        p: 2,
                      }}
                    >
                      <Avatar
                        src={`/emblems/${entry.tier.toLowerCase()}.png`}
                        alt={entry.tier}
                        sx={{ width: 40, height: 40, border: '2px solid #3182f6', mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" color="#90caf9" fontWeight="bold">
                          {entry.queueType.replace('_', ' ')}
                        </Typography>
                        <Typography variant="body1" color="#fff">
                          {entry.tier} {entry.rank} • {entry.leaguePoints} LP
                        </Typography>
                        <Typography variant="body2" color="#b0bec5">
                          {entry.wins}V / {entry.losses}D
                          {entry.hotStreak && (
                            <Typography component="span" color="#43a047" fontWeight="bold" ml={1}>
                              • ¡Racha!
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Alert severity="info" sx={{ bgcolor: '#263043', color: '#90caf9' }}>
                    Sin datos de liga.
                  </Alert>
                )}
              </Stack>
            </Paper>
          </Grid>

          {/* Maestrías */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 4,
                bgcolor: '#232a38',
                color: '#fff',
                p: 3,
                mb: 2,
                minHeight: 220,
              }}
            >
              <Typography variant="h6" color="#90caf9" fontWeight="bold" mb={2}>
                Maestrías
              </Typography>
              <Grid container spacing={2}>
                {(showAllMasteries ? championMasteries : championMasteries.slice(0, 4)).map(mastery => (
                  <Grid key={mastery.championId} item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: '#263043',
                        border: '1px solid #3a4756',
                        borderRadius: 3,
                        color: '#fff',
                        height: '100%',
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      elevation={0}
                    >
                      <Avatar
                        variant="square"
                        src={mastery.championIconUrl}
                        alt={mastery.championName}
                        sx={{ width: 36, height: 36, border: '2px solid #3182f6', mb: 1 }}
                      />
                      <Typography variant="subtitle2" color="#90caf9" fontWeight="bold" align="center">
                        {mastery.championName}
                      </Typography>
                      <Typography variant="caption" color="#fff" align="center">
                        Nivel {mastery.championLevel}
                      </Typography>
                      <Typography variant="caption" color="#b0bec5" display="block" align="center">
                        {mastery.championPoints} pts
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {championMasteries.length > 4 && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => setShowAllMasteries(v => !v)}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      fontWeight: 'bold',
                      borderColor: '#3182f6',
                      color: '#3182f6',
                      px: 3,
                      '&:hover': { bgcolor: '#3182f6', color: '#fff' },
                    }}
                    endIcon={showAllMasteries ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {showAllMasteries ? 'Menos' : 'Más'}
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Partidas recientes */}
        <Box mt={4}>
          <Typography variant="h6" color="#90caf9" fontWeight="bold" mb={2}>
            Partidas recientes
          </Typography>
          <Stack spacing={3}>
            {recentMatches.map(match => {
              const isExpanded = !!expandedMatchIds[match.matchId];
              return (
                <Paper
                  key={match.matchId}
                  sx={{
                    bgcolor: '#232946',
                    borderRadius: 3,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor="#3182f6"
                    color="#fff"
                    px={4}
                    py={2}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => toggleMatch(match.matchId)}
                  >
                    <Box>
                      <Typography fontWeight="bold" fontSize="1.1rem">{match.gameMode}</Typography>
                      <Typography fontSize="0.95rem" color="#e3e3e3">
                        {match.gameDurationFormatted} • {match.gameCreationDate}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      sx={{ color: "#fff" }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={isExpanded}>
                    <Divider sx={{ bgcolor: '#3a4756' }} />
                    <Box p={2} bgcolor="#232a38">
                      <Stack spacing={2}>
                        {/* Equipo azul */}
                        <Box>
                          <Typography fontWeight="bold" color="#90caf9" mb={1}>
                            {match.participants.some(p => p.teamId === 100 && p.win)
                              ? 'Victoria Azul'
                              : 'Derrota Azul'}
                          </Typography>
                          {match.participants
                            .filter(p => p.teamId === 100)
                            .map(p => (
                              <Box key={`blue-${match.matchId}-${p.riotIdGameName}`} display="flex" alignItems="center" mb={1}>
                                <Typography width={110} color="#fff">
                                  {`${p.riotIdGameName}#${p.riotIdTagline}`}
                                </Typography>
                                <Avatar
                                  src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${p.championName}.png`}
                                  sx={{ width: 22, height: 22, mr: 1, bgcolor: "#232946" }}
                                />
                                <Typography color="#fff">{p.championName}</Typography>
                                <Typography width={60} color="#b0bec5">
                                  {`${p.kills}/${p.deaths}/${p.assists}`}
                                </Typography>
                                <Typography width={60} color="#b0bec5">{p.teamPosition}</Typography>
                              </Box>
                            ))}
                        </Box>
                        <Divider sx={{ bgcolor: '#3a4756' }} />
                        {/* Equipo rojo */}
                        <Box>
                          <Typography fontWeight="bold" color="#ff7675" mt={1} mb={1}>
                            {match.participants.some(p => p.teamId === 200 && p.win)
                              ? 'Victoria Roja'
                              : 'Derrota Roja'}
                          </Typography>
                          {match.participants
                            .filter(p => p.teamId === 200)
                            .map(p => (
                              <Box key={`red-${match.matchId}-${p.riotIdGameName}`} display="flex" alignItems="center" mb={1}>
                                <Typography width={110} color="#fff">
                                  {`${p.riotIdGameName}#${p.riotIdTagline}`}
                                </Typography>
                                <Avatar
                                  src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${p.championName}.png`}
                                  sx={{ width: 22, height: 22, mr: 1, bgcolor: "#232946" }}
                                />
                                <Typography color="#fff">{p.championName}</Typography>
                                <Typography width={60} color="#b0bec5">
                                  {`${p.kills}/${p.deaths}/${p.assists}`}
                                </Typography>
                                <Typography width={60} color="#b0bec5">{p.teamPosition}</Typography>
                              </Box>
                            ))}
                        </Box>
                      </Stack>
                    </Box>
                  </Collapse>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
