import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const regions = [
  { label: 'EUW', value: 'EUW1' },
  { label: 'NA', value: 'NA1' },
  { label: 'EUNE', value: 'EUN1' },
    { label: 'LAS', value: 'LA1' },
    { label: 'LAN', value: 'LA2' },
    { label: 'BR', value: 'BR1' },
    { label: 'KR', value: 'KR' },
    { label: 'JP', value: 'JP1' },
    { label: 'RU', value: 'RU' },
    { label: 'TR', value: 'TR1' },
    { label: 'OCE', value: 'OC1' },
    { label: 'PH', value: 'PH2' },
    { label: 'SG', value: 'SG2' },
    { label: 'TH', value: 'TH2' },
    { label: 'VN', value: 'VN2' }
];

export default function SummonerSearchBar({ defaultRegion = 'EUW1' }) {
  const [region, setRegion] = useState(defaultRegion);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearch = (value) => {
    const [name, tag] = value.split('#');
    if (name && tag) {
      navigate(`/summoner/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      <Select
        value={region}
        onChange={setRegion}
        options={regions}
        style={{ width: 100 }}
      />
      <Search
        placeholder="Invocador#TAG"
        enterButton="Buscar"
        size="large"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onSearch={onSearch}
        style={{ maxWidth: 300 }}
      />
    </div>
  );
}