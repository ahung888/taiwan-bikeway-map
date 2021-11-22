import {createSlice} from '@reduxjs/toolkit';
import {fetchBikeAvailable, fetchAdditionalBikeAvailable} from './api/bikeAvailable'
import { parseEntitiesToIdArrayAndEntitiesDictionary } from '../utils/dataHelper'

export const bikeAvailableSlice = createSlice({
  name: 'bikeAvailable',
  initialState: {
    ids: [],
    entities: {},
    currentEntity: null,
    previousEntity: null,
    nextEntity: null,
    status: 'idle',
    error: '',
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBikeAvailable.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchBikeAvailable.fulfilled, (state, action) => {
        state.status = 'loaded'
        const { entities, ids } = parseEntitiesToIdArrayAndEntitiesDictionary(action.payload)
        state.entities = entities
        state.ids = ids
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

export const selectBikeAvailable = (id) => (state) => state?.[bikeAvailableSlice.name]?.[id];

export default bikeAvailableSlice.reducer