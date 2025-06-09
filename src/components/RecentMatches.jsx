import React, { useState } from 'react';
import { Avatar, Badge, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getQueueType } from '../utils/queueTypeMap';
import { Link } from 'react-router-dom';

export default function RecentMatches({ recentMatches = [], name, tag }) {
  return (
    <Card
      style={{
        maxWidth: 900,
        margin: '32px auto 0 auto',
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 2px 12px rgba(31,38,135,0.07)',
        padding: 0
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ padding: 24 }}>
        <h2
          style={{
            color: '#222',
            marginLeft: 8,
            marginBottom: 16,
            fontSize: 16,
            fontWeight: 700, 
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <UserOutlined style={{ marginRight: 8, color: '#3182f6' }} />
          Partidas recientes
        </h2>
        {recentMatches.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', margin: 24 }}>
            No hay partidas recientes para mostrar.
          </div>
        )}
        {recentMatches.map((match) => (
          <MatchCard
            key={match.matchId}
            match={match}
            name={name}
            tag={tag}
          />
        ))}
      </div>
    </Card>
  );
}


function MatchCard({ match, name, tag }) {
  const [expanded, setExpanded] = useState(false);
  const mainPlayer = match.participants.find(
    (p) => p.riotIdGameName === name && p.riotIdTagline === tag
  );
  const isWin = mainPlayer?.win;
  const blueTeam = match.participants.filter((p) => p.teamId === 100);
  const redTeam = match.participants.filter((p) => p.teamId === 200);

  const isAram = match.queueId === 450;

  const cardBackground = isWin
    ? 'linear-gradient(90deg, #2563eb 0%, #3ecfff 100%)'
    : 'linear-gradient(90deg, #59343b 0%, #ff7675 100%)';

  return (
    <div
      style={{
        background: cardBackground,
        borderRadius: 10,
        marginBottom: 8,
        boxShadow: '0 1px 6px rgba(40,52,78,0.18)', 
        padding: '6px 10px',
        color: '#fff',
        minHeight: 50,
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
        position: 'relative',
        flexDirection: 'column',
        display: 'flex',
        textShadow: '0 3px 12px #000, 0 0 2px #000'
      }}
    >
 
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div style={{ minWidth: 90, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: isWin ? '#3ecfff' : '#ff7675' }}>
            {getQueueType(match.queueId)}
          </div>
          <div style={{ fontSize: 11, color: '#bbb', marginBottom: 2 }}>
            {match.gameDurationFormatted}
          </div>
          <div style={{
            fontWeight: 800,
            fontSize: 14,
            color: isWin ? '#3ecfff' : '#ff7675',
            marginBottom: 0
          }}>
            {isWin ? 'VICTORIA' : 'DERROTA'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 110 }}>
          <Badge
            count={mainPlayer?.champLevel}
            style={{
              backgroundColor: '#202d37',
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 10,
              borderRadius: '50%',
              width: 14,
              height: 14,
              minWidth: 14,
              lineHeight: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              padding: 0,
              marginBottom: 4,
              marginTop: 35
            }}
            offset={[-8, 20]}
          >
            <Avatar
              size={48}
              src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${mainPlayer?.championName}.png`}
              style={{
                border: 'none',
                background: '#fff',
              }}
            />
          </Badge>
          <div style={{ marginLeft: 14, fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 18 }}>
            {mainPlayer ? (
              <>
                <div>
                  {mainPlayer.kills}
                  {' / '}
                  <span style={{ color: '#e84057' }}>{mainPlayer.deaths}</span>
                  {' / '}
                  {mainPlayer.assists}
                  <div style={{ fontSize: 13, color: '#f3f4f6', fontWeight: 400, marginTop: 2 }}>
                    {mainPlayer.deaths > 0 ? (
                      <>
                        {((mainPlayer.kills + mainPlayer.assists) / mainPlayer.deaths).toFixed(2)} KDA
                      </>
                    ) : (
                      <>
                        <span style={{ color: '#FFD700', fontWeight: 700 }}>Perfect</span> KDA
                      </>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#f3f4f6', fontWeight: 400, marginLeft: 12, minWidth: 48 }}>
                  CS {(mainPlayer.totalMinionsKilled + mainPlayer.neutralMinionsKilled)}
                </div>
              </>
            ) : '--/--/--'}
          </div>
          <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const itemId = mainPlayer?.[`item${i}`];
              return itemId && itemId !== 0 ? (
                <img
                  key={i}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                  alt={`item${i}`}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 3,
                  }}
                />
              ) : (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 3,
                    background: '#444',
                    opacity: 0.4,
                  }}
                />
              );
            })}
          </div>
        </div>
        {/* Equipos */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            gap: 3,
            minWidth: 0,
            paddingRight: 32,
          }}
        >
          {/* Blue team */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', minWidth: 60 }}>
            {blueTeam.map((p, idx) => (
              <div
                key={p.puuid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  minHeight: 20,
                }}
              >
                <Avatar
                  size={20}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                  style={{
                    border: 'none',
                    borderRadius: 4,

                  }}
                />
                <Link
                  to={`/summoner/${encodeURIComponent(p.region || 'EUW1')}/${encodeURIComponent(p.riotIdGameName)}/${encodeURIComponent(p.riotIdTagline)}`}
                  title={p.riotIdGameName}
                  onClick={e => e.stopPropagation()}
                  style={{
                    color: p.riotIdGameName === name ? '#fff' : '#f3f4f6',
                    fontWeight: 400,
                    fontSize: 11,
                    width: 50,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    opacity: p.riotIdGameName === name ? 1 : 0.85,
                    textAlign: 'left',
                    textDecoration: 'none',
                  }}
                >
                  {p.riotIdGameName}
                  <span style={{ color: '#f3f4f6', fontWeight: 400, fontSize: 11, marginLeft: 2 }}>
                    #{p.riotIdTagline}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {!isAram && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', minWidth: 32 }}>
              {blueTeam.map((p, idx) => (
                <img
                  key={p.puuid ? `${p.puuid}-role` : `${idx}-role`}
                  src={`/roles/${getPositionIcon(p.teamPosition || p.individualPosition || p.role)}.png`}
                  alt={p.teamPosition || p.individualPosition || p.role}
                  title={p.teamPosition || p.individualPosition || p.role}
                  style={{ width: 20, height: 20, opacity: 0.85 }}
                />
              ))}
            </div>
          )}

          {/* Red team */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start', minWidth: 60 }}>
            {redTeam.map((p, idx) => (
              <div
                key={p.puuid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  minHeight: 20,
                }}
              >
                <Avatar
                  size={20}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                  style={{
                    border: 'none',
                    borderRadius: 4,
                    background: '#fff',
                    boxShadow: p.riotIdGameName === name ? '0 0 4px #ff7675' : undefined,
                  }}
                />
                <Link
                  to={`/summoner/${encodeURIComponent(p.region || 'EUW1')}/${encodeURIComponent(p.riotIdGameName)}/${encodeURIComponent(p.riotIdTagline)}`}
                  title={p.riotIdGameName}
                  onClick={e => e.stopPropagation()}
                  style={{
                    color: p.riotIdGameName === name ? '#fff' : '#f3f4f6',
                    fontWeight: 400,
                    fontSize: 11,
                    width: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    opacity: p.riotIdGameName === name ? 1 : 0.85,
                    textAlign: 'left',
                    textDecoration: 'none',
                  }}
                >
                  {p.riotIdGameName}
                  <span style={{ color: '#f3f4f6', fontWeight: 400, fontSize: 11, marginLeft: 2 }}>
                    #{p.riotIdTagline}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', right: 16, top: 16, fontSize: 18, userSelect: 'none' }}>
          {expanded ? '▲' : '▼'}
        </div>
      </div>
      {/* Contenido expandido */}
      {expanded && (
        <div style={{ width: '100%', marginTop: 16, background: '#282830', borderRadius: 8, padding: 16 }}>
          <div
            style={{
              overflowX: 'auto',
              maxWidth: '100%',
              position: 'relative'
            }}
          >
            <style>
              {`
                /* Chrome, Edge, Safari */
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <table style={{ minWidth: '100%', borderCollapse: 'collapse', fontSize: 13, color: '#fff' }}>
              <thead>
                <tr style={{ background: '#282830', color: '#fff' }}>
                  <th style={{ padding: 6, textAlign: 'left' }}>Jugador</th>
                  <th style={{ padding: 6 }}>KDA</th>
                  <th style={{ padding: 6 }}>Daño infligido</th>
                  <th style={{ padding: 6 }}>CS</th>
                  <th style={{ padding: 6 }}>Objetos</th>
                </tr>
              </thead>
              <tbody>
                {/* Blue Team */}
                <tr>
                  <td colSpan={6} style={{
                    background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 13,
                    letterSpacing: 1
                  }}>
                    Equipo Azul
                  </td>
                </tr>
                {match.participants.filter(p => p.teamId === 100).map((p) => (
                  <tr
                    key={p.puuid}
                    style={{
                      background: p.riotIdGameName === name && p.riotIdTagline === tag
                        ? 'linear-gradient(90deg, #3ecfff 0%, #2563eb 100%)'
                        : 'rgba(37,99,235,0.18)',
                      color: p.riotIdGameName === name && p.riotIdTagline === tag ? '#fff' : undefined,
                      fontWeight: p.riotIdGameName === name && p.riotIdTagline === tag ? 700 : 400,
                      boxShadow: p.riotIdGameName === name && p.riotIdTagline === tag ? '0 0 8px #3ecfff55' : undefined,
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{
                      padding: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: p.riotIdGameName === name ? 700 : 400,
                      color: p.riotIdGameName === name ? '#3ecfff' : '#fff'
                    }}>
                      <Badge
                        count={p.champLevel}
                        style={{
                          backgroundColor: '#202d37',
                          color: '#fff',
                          fontWeight: 'normal',
                          fontSize: 11,
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          minWidth: 18,
                          lineHeight: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'none',
                          padding: 0,
                          marginRight: 4
                        }}
                        offset={[-8, 32]}
                      >
                        <Avatar
                          size={32}
                          src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                          style={{ border: 'none', background: '#fff', marginRight: 4 }}
                        />
                      </Badge>
                      <Link
                        to={`/summoner/${encodeURIComponent(p.region || 'EUW1')}/${encodeURIComponent(p.riotIdGameName)}/${encodeURIComponent(p.riotIdTagline)}`}
                        title={p.riotIdGameName}
                        onClick={e => e.stopPropagation()}
                        style={{
                          maxWidth: 120,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'inline-block',
                          textDecoration: 'none',
                          fontWeight: 400,
                          color: '#fff',
                          textShadow: '0 2px 8px #000, 0 0 2px #000' 
                        }}
                      >
                        {p.riotIdGameName}
                        <span style={{
                          color: '#fff',
                          fontWeight: 400,
                          fontSize: 11,
                          marginLeft: 2,
                          textShadow: '0 2px 8px #000, 0 0 2px #000'
                        }}>
                          #{p.riotIdTagline}
                        </span>
                      </Link>
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {p.kills}/{p.deaths}/{p.assists}
                      <div style={{ fontSize: 12, color: '#9a96aa', fontWeight: 400 }}>
                        {p.deaths > 0
                          ? ((p.kills + p.assists) / p.deaths).toFixed(2) + ' KDA'
                          : <span style={{ color: '#FFD700', fontWeight: 700 }}>Perfect KDA</span>
                        }
                      </div>
                    </td>
                    <td style={{ padding: 6, textAlign: 'center', minWidth: 90 }}>
                      {p.totalDamageDealtToChampions ?? '-'}
                      {/* Barra de daño */}
                      {(() => {
                        // Calcula el máximo daño de todos los participantes para la barra
                        const maxDamage = Math.max(...match.participants.map(x => x.totalDamageDealtToChampions || 0));
                        const percent = maxDamage > 0 ? ((p.totalDamageDealtToChampions || 0) / maxDamage) * 100 : 0;
                        return (
                          <div style={{
                            background: '#181c2a',
                            borderRadius: 4,
                            height: 8,
                            marginTop: 4,
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: p.teamId === 100
                                ? 'linear-gradient(90deg, #3ecfff 60%, #2563eb 100%)'
                                : 'linear-gradient(90deg, #ff7675 60%, #dc2626 100%)',
                              borderRadius: 4,
                              transition: 'width 0.3s'
                            }} />
                          </div>
                        );
                      })()}
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {p.totalMinionsKilled + p.neutralMinionsKilled}
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                        const itemId = p[`item${i}`];
                        return itemId && itemId !== 0 ? (
                          <img
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                            alt={`item${i}`}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              marginRight: 2,
                              verticalAlign: 'middle'
                            }}
                          />
                        ) : (
                          <span key={i} style={{ display: 'inline-block', width: 20, height: 20, marginRight: 2, background: '#444', borderRadius: 3, opacity: 0.4 }} />
                        );
                      })}
                    </td>
                  </tr>
                ))}
                {/* Red Team */}
                <tr>
                  <td colSpan={6} style={{
                    background: 'linear-gradient(90deg, #dc2626 0%, #7f1d1d 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 13,
                    letterSpacing: 1
                  }}>
                    Equipo Rojo
                  </td>
                </tr>
                {match.participants.filter(p => p.teamId === 200).map((p) => (
                  <tr
                    key={p.puuid}
                    style={{
                      background: p.riotIdGameName === name && p.riotIdTagline === tag
                        ? 'linear-gradient(90deg, #ff7675 0%, #dc2626 100%)'
                        : 'rgba(220,38,38,0.18)',
                      color: p.riotIdGameName === name && p.riotIdTagline === tag ? '#fff' : undefined,
                      fontWeight: p.riotIdGameName === name && p.riotIdTagline === tag ? 700 : 400,
                      boxShadow: p.riotIdGameName === name && p.riotIdTagline === tag ? '0 0 8px #ff767555' : undefined,
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{
                      padding: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: p.riotIdGameName === name ? 700 : 400,
                      color: p.riotIdGameName === name ? '#ff7675' : '#fff'
                    }}>
                      <Badge
                        count={p.champLevel}
                        style={{
                          backgroundColor: '#202d37',
                          color: '#fff',
                          fontWeight: 'normal',
                          fontSize: 11,
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          minWidth: 18,
                          lineHeight: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'none',
                          padding: 0,
                          marginRight: 4
                        }}
                        offset={[-8, 32]}
                      >
                        <Avatar
                          size={32}
                          src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${p.championName}.png`}
                          style={{ border: 'none', background: '#fff', marginRight: 4 }}
                        />
                      </Badge>
                      <Link
                        to={`/summoner/${encodeURIComponent(p.region || 'EUW1')}/${encodeURIComponent(p.riotIdGameName)}/${encodeURIComponent(p.riotIdTagline)}`}
                        title={p.riotIdGameName}
                        onClick={e => e.stopPropagation()}
                        style={{
                          maxWidth: 120,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'inline-block',
                          textDecoration: 'none',
                          fontWeight: 400,
                          color: '#fff',
                          textShadow: '0 2px 8px #000, 0 0 2px #000' 
                        }}
                      >
                        {p.riotIdGameName}
                        <span style={{
                          color: '#fff',
                          fontWeight: 400,
                          fontSize: 11,
                          marginLeft: 2,
                          textShadow: '0 2px 8px #000, 0 0 2px #000' 
                        }}>
                          #{p.riotIdTagline}
                        </span>
                      </Link>
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {p.kills}/{p.deaths}/{p.assists}
                      <div style={{ fontSize: 12, color: '#9a96aa', fontWeight: 400 }}>
                        {p.deaths > 0
                          ? ((p.kills + p.assists) / p.deaths).toFixed(2) + ' KDA'
                          : <span style={{ color: '#FFD700', fontWeight: 700 }}>Perfect KDA</span>
                        }
                      </div>
                    </td>
                    <td style={{ padding: 6, textAlign: 'center', minWidth: 90 }}>
                      {p.totalDamageDealtToChampions ?? '-'}
                      {(() => {
                        // Calcula el máximo daño de todos los participantes para la barra
                        const maxDamage = Math.max(...match.participants.map(x => x.totalDamageDealtToChampions || 0));
                        const percent = maxDamage > 0 ? ((p.totalDamageDealtToChampions || 0) / maxDamage) * 100 : 0;
                        return (
                          <div style={{
                            background: '#181c2a',
                            borderRadius: 4,
                            height: 8,
                            marginTop: 4,
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: p.teamId === 100
                                ? 'linear-gradient(90deg, #3ecfff 60%, #2563eb 100%)'
                                : 'linear-gradient(90deg, #ff7675 60%, #dc2626 100%)',
                              borderRadius: 4,
                              transition: 'width 0.3s'
                            }} />
                          </div>
                        );
                      })()}
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {p.totalMinionsKilled + p.neutralMinionsKilled}
                    </td>
                    <td style={{ padding: 6, textAlign: 'center' }}>
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                        const itemId = p[`item${i}`];
                        return itemId && itemId !== 0 ? (
                          <img
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${itemId}.png`}
                            alt={`item${i}`}
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              marginRight: 2,
                              verticalAlign: 'middle'
                            }}
                          />
                        ) : (
                          <span key={i} style={{ display: 'inline-block', width: 20, height: 20, marginRight: 2, background: '#444', borderRadius: 3, opacity: 0.4 }} />
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function getPositionIcon(position) {
  switch ((position || '').toUpperCase()) {
    case 'TOP': return 'top';
    case 'JUNGLE': return 'jungle';
    case 'JNG': return 'jungle';
    case 'MIDDLE': return 'mid';
    case 'MID': return 'mid';
    case 'BOTTOM': return 'bot';
    case 'BOT': return 'bot';
    case 'ADC': return 'adc';
    case 'DUO_CARRY': return 'adc';
    case 'SUPPORT': return 'support';
    case 'DUO_SUPPORT': return 'support';
    default: return 'unknown';
  }
}