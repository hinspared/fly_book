'use client';
import React from 'react';
import { useReservedFlightStore } from '../../utils/hooks/useReservedFlights';
import flights from '../../utils/data/mockData.json';
import FlightComponent from './FlightComponent';
import { List, Paper, Stack, Typography } from '@mui/material';
import { useSearchParams } from '@/app/utils/hooks/useSearchParams';
import MobileFlightComponent from './MobileFlightComponent';

interface FlightsListProps {
  mobile: boolean;
}
const FlightsList: React.FC<FlightsListProps> = ({ mobile }) => {
  const { params } = useSearchParams();
  const { flights: reservedFlights } = useReservedFlightStore();
  const availableFlights = flights.map((flight) => {
    const reservedFlight = reservedFlights.find(
      (reservedFlight) => reservedFlight.id === flight.id
    );
    if (reservedFlight) {
      const updatedSeats = flight.seats.map((seat) => {
        const reservedSeat = reservedFlight.seats.find(
          (reservedSeat) => reservedSeat.number === seat.number
        );
        if (reservedSeat && !reservedSeat.available) {
          return {
            ...seat,
            available: false,
          };
        }
        return seat;
      });
      return {
        ...flight,
        seats: updatedSeats,
      };
    }
    return flight;
  });
  const filteredFlights = availableFlights.filter((flight) => {
    return (
      flight.from === params.from &&
      flight.to === params.to &&
      flight.departure.includes(params.departure) &&
      flight.seats.filter((seat) => seat.available).length >= params.passengers
    );
  });
  return filteredFlights.length > 0 ? (
    <List>
      {React.Children.toArray(
        filteredFlights.map((flight) => (
          <>
            {mobile ? (
              <MobileFlightComponent flight={flight} />
            ) : (
              <FlightComponent flight={flight} />
            )}
          </>
        ))
      )}
    </List>
  ) : params.from !== '' && params.to !== '' ? (
    <Paper
      elevation={1}
      sx={{
        marginTop: 4,
        marginX: 'auto',
        paddingY: 4,
      }}
    >
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography variant="h4">No flights found</Typography>
        <Typography variant="h6">The reasons could be:</Typography>
        <Stack direction="column">
          <Typography variant="body1">
            - There are no flights to this airport
          </Typography>
          <Typography variant="body1">
            - There are no flights for this date
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  ) : null;
};

export default FlightsList;
