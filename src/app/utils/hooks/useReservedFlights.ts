import { create } from 'zustand';
import { Flight } from '../types/types';

interface FlightStore {
  flights: Flight[];
  addFlight: (flight: Flight) => void;
}

// export const useReservedFlightStore = create<FlightStore>((set) => ({
//   flights: [],
//   addFlight: (flight) => {
//     set((state) => ({
//       flights: [...state.flights, flight],
//     }));
//   },
// }));

export const useReservedFlightStore = create<FlightStore>((set) => ({
  flights: [],
  addFlight: (flight) => {
    set((state) => {
      const updatedFlights = [...state.flights];
      const existingFlightIndex = updatedFlights.findIndex(
        (reservedFlight) => reservedFlight.id === flight.id
      );

      if (existingFlightIndex !== -1) {
        // Flight already exists in store, update it
        updatedFlights[existingFlightIndex] = flight;
      } else {
        // Flight doesn't exist in store, add it
        updatedFlights.push(flight);
      }

      return { flights: updatedFlights };
    });
  },
}));
