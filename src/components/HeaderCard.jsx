import React from 'react';
import { Card, Row, Col, Badge, Avatar, Tag, Typography, Progress } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function HeaderCard({ profileIconId, region, name, tag, summonerLevel }) {
  return (
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
        </Col>
      </Row>
    </Card>
  );
}