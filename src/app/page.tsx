'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchBar from './components/searchbar/SearchBar';
import flights from './utils/data/mockData.json';
import { Toaster } from 'react-hot-toast';
import FlightsList from './components/flightsList/FlightsList';
import logo from '../../public/logo.png';
import { Stack } from '@mui/material';
import Image from 'next/image';
import ReservationModal from './components/reservationModal/ReservationModal';
import { useModalStore } from './utils/hooks/useModal';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {
  const mobile = useMediaQuery('(max-width:600px)');

  // modal
  const { open, currentFlight } = useModalStore();

  // autocomplete options
  const flightsOptions = {
    from: [...new Set(flights.map((flight) => flight.from))],
    to: [...new Set(flights.map((flight) => flight.to))],
  };
  const [toOptions, setToOptions] = React.useState(flightsOptions.to);
  const handleFromChange = (value: string | null) => {
    if (value) {
      const filteredOptions = flights
        .filter((flight) => flight.from.includes(value))
        .map((flight) => flight.to);
      setToOptions(filteredOptions);
    } else setToOptions(flightsOptions.to);
  };
  const options = {
    from: flightsOptions.from,
    to: [...new Set(toOptions)],
  };
  return (
    <>
      <Toaster />
      <Box mx={mobile ? 2 : 10} mt={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={logo} width={40} height={40} alt="logo" />
          <Typography variant="h5">FlyBook</Typography>
        </Stack>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Search cheap flight tickets
        </Typography>
        <SearchBar
          options={options}
          onChange={handleFromChange}
          mobile={mobile}
        />
        <FlightsList mobile={mobile} />
      </Box>
      <ReservationModal open={open} flight={currentFlight} />
    </>
  );
}
