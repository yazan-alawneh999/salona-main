import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceArea, ProviderServiceArea } from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ServiceAreaState {
  providerServiceArea: ProviderServiceArea | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceAreaState = {
  providerServiceArea: null,
  isLoading: false,
  error: null,
};

const serviceAreaSlice = createSlice({
  name: 'serviceArea',
  initialState,
  reducers: {
    setServiceAreas: (state, action: PayloadAction<ProviderServiceArea>) => {
      state.providerServiceArea = action.payload;
      state.error = null;
      // Save to AsyncStorage
      AsyncStorage.setItem('providerServiceArea', JSON.stringify(action.payload));
    },
    addServiceArea: (state, action: PayloadAction<ServiceArea>) => {
      if (state.providerServiceArea) {
        state.providerServiceArea.areas.push(action.payload);
        // Save to AsyncStorage
        AsyncStorage.setItem('providerServiceArea', JSON.stringify(state.providerServiceArea));
      }
    },
    updateServiceArea: (state, action: PayloadAction<ServiceArea>) => {
      if (state.providerServiceArea) {
        const index = state.providerServiceArea.areas.findIndex(
          area => area.id === action.payload.id
        );
        if (index !== -1) {
          state.providerServiceArea.areas[index] = action.payload;
          // Save to AsyncStorage
          AsyncStorage.setItem('providerServiceArea', JSON.stringify(state.providerServiceArea));
        }
      }
    },
    removeServiceArea: (state, action: PayloadAction<string>) => {
      if (state.providerServiceArea) {
        state.providerServiceArea.areas = state.providerServiceArea.areas.filter(
          area => area.id !== action.payload
        );
        // Save to AsyncStorage
        AsyncStorage.setItem('providerServiceArea', JSON.stringify(state.providerServiceArea));
      }
    },
    setDefaultRadius: (state, action: PayloadAction<number>) => {
      if (state.providerServiceArea) {
        state.providerServiceArea.defaultRadius = action.payload;
        // Save to AsyncStorage
        AsyncStorage.setItem('providerServiceArea', JSON.stringify(state.providerServiceArea));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loadServiceAreasFromStorage: (state, action: PayloadAction<ProviderServiceArea>) => {
      state.providerServiceArea = action.payload;
    },
  },
});

export const {
  setServiceAreas,
  addServiceArea,
  updateServiceArea,
  removeServiceArea,
  setDefaultRadius,
  setLoading,
  setError,
  loadServiceAreasFromStorage,
} = serviceAreaSlice.actions;

export default serviceAreaSlice.reducer; 