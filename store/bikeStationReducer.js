import {createSlice} from '@reduxjs/toolkit';
import {fetchBikeStation, fetchAdditionalBikeStation} from './api/bikeStation'
import {fetchBikeAvailable, fetchAdditionalBikeAvailable} from './api/bikeAvailable'

export const bikeStationSlice = createSlice({
  name: 'bikeStation',
  initialState: {
    stations: {},
    stationsCount: 0,
    selectedStationUID: null,
    showAvailableRent: true,
    status: 'idle',
    error: '',
    splashMessage: null,
  },
  reducers: {
    setSelectedStationUID(state, action) {
      state.selectedStationUID = action.payload
    },
    setShowAvailableRent(state, action) {
      state.showAvailableRent = action.payload
    },
    empty(state, action) {
      state.stations = {}
      state.stationsCount = 0
      state.selectedStationUID = null
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchBikeStation.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchBikeStation.fulfilled, (state, action) => {
      state.status = 'loaded'
      action.payload.map(entity => {
        if (state.stations[entity.StationUID] === undefined) {
          state.stations[entity.StationUID] = entity
        } else {
          state.stations[entity.StationUID] = { ...state.stations[entity.StationUID], ...entity }
        }
      })
      state.stationsCount = Object.keys(state.stations).length
    })
    .addCase(fetchBikeStation.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message

      if (action.payload === 'search not found') {
        state.splashMessage = '查無資料'
      }
    })
    .addCase(fetchBikeAvailable.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchBikeAvailable.fulfilled, (state, action) => {
      state.status = 'loaded'
      action.payload.map(entity => {
        if (state.stations[entity.StationUID] === undefined) {
          state.stations[entity.StationUID] = entity
        } else {
          state.stations[entity.StationUID] = { ...state.stations[entity.StationUID], ...entity }
        }
      })
      state.stationsCount = Object.keys(state.stations).length
    })
    .addCase(fetchBikeAvailable.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message

      if (action.payload === 'search not found') {
        state.splashMessage = '查無資料'
      }
    })
  }
})

export const {
  setSelectedStationUID,
  setShowAvailableRent,
  empty
} = bikeStationSlice.actions

export const selectBikeStation = (id) => (state) => state?.[bikeStationSlice.name]?.[id];

export default bikeStationSlice.reducer