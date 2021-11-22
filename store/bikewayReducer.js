import {createSlice} from '@reduxjs/toolkit';
import {fetchCyclingShape, fetchAdditionalCyclingShape} from './api/cyclingShape'
import { parseEntitiesToIdArrayAndEntitiesDictionary } from '../utils/dataHelper'

export const bikewaySlice = createSlice({
  name: 'bikeway',
  initialState: {
    // ids: [],
    entities: {},
    selectedBikewayId: null,
    status: 'idle',
    error: '',
    splashMessage: null,
  },
  reducers: {
    setSelectedBikewayId(state, action) {
      state.selectedBikewayId = action.payload
    },
    empty(state, action) {
      state.entities = {}
      state.selectedBikewayId = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCyclingShape.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCyclingShape.fulfilled, (state, action) => {
        state.status = 'loaded'
        const { entities, ids } = parseEntitiesToIdArrayAndEntitiesDictionary(action.payload)
        state.entities = entities
        // state.ids = ids
        // state.popupInfo = null
      })
      .addCase(fetchCyclingShape.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message

        if (action.payload === 'search not found') {
          state.splashMessage = '查無資料'
        }
      })
  }
})

export const {
  setSelectedBikewayId,
  empty
} = bikewaySlice.actions

export const selectBikeway = (id) => (state) => state?.[bikewaySlice.name]?.[id];
export const selectSelectedBikeway = () => (state) => {
  const id = state?.[bikewaySlice.name]?.selectedBikewayId
  if (id === null) return null
  return state?.[bikewaySlice.name].entities[id]
}

export default bikewaySlice.reducer