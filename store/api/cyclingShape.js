import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetAuthorizationHeader } from '../../utils/authorization'
import { emptyFunc, emptyAsyncAction } from './index'

const EntityLimit = 5000

const actions = {
  fetchCyclingShape: 'bikeway/fetchCyclingShape',
  fetchAdditionalCyclingShape: 'bikeway/fetchAdditionalCyclingShape',
}

export const fetchCyclingShape = createAsyncThunk(actions.fetchCyclingShape, async () => {})
export const fetchAdditionalCyclingShape = createAsyncThunk(actions.fetchAdditionalCyclingShape, async () => {})

export const apiBikeway = () => {

  let _url = ''
  let _city = ''
  let _gotPage = 0
  let _pageLimit = EntityLimit
  let _lastEntityCounts = EntityLimit
  let _isLoading = false
  
  const fetchFactory = (url, action = actions.fetchCyclingShape, resolve = emptyFunc, reject = emptyFunc) => {
    return createAsyncThunk(action, async (city, { rejectWithValue }) => {
      const response = await fetch(url, { headers: GetAuthorizationHeader() })
      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        resolve(data)
        return data
      }
      if (typeof data === 'object' && data.message !== undefined) {
        reject(data, data.message)
        return rejectWithValue(data.message)
      }
      if (data?.length === 0) {
        reject(data)
        return rejectWithValue('search not found')
      }
    
      reject(data)
      return rejectWithValue('something went wrong')
    })
  }
  
  const set = ({ city }) => {
    _reset()
    _city = city
  }

  const _reset = () => {
    _url = ''
    _city = ''
    _gotPage = 0
    _pageLimit = EntityLimit
    _lastEntityCounts = EntityLimit
  }

  const get = () => {
    if (_city && !_isLoading && hasMore()) {
      _isLoading = true
      const skip = _gotPage * _pageLimit
      const querySkip = skip === 0 ? '' : `&$skip=${ skip }`
      const action = _gotPage === 0 ? actions.fetchCyclingShape : actions.fetchAdditionalCyclingShape
      const url = `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${_city}?$top=${EntityLimit}${querySkip}&$format=JSON`
      return fetchFactory(url, action,
        (data) => {
          _lastEntityCounts = data.length
          _gotPage += 1
          _isLoading = false
        },
        (response, error) => {
          _lastEntityCounts = 0
          _isLoading = false
        })
    }
    return emptyAsyncAction
  }

  const hasMore = () => _lastEntityCounts === EntityLimit

  return {
    set,
    get,
    hasMore
  }
}
