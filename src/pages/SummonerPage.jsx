// src/pages/SummonerPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Typography,
  Spin,
  Alert,
  Row,
  Col,
  Card,
  Space,
  Button,
  Tag,
  Divider,
  Collapse,
  Progress,
  Badge,
} from 'antd';
import { StarFilled, UserOutlined, TrophyFilled } from '@ant-design/icons';
import { getQueueType } from '../utils/queueTypeMap';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function SummonerPage() {
  const { gameName, tagLine } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const region = searchParams.get('region') || 'EUW1';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMasteries, setShowAllMasteries] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:8080/summoner/${region}/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`;
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [gameName, tagLine, region]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f0f2f5',
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
          description="Error al cargar los datos."
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

  const handleCollapseChange = (keys) => {
    setExpandedKeys(keys);
  };

  // Definimos aquí la plantilla de columnas fija para el grid:
  const gridTemplate = `
    170px /* Invocador */
    100px /* Campeón  */
    90px  /* Rango     */
    80px  /* KDA       */
    60px  /* CS        */
    100px /* Daño      */
    160px /* Objetos   */
`; // Quitado Rol

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '32px 0' }}>
      {/* Hero Header */}
      <Card
        style={{
          maxWidth: 900,
          margin: '0 auto 32px auto',
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.12)',
          background: 'linear-gradient(90deg, #3182f6 0%, #6dd5ed 100%)',
          padding: 0,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row align="middle" style={{ padding: 32 }}>
          <Col xs={24} md={6} style={{ textAlign: 'center' }}>
            <Badge
              count={
                <StarFilled
                  style={{
                    color: '#faad14',
                    fontSize: 28,
                    background: '#fff',
                    borderRadius: '50%',
                    padding: 4,
                  }}
                />
              }
              offset={[-10, 80]}
            >
              <Avatar
                size={100}
                src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/profileicon/${profileIconId}.png`}
                style={{ border: '4px solid #fff', boxShadow: '0 2px 8px #3182f6' }}
                icon={<UserOutlined />}
              />
            </Badge>
            <div style={{ marginTop: 16 }}>
              <Tag color="geekblue" style={{ fontWeight: 'bold', fontSize: 16 }}>
                {region}
              </Tag>
            </div>
          </Col>
          <Col xs={24} md={18}>
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              <Title level={2} style={{ color: '#fff', marginBottom: 0 }}>
                {name}{' '}
                <span style={{ fontWeight: 400, color: '#e3e3e3' }}>#{tag}</span>
              </Title>
              <Text style={{ color: '#e3e3e3', fontSize: 18 }}>
                Invocador destacado de la región {region}
              </Text>
              <div style={{ marginTop: 16 }}>
                <Progress
                  percent={Math.min((summonerLevel / 500) * 100, 100)}
                  showInfo={false}
                  strokeColor="#faad14"
                  trailColor="#e3e3e3"
                  style={{ width: 200, marginRight: 16 }}
                />
                <Tag color="gold" style={{ fontWeight: 'bold', fontSize: 18 }}>
                  Nivel {summonerLevel}
                </Tag>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Liga */}
        <Col xs={24} md={8}>
          <Card
            title={
              <span>
                <TrophyFilled style={{ color: '#faad14', marginRight: 8 }} />
                Liga
              </span>
            }
            style={{
              borderRadius: 12,
              minHeight: 260,
              background: '#fff',
              boxShadow: '0 2px 12px rgba(31,38,135,0.07)',
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {leagueEntries.length > 0 ? (
                leagueEntries.map((entry) => (
                  <Card
                    key={entry.queueType}
                    size="small"
                    style={{
                      background: '#f6f8fa',
                      border: '1px solid #e3e3e3',
                      borderRadius: 8,
                      marginBottom: 6,
                    }}
                    bodyStyle={{ display: 'flex', alignItems: 'center', padding: 8 }}
                  >
                    <Avatar
                      size={72}
                      src={`/emblems/${entry.tier.toLowerCase()}.png`}
                      style={{ marginRight: 14, background: '#fff' }}
                    />
                    <div>
                      <Text style={{ color: '#3182f6', fontWeight: 'bold', fontSize: 15 }}>
                        {entry.queueType.replace('_', ' ')}
                      </Text>
                      <br />
                      <Text
                        style={{
                          color: '#222',
                          fontSize: 18,
                          fontWeight: 'bold',
                          letterSpacing: 1,
                          textShadow: '0 1px 4px #e3e3e3',
                          lineHeight: 1.1,
                          display: 'block',
                        }}
                      >
                        {entry.tier} {entry.rank}
                      </Text>
                      <Text
                        style={{
                          color: '#888',
                          fontSize: 13,
                          fontWeight: 600,
                          marginBottom: 0,
                          display: 'block',
                        }}
                      >
                        {entry.leaguePoints} LP
                      </Text>
                      <Text style={{ color: '#888', fontSize: 13 }}>
                        {entry.wins}V / {entry.losses}D
                        <span style={{ marginLeft: 8 }}>
                          {((entry.wins + entry.losses) > 0
                            ? Math.round((entry.wins / (entry.wins + entry.losses)) * 100)
                            : 0)}
                          % WR
                        </span>
                        {entry.hotStreak && (
                          <Text
                            style={{
                              color: '#43a047',
                              fontWeight: 'bold',
                              marginLeft: 8,
                              fontSize: 13,
                            }}
                          >
                            ¡Racha!
                          </Text>
                        )}
                      </Text>
                    </div>
                  </Card>
                ))
              ) : (
                <Alert
                  message="Sin datos de liga"
                  type="info"
                  style={{ background: '#f6f8fa', color: '#3182f6', border: 'none' }}
                />
              )}
            </Space>
          </Card>
        </Col>

        {/* Maestrías */}
        <Col xs={24} md={16}>
          <Card
            title={
              <span>
                <StarFilled style={{ color: '#faad14', marginRight: 8 }} />
                Maestría
              </span>
            }
            style={{
              borderRadius: 12,
              minHeight: 260,
              background: '#fff',
              boxShadow: '0 2px 12px rgba(31,38,135,0.07)',
            }}
          >
            <Row gutter={[16, 16]}>
              {(showAllMasteries
                ? championMasteries
                : championMasteries.slice(0, 4)
              ).map((mastery) => (
                <Col key={mastery.championId} xs={12} sm={8} md={8} lg={6}>
                  <Card
                    size="small"
                    hoverable
                    style={{
                      background: '#f6f8fa',
                      border: '1px solid #e3e3e3',
                      borderRadius: 8,
                      textAlign: 'center',
                    }}
                    bodyStyle={{
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      shape="square"
                      size={40}
                      src={mastery.championIconUrl}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={{ color: '#3182f6', fontWeight: 'bold' }} ellipsis>
                      {mastery.championName}
                    </Text>
                    <Text style={{ color: '#222', fontSize: 13 }}>
                      Nivel {mastery.championLevel}
                    </Text>
                    <Text style={{ color: '#888', fontSize: 12 }}>
                      {mastery.championPoints.toLocaleString('es-ES')} pts
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
            {championMasteries.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button
                  type="default"
                  onClick={() => setShowAllMasteries((v) => !v)}
                  style={{
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 'bold',
                    borderColor: '#3182f6',
                    color: '#3182f6',
                  }}
                >
                  {showAllMasteries ? 'Ver menos' : 'Ver más'}
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Partidas recientes */}
      <div style={{ maxWidth: 1200, margin: '32px auto 0 auto' }}>
        <Card
          title={
            <span>
              <UserOutlined style={{ color: '#3182f6', marginRight: 8 }} />
              Partidas recientes
            </span>
          }
          style={{
            borderRadius: 12,
            background: '#fff',
            boxShadow: '0 2px 12px rgba(31,38,135,0.07)',
          }}
        >
          <Collapse
            activeKey={expandedKeys}
            onChange={handleCollapseChange}
            expandIconPosition="right"
            ghost
          >
            {recentMatches.map((match) => {
              const tipo = getQueueType(match.queueId);

              const blueTeam = match.participants.filter((p) => p.teamId === 100);
              const redTeam = match.participants.filter((p) => p.teamId === 200);
              const maxBlueDamage = Math.max(
                ...blueTeam.map((p) => p.totalDamageDealtToChampions || 0)
              );
              const maxRedDamage = Math.max(
                ...redTeam.map((p) => p.totalDamageDealtToChampions || 0)
              );

              return (
                <Panel
                  key={match.matchId}
                  header={
                    (() => {
                      const mainPlayer = match.participants.find(
                        (p) => p.riotIdGameName === name && p.riotIdTagline === tag
                      );
                      const isWin = mainPlayer?.win;

                      // Equipos
                      const blueTeam = match.participants.filter((p) => p.teamId === 100);
                      const redTeam = match.participants.filter((p) => p.teamId === 200);

                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            width: '100%',
                            height: '100%',
                            background: isWin ? '#223b5a' : '#5a2230',
                            borderRadius: 12,
                            padding: 0,
                            minHeight: 70,
                            boxShadow: isWin
                              ? '0 2px 8px #3182f6aa'
                              : '0 2px 8px #ff7675aa',
                            margin: '2px 0',
                          }}
                        >
                          {/* Resultado y modo */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            minWidth: 90,
                            padding: '0 16px',
                          }}>
                            <span style={{
                              color: isWin ? '#3ecfff' : '#ff7675',
                              fontWeight: 800,
                              fontSize: 18,
                              letterSpacing: 1,
                            }}>
                              {isWin ? 'WIN' : 'LOSS'}
                            </span>
                            <span style={{
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: 13,
                            }}>
                              {getQueueType(match.queueId)}
                            </span>
                            <span style={{
                              color: '#bbb',
                              fontSize: 12,
                            }}>
                              {match.gameDurationFormatted}
                            </span>
                          </div>

                          {/* Campeón y KDA */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 120,
                            padding: '0 12px',
                            gap: 12,
                          }}>
                            <Avatar
                              size={48}
                              src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${mainPlayer?.championName}.png`}
                              style={{
                                border: `3px solid ${isWin ? '#3ecfff' : '#ff7675'}`,
                                background: '#fff',
                              }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <span style={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 18,
                                lineHeight: 1,
                              }}>
                                {mainPlayer ? `${mainPlayer.kills} / ${mainPlayer.deaths} / ${mainPlayer.assists}` : '--/--/--'}
                              </span>
                              <span style={{
                                color: '#bbb',
                                fontSize: 12,
                                fontWeight: 500,
                              }}>
                                {mainPlayer ? `${mainPlayer.totalMinionsKilled + mainPlayer.neutralMinionsKilled} CS` : ''}
                              </span>
                              <span style={{
                                color: '#bbb',
                                fontSize: 12,
                                fontWeight: 500,
                              }}>
                                {mainPlayer?.visionScore} vision
                              </span>
                            </div>
                          </div>

                          {/* Objetos */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            minWidth: 170,
                            padding: '0 12px',
                          }}>
                            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                              const itemId = mainPlayer?.[`item${i}`];
                              return itemId && itemId !== 0 ? (
                                <img
                                  key={i}
                                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                                  alt={`item${i}`}
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 4,
                                    background: '#222',
                                    border: '1px solid #444',
                                  }}
                                />
                              ) : (
                                <div
                                  key={i}
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 4,
                                    background: '#444',
                                    opacity: 0.4,
                                  }}
                                />
                              );
                            })}
                          </div>

                          {/* Equipos */}
                          <div style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 24,
                            padding: '0 16px',
                          }}>
                            {/* Blue team */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                              {blueTeam.map((p) => (
                                <div key={p.puuid} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <Avatar
                                    size={20}
                                    src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                                    style={{
                                      border: p.riotIdGameName === name ? '2px solid #3ecfff' : '1px solid #b3e0ff',
                                      background: '#fff',
                                      boxShadow: p.riotIdGameName === name ? '0 0 4px #3ecfff' : undefined,
                                    }}
                                  />
                                  <span style={{
                                    color: '#fff',
                                    fontWeight: p.riotIdGameName === name ? 700 : 400,
                                    fontSize: 13,
                                    maxWidth: 90,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    opacity: p.riotIdGameName === name ? 1 : 0.85,
                                  }}>
                                    {p.riotIdGameName}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {/* Red team */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                              {redTeam.map((p) => (
                                <div key={p.puuid} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                  <Avatar
                                    size={20}
                                    src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                                    style={{
                                      border: p.riotIdGameName === name ? '2px solid #ff7675' : '1px solid #ffd6d6',
                                      background: '#fff',
                                      boxShadow: p.riotIdGameName === name ? '0 0 4px #ff7675' : undefined,
                                    }}
                                  />
                                  <span style={{
                                    color: '#fff',
                                    fontWeight: p.riotIdGameName === name ? 700 : 400,
                                    fontSize: 13,
                                    maxWidth: 90,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    opacity: p.riotIdGameName === name ? 1 : 0.85,
                                  }}>
                                    {p.riotIdGameName}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  }
                  style={{
                    background: (() => {
                      const mainPlayer = match.participants.find(
                        (p) => p.riotIdGameName === name && p.riotIdTagline === tag
                      );
                      return mainPlayer?.win ? '#e3f6fd' : '#fde3e3';
                    })(),
                    borderRadius: 8,
                    marginBottom: 16,
                    border: 'none',
                    // Puedes quitar el background de los hijos si lo tuvieras
                  }}
                >
                  <Divider style={{ background: '#e3e3e3', margin: '0 -24px' }} />

                  {/* Contenedor GRID para alinear encabezado + filas */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: gridTemplate,
                      alignItems: 'center',
                      margin: '0 auto',
                      maxWidth: 700,
                    }}
                  >
                    {/* === ENCABEZADO === */}
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'left' }}>
                      Invocador
                    </div>
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                      Campeón
                    </div>
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                      Rango
                    </div>
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                      KDA
                    </div>
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                      CS
                    </div>
                    <div style={{ fontWeight: 600, color: '#3182f6', textAlign: 'center' }}>
                      Daño
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: '#3182f6',
                        textAlign: 'center',
                      }}
                    >
                      Objetos
                    </div>

                    {/* === FILAS AZUL === */}
                    {blueTeam.map((p) => {
                      const isMainSummoner =
                        p.riotIdGameName === name && p.riotIdTagline === tag;
                      return (
                        <React.Fragment key={`blue-${match.matchId}-${p.riotIdGameName}`}>
                          {/* Invocador */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              fontWeight: isMainSummoner ? 700 : 400,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              background: isMainSummoner ? '#d6eaff' : undefined, // azul claro
                              borderRadius: isMainSummoner ? 6 : undefined,
                              boxShadow: isMainSummoner ? '0 0 0 2px #3182f6' : undefined, // azul
                              padding: isMainSummoner ? '2px 4px' : undefined,
                            }}
                          >
                            <Badge
                              count={p.champLevel}
                              style={{
                                backgroundColor: '#3182f6',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 10,
                                borderRadius: '50%',
                                boxShadow: '0 0 0 2px #fff',
                                minWidth: 16,
                                height: 16,
                                lineHeight: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              offset={[-6, 24]}
                            >
                              <Avatar
                                size={36}
                                src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                                style={{
                                  background: '#fff',
                                  border: '2px solid #3182f6',
                                }}
                              />
                            </Badge>
                            <span
                              style={{
                                fontWeight: 500,
                                fontSize: 15,
                                color: '#222',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: 110,
                              }}
                              title={`${p.riotIdGameName}#${p.riotIdTagline}`}
                            >
                              {`${p.riotIdGameName}#${p.riotIdTagline}`}
                            </span>
                          </div>

                          {/* Campeón */}
                          <div
                            style={{
                              color: '#3182f6',
                              fontWeight: 500,
                              textAlign: 'center',
                            }}
                          >
                            {p.championName}
                          </div>

                          {/* Rango */}
                          <div
                            style={{
                              color: '#888',
                              fontSize: 13,
                              textAlign: 'center',
                            }}
                          >
                            {p.tier && p.tier !== 'UNRANKED'
                              ? `${p.tier} ${p.rank}`
                              : 'Sin rango'}
                          </div>

                          {/* KDA */}
                          <div
                            style={{
                              fontFamily: "'Fira Mono', 'Consolas', 'monospace'",
                              fontWeight: 500,
                              color: '#222',
                              textAlign: 'center',
                            }}
                          >
                            {`${p.kills}/${p.deaths}/${p.assists}`}
                          </div>

                          {/* CS */}
                          <div
                            style={{
                              color: '#888',
                              fontSize: 13,
                              textAlign: 'center',
                            }}
                          >
                            {p.totalMinionsKilled + p.neutralMinionsKilled}
                          </div>

                          {/* Daño */}
                          <div
                            style={{
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                color: '#e17055',
                                fontWeight: 500,
                                lineHeight: 1,
                              }}
                            >
                              {p.totalDamageDealtToChampions}
                            </span>
                            <div
                              style={{
                                background: '#ffeaea',
                                borderRadius: 4,
                                height: 7,
                                marginTop: 2,
                                width: 60,
                                display: 'inline-block',
                                position: 'relative',
                              }}
                            >
                              <div
                                style={{
                                  background: '#ff7675',
                                  height: '100%',
                                  borderRadius: 4,
                                  width: `${
                                    maxBlueDamage
                                      ? Math.max(
                                          10,
                                          (p.totalDamageDealtToChampions / maxBlueDamage) * 100
                                        )
                                      : 10
                                  }%`,
                                  transition: 'width 0.3s',
                                }}
                              />
                            </div>
                          </div>

                          {/* Objetos */}
                          <div
                            style={{
                              display: 'flex',
                              gap: 2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                              const itemId = p[`item${i}`];
                              return itemId && itemId !== 0 ? (
                                <img
                                  key={i}
                                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                                  alt={`item${i}`}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 4,
                                    background: '#222',
                                  }}
                                />
                              ) : (
                                <div
                                  key={i}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 4,
                                    background: '#e3e3e3',
                                    opacity: 0.5,
                                  }}
                                />
                              );
                            })}
                          </div>
                        </React.Fragment>
                      );
                    })}

                    {/* Espacio extra para separar azul/rojo antes del divider */}
                    <div style={{ gridColumn: '1 / -1', height: 24 }} />

                    <Divider
                      style={{
                        background: '#e3e3e3',
                        gridColumn: '1 / -1',
                        margin: '0',
                      }}
                    />

                    {/* Espacio extra tras el divider */}
                    <div style={{ gridColumn: '1 / -1', height: 16 }} />

                    {/* Equipo rojo */}
                    {redTeam.map((p) => {
                      const isMainSummoner =
                        p.riotIdGameName === name && p.riotIdTagline === tag;
                      return (
                        <React.Fragment key={`red-${match.matchId}-${p.riotIdGameName}`}>
                          {/* Invocador */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              fontWeight: isMainSummoner ? 700 : 400,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              background: isMainSummoner ? '#ffd6d6' : undefined, // rojo claro
                              borderRadius: isMainSummoner ? 6 : undefined,
                              boxShadow: isMainSummoner ? '0 0 0 2px #ff7675' : undefined, // rojo
                              padding: isMainSummoner ? '2px 4px' : undefined,
                            }}
                          >
                            <Badge
                              count={p.champLevel}
                              style={{
                                backgroundColor: '#ff7675',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 10,
                                borderRadius: '50%',
                                boxShadow: '0 0 0 2px #fff',
                                minWidth: 16,
                                height: 16,
                                lineHeight: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              offset={[-6, 24]}
                            >
                              <Avatar
                                size={36}
                                src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                                style={{
                                  background: '#fff',
                                  border: '2px solid #ff7675',
                                }}
                              />
                            </Badge>
                            <span
                              style={{
                                fontWeight: 500,
                                fontSize: 15,
                                color: '#222',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: 110,
                              }}
                              title={`${p.riotIdGameName}#${p.riotIdTagline}`}
                            >
                              {`${p.riotIdGameName}#${p.riotIdTagline}`}
                            </span>
                          </div>

                          {/* Campeón */}
                          <div
                            style={{
                              color: '#ff7675',
                              fontWeight: 500,
                              textAlign: 'center',
                            }}
                          >
                            {p.championName}
                          </div>

                          {/* Rango */}
                          <div
                            style={{
                              color: '#888',
                              fontSize: 13,
                              textAlign: 'center',
                            }}
                          >
                            {p.tier && p.tier !== 'UNRANKED'
                              ? `${p.tier} ${p.rank}`
                              : 'Sin rango'}
                          </div>

                          {/* KDA */}
                          <div
                            style={{
                              fontFamily: "'Fira Mono', 'Consolas', 'monospace'",
                              fontWeight: 500,
                              color: '#222',
                              textAlign: 'center',
                            }}
                          >
                            {`${p.kills}/${p.deaths}/${p.assists}`}
                          </div>

                          {/* CS */}
                          <div
                            style={{
                              color: '#888',
                              fontSize: 13,
                              textAlign: 'center',
                            }}
                          >
                            {p.totalMinionsKilled + p.neutralMinionsKilled}
                          </div>

                          {/* Daño */}
                          <div
                            style={{
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                color: '#e17055',
                                fontWeight: 500,
                                lineHeight: 1,
                              }}
                            >
                              {p.totalDamageDealtToChampions}
                            </span>
                            <div
                              style={{
                                background: '#ffeaea',
                                borderRadius: 4,
                                height: 7,
                                marginTop: 2,
                                width: 60,
                                display: 'inline-block',
                                position: 'relative',
                              }}
                            >
                              <div
                                style={{
                                  background: '#ff7675',
                                  height: '100%',
                                  borderRadius: 4,
                                  width: `${
                                    maxRedDamage
                                      ? Math.max(
                                          10,
                                          (p.totalDamageDealtToChampions / maxRedDamage) * 100
                                        )
                                      : 10
                                  }%`,
                                  transition: 'width 0.3s',
                                }}
                              />
                            </div>
                          </div>

                          {/* Objetos */}
                          <div
                            style={{
                              display: 'flex',
                              gap: 2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                              const itemId = p[`item${i}`];
                              return itemId && itemId !== 0 ? (
                                <img
                                  key={i}
                                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                                  alt={`item${i}`}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 4,
                                    background: '#222',
                                  }}
                                />
                              ) : (
                                <div
                                  key={i}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 4,
                                    background: '#e3e3e3',
                                    opacity: 0.5,
                                  }}
                                />
                              );
                            })}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </Card>
      </div>
    </div>
  );
}
