import React from 'react';
import { Card, Space, Avatar, Typography, Alert } from 'antd';
import { TrophyFilled } from '@ant-design/icons';

const { Text } = Typography;

export default function LeagueCard({ leagueEntries = [] }) {
  return (
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
  );
}