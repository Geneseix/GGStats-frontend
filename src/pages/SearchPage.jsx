// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

export default function SearchPage() {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine]   = useState('');
  const [region, setRegion]     = useState('EUW1');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!gameName.trim() || !tagLine.trim()) return;
    navigate(`/summoner/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?region=${region}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 6,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={3}>
        <Typography variant="h5" mb={3} align="center">
          Busca tu Invocador
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Nombre de Invocador"
            value={gameName}
            onChange={e => setGameName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Tagline"
            value={tagLine}
            onChange={e => setTagLine(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="region-label">Región</InputLabel>
            <Select
              labelId="region-label"
              value={region}
              label="Región"
              onChange={e => setRegion(e.target.value)}
            >
              <MenuItem value="EUW1">EUW (Europa Oeste)</MenuItem>
              <MenuItem value="EUN1">EUNE (Europa Nórdica y Este)</MenuItem>
              <MenuItem value="NA1">NA (Norteamérica)</MenuItem>
              <MenuItem value="KR">KR (Corea)</MenuItem>
              <MenuItem value="BR1">BR (Brasil)</MenuItem>
              <MenuItem value="JP1">JP (Japón)</MenuItem>
              <MenuItem value="LA1">LAN (Latinoamérica Norte)</MenuItem>
              <MenuItem value="LA2">LAS (Latinoamérica Sur)</MenuItem>
              <MenuItem value="OC1">OCE (Oceanía)</MenuItem>
              <MenuItem value="RU">RU (Rusia)</MenuItem>
              <MenuItem value="TR1">TR (Turquía)</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 1 }}
          >
            Buscar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
