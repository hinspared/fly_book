'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
  Checkbox,
  Stack,
} from '@mui/material';
import { useReservedFlightStore } from '../../utils/hooks/useReservedFlights';
import { Flight, Seat } from '../../utils/types/types';
import { useModalStore } from '../../utils/hooks/useModal';
import InfoField from './InfoField';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import toast from 'react-hot-toast';
import PassengerModal from './PassengerModal';
import Grid from '@mui/material/Unstable_Grid2';

interface ReservationModalProps {
  open: boolean;
  flight: Flight;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  open,
  flight,
}) => {
  const { addFlight } = useReservedFlightStore();
  const { setClose } = useModalStore();

  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const [passengerModalOpen, setPassengerModalOpen] = React.useState(false);

  const handleSeatSelection = (
    event: SelectChangeEvent<typeof selectedSeats>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSeats(typeof value === 'string' ? value.split(',') : value);
  };

  const handleBuyTickets = () => {
    if (selectedSeats.length === 0) {
      return toast.error('You should select seats');
    }
    setPassengerModalOpen(true);
    setClose();
  };

  const handlePassengerModalClose = () => {
    setPassengerModalOpen(false);
    setSelectedSeats([]);
  };

  const handlePassengerFormSubmit = () => {
    const updatedFlight = {
      ...flight,
      seats: flight.seats.map((seat: Seat) => {
        if (selectedSeats.includes(seat.number)) {
          return {
            ...seat,
            available: false,
          };
        }
        return seat;
      }),
    };
    addFlight(updatedFlight);
    toast.success('Tickets were bought');
    handlePassengerModalClose();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Dialog open={open} onClose={setClose}>
        <DialogTitle textAlign="center">Flight Reservation</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Flight Details:</Typography>

          <Stack direction="column" spacing={1}>
            <InfoField
              title="from"
              name={flight.from}
              icon={<FlightTakeoffIcon />}
            />
            <InfoField title="to" name={flight.to} icon={<FlightLandIcon />} />
            <Stack direction="row" spacing={1}>
              <InfoField
                title="departure"
                name={flight.departure.substring(0, 16)}
              />
              <FormControl
                sx={{
                  minWidth: 100,
                }}
              >
                <InputLabel id="seats" sx={{ color: 'black' }}>
                  Seats
                </InputLabel>
                <Select
                  id="seats"
                  labelId="seats"
                  multiple
                  value={selectedSeats}
                  onChange={handleSeatSelection}
                  input={<OutlinedInput label="Seats" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  sx={{
                    padding: 1,
                  }}
                >
                  {flight.seats.map((seat: Seat) => (
                    <MenuItem
                      key={seat.id}
                      value={seat.number}
                      disabled={!seat.available}
                    >
                      <ListItemText primary={seat.number} />
                      <Checkbox
                        checked={selectedSeats.indexOf(seat.number) > -1}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Typography textAlign="right">
              Price: ${flight.price * selectedSeats.length}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleBuyTickets}
            disabled={selectedSeats.length === 0 ? true : false}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {passengerModalOpen && (
        <PassengerModal
          open={passengerModalOpen}
          numPassengers={selectedSeats.length}
          onClose={handlePassengerModalClose}
          onSubmit={handlePassengerFormSubmit}
        />
      )}
    </>
  );
};

export default ReservationModal;
