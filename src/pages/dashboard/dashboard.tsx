import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import StationCard from '../../components/stationCard/stationCard';
import { saveCollectionLog, saveStation } from '../../services/stationsServices';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const [stations, setStations] = useState([
    { id: "station1", name: "Estação 1", volume: 0 },
    { id: "station2", name: "Estação 2", volume: 0 },
    { id: "station3", name: "Estação 3", volume: 0 },
  ]);

  const updateVolume = (id: string, volume: number) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === id ? { ...station, volume } : station
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      stations.forEach(async (station) => {
        await saveStation(station);

        if (station.volume >= 80) {
          console.log(`Pedido de coleta para ${station.name}`);
          await saveCollectionLog(station, new Date());
        }
      });
    }, 300000);

    return () => clearInterval(interval);
  }, [stations]);

  const confirmCollection = async (id: string) => {
    const currentStation = stations.find((station) => station.id === id);

    if (currentStation) {
      const { volume } = currentStation;
      await saveStation({
        id,
        volume,
        date: new Date(),
        type: "collect",
      });
      console.log(`Coleta confirmada para estação ${id} com volume ${volume}%`);

      setStations((prevStations) =>
        prevStations.map((station) =>
          station.id === id ? { ...station, volume: 0 } : station
        )
      );
    }
  };

  return (
    <Container>
      <Typography className='title' variant="h4" align="center" gutterBottom>
        Sistema de Controle de Volume
      </Typography>
      <Grid container spacing={2}>
        {stations.map((station) => (
          <Grid item xs={12} sm={6} md={4} key={station.id}>
            <StationCard
              station={station}
              updateVolume={updateVolume}
              confirmCollection={confirmCollection}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
