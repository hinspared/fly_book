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

interface FlightComponentProps {
  flight: Flight;
}
const grayColor = '#5a6472';
const FlightComponent: React.FC<FlightComponentProps> = ({ flight }) => {
  const { setCurrentFlight, setOpen } = useModalStore();

  const handleClick = () => {
    setCurrentFlight(flight);
    setOpen();
  };
  return (
    <ListItem>
      <Paper
        elevation={3}
        sx={{
          marginX: 'auto',
        }}
      >
        <Stack direction="row">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              paddingY: 5,
              paddingX: 2,
            }}
          >
            <Typography fontWeight={600} variant="h5">
              ${flight.price}
            </Typography>
            <Button variant="contained" onClick={handleClick}>
              Select ticket
            </Button>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" sx={{ paddingY: 5, paddingX: 2 }}>
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
              spacing={1}
              sx={{
                color: grayColor,
              }}
            >
              <FlightTakeoffIcon />
              <Stack direction="column" alignItems="center">
                <Typography>Duration: {flight.duration}</Typography>
                <LinearProgress
                  value={100}
                  variant="determinate"
                  sx={{ minWidth: 200 }}
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
        </Stack>
      </Paper>
    </ListItem>
  );
};

export default FlightComponent;
