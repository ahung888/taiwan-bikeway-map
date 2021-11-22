import {createSlice} from '@reduxjs/toolkit';

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  },
  reducers: {
    setDevice(state, action) {
      const { width, height } = action.payload
      state.width = width
      state.height = height
      state.isMobile = width < 650
      state.isTablet = width >= 650 && width < 720
      state.isDesktop = width >= 720
    },
  }
})

export const {
  setDevice
} = deviceSlice.actions

export const selectDeviceAll = () => (state) => state?.[deviceSlice.name];
export const selectDevice = (id) => (state) => state?.[deviceSlice.name]?.[id];

export default deviceSlice.reducer