import {createSlice} from '@reduxjs/toolkit';

export const SEARCH_TYPE = Object.freeze({
  BIKEWAY: 'BIKEWAY',
  STATION: 'STATION',
})
export const SEARCH_INFO = [
  { type: SEARCH_TYPE.BIKEWAY, name: '自行車道' },
  { type: SEARCH_TYPE.STATION, name: '自行車站' },
]
export const STATION_STATUS = {
  AvailableRent: '租借',
  AvailableReturn: '歸還',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    type: SEARCH_TYPE.BIKEWAY,
  },
  reducers: {
    setType(state, action) {
      if (SEARCH_TYPE[action.payload] !== undefined ) {
        state.type = action.payload
      }
    },
  }
})

export const {
  setType
} = searchSlice.actions

export const selectSearch = (id) => (state) => state?.[searchSlice.name]?.[id];

export default searchSlice.reducer