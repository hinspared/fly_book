import { create } from 'zustand';
import { Params } from '../types/types';

interface SearchParams {
  params: Params;
  setParams: (newParams: Params) => void;
}

export const useSearchParams = create<SearchParams>((set) => ({
  params: {
    from: '',
    to: '',
    departure: '',
    passengers: 0,
  },
  setParams: (newParams: Params) => set({ params: newParams }),
}));
