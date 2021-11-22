import { createContext } from 'react'
export {
  fetchCyclingShape,
  fetchAdditionalCyclingShape
} from './cyclingShape'
export {
  fetchBikeStation,
  fetchAdditionalBikeStation
} from './bikeStation'
export {
  fetchBikeAvailable,
  fetchAdditionalBikeAvailable
} from './bikeAvailable'

import { apiBikeway } from './cyclingShape'
import { apiBikeStation } from './bikeStation'
import { apiBikeAvailable } from './bikeAvailable'

export const ApiContext = createContext()

export const API_TYPES = Object.freeze({
  BIKEWAY: 1,
  BIKE_STATION: 2,
  BIKE_AVAILABLE: 3,
})

export const createApi = () => {
  
  let _type = null

  const apis = {
    [API_TYPES.BIKEWAY]: apiBikeway(),
    [API_TYPES.BIKE_STATION]: apiBikeStation(),
    [API_TYPES.BIKE_AVAILABLE]: apiBikeAvailable(),
  }

  const set = (type = API_TYPES.spotCity, options = {}) => {
    _type = type
    if (_type in apis) {
      return apis[_type].set(options)
    }
  }
  
  const get = () => {
    if (_type in apis) {
      return apis[_type].get()
    }
  }
  
  const hasMore = () => {
    if (_type in apis) {
      return apis[_type].hasMore()
    }
  }
  
  return {
    set,
    get,
    hasMore
  }
}

export const emptyFunc = () => {}
export const emptyAsyncAction =  () => () => () => {}