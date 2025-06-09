import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Typography, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Text } = Typography;

export default function MasteryCard({ championMasteries = [] }) {
  const [showAll, setShowAll] = useState(false);

  const displayedMasteries = showAll
    ? championMasteries
    : championMasteries.slice(0, 4);

  return (
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
        {displayedMasteries.map((mastery) => (
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
            onClick={() => setShowAll((v) => !v)}
            style={{
              textTransform: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
              borderColor: '#3182f6',
              color: '#3182f6',
            }}
          >
            {showAll ? 'Ver menos' : 'Ver más'}
          </Button>
        </div>
      )}
    </Card>
  );
}