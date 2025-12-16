// src/pages/SummonerPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Alert } from 'antd';
import HeaderCard from '../components/HeaderCard';
import LeagueCard from '../components/LeagueCard';
import MasteryCard from '../components/MasteryCard';
import RecentMatches from '../components/RecentMatches';
import SummonerSearchBar from '../components/SummonerSearchBar';

export default function SummonerPage() {
  const { region, gameName, tagLine } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `http://localhost:8080/summoner/${region}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;

    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            setError('No se encontró la cuenta. Comprueba el nombre y el tag.');
          } else {
            setError('Error al cargar los datos del servidor.');
          }
        } else if (err.request) {
          setError('No se pudo conectar con el servidor.');
        } else {
          setError('Ocurrió un error inesperado.');
        }
      })
      .finally(() => setLoading(false));
  }, [region, gameName, tagLine]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Spin size="large" tip="Cargando..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto' }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
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

  return (
    <div style={{ minHeight: '100vh', padding: '32px 0', background: '#f0f2f5' }}>
      <SummonerSearchBar defaultRegion={region} />
      <HeaderCard
        profileIconId={profileIconId}
        region={region}
        name={name}
        tag={tag}
        summonerLevel={summonerLevel}
      />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 320, maxWidth: 400 }}>
            <LeagueCard leagueEntries={leagueEntries} />
          </div>
          <div style={{ flex: 2, minWidth: 320 }}>
            <MasteryCard championMasteries={championMasteries} />
          </div>
        </div>
        <RecentMatches recentMatches={recentMatches} name={name} tag={tag} />
      </div>
    </div>
  );
}
