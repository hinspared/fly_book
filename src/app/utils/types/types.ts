export type Seat = {
  id: number;
  number: string;
  available: boolean;
};

export type Flight = {
  id: number;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seats: Seat[];
};

export type Params = Omit<
  Flight,
  'id' | 'duration' | 'arrival' | 'price' | 'seats'
> & {
  passengers: number;
};

export type Passenger = {
  firstName: string;
  lastName: string;
  passport: string;
  phoneNumber: string;
  email: string;
};
