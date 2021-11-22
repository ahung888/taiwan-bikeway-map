export {setDevice, selectDevice, selectDeviceAll} from './deviceReducer'
export {
  SEARCH_TYPE,
  SEARCH_INFO,
  STATION_STATUS,
  setType as setSearchType,
  selectSearch
} from './searchReducer'
export {empty as emptyBikeway} from './bikewayReducer'
export {empty as emptyStation} from './bikeStationReducer'

import {configureStore} from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper'
import deviceReducer from './deviceReducer'
import searchReducer from './searchReducer'
import bikewayReducer from './bikewayReducer'
import bikeStationReducer from './bikeStationReducer'

const makeStore = () =>
  configureStore({
    reducer: {
      device: deviceReducer,
      search: searchReducer,
      bikeway: bikewayReducer,
      bikeStation: bikeStationReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
