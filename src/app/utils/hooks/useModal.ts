import { create } from 'zustand';
import { Flight } from '../types/types';

interface ModalStore {
  currentFlight: Flight;
  setCurrentFlight: (flight: Flight) => void;
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentFlight: {
    id: 0,
    from: '',
    to: '',
    departure: '',
    arrival: '',
    duration: '',
    price: 0,
    seats: [],
  },
  setCurrentFlight: (flight) => set({ currentFlight: flight }),
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
}));
