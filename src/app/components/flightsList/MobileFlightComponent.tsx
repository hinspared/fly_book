'use client';
import React from 'react';
import { Flight } from '@/app/utils/types/types';
import {
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  ListItem,
  LinearProgress,
} from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useModalStore } from '@/app/utils/hooks/useModal';

interface MobileFlightComponentsProps {
  flight: Flight;
}

const grayColor = '#5a6472';

const MobileFlightComponent: React.FC<MobileFlightComponentsProps> = ({
  flight,
}) => {
  const { setCurrentFlight, setOpen } = useModalStore();

  const handleClick = () => {
    setCurrentFlight(flight);
    setOpen();
  };

  return (
    <ListItem sx={{ paddingX: 0 }}>
      <Paper elevation={3} sx={{ width: '100%' }}>
        <Stack direction="column" alignItems="center" spacing={2} p={2}>
          <Typography fontWeight={600} variant="h5">
            ${flight.price}
          </Typography>
          <Button variant="contained" onClick={handleClick}>
            Select ticket
          </Button>
        </Stack>
        <Divider />
        <Stack direction="row" p={2}>
          <Stack direction="column">
            <Typography fontWeight={500}>
              {flight.departure.substring(11, 16)}
            </Typography>
            <Stack direction="column" sx={{ color: grayColor }}>
              <Typography>{flight.from}</Typography>
              <Typography>{flight.departure.substring(0, 10)}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            color={grayColor}
          >
            <FlightTakeoffIcon />
            <Stack direction="column" alignItems="center">
              <Typography>Duration: {flight.duration}</Typography>
              <LinearProgress
                value={100}
                variant="determinate"
                sx={{ minWidth: 100 }}
                color="inherit"
              />
            </Stack>
            <FlightLandIcon />
          </Stack>
          <Stack direction="column" sx={{ textAlign: 'right' }}>
            <Typography fontWeight={500}>
              {flight.arrival.substring(11, 16)}
            </Typography>
            <Stack direction="column" sx={{ color: grayColor }}>
              <Typography>{flight.to}</Typography>
              <Typography>{flight.arrival.substring(0, 10)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </ListItem>
  );
};

export default MobileFlightComponent;
