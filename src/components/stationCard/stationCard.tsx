import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  Box,
} from '@mui/material';
import { Station } from '../../types/station';

interface StationCardProps {
  station: Station;
  updateVolume: (id: string, newVolume: number) => void;
  confirmCollection: (id: string) => void;
}

const StationCard: React.FC<StationCardProps> = ({
  station,
  updateVolume,
  confirmCollection,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    updateVolume(station.id, newValue as number);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{station.name}</Typography>
        <Box my={2}>
          <Slider
            value={station.volume}
            onChange={handleSliderChange}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            disabled={station.request}
          />
        </Box>
        {station.volume < 80 ?
            <Typography>Volume Atual: {station.volume}%</Typography>
            : 
            <Typography style={{color: 'orange'}}>Volume Atual: {station.volume}%</Typography>
        }

        {station.volume > 80 ? (
          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => confirmCollection(station.id)}
            >
              Confirmar Coleta
            </Button>
          </Box>
        ) : (
          <Typography color="textSecondary">Abaixo de 80%.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StationCard;
