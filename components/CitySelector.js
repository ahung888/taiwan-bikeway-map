import {useState, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DropdownGroup from './DropdownGroup'
import CitySelectPanel from './CitySelectPanel'
import {
  selectSearch,
  SEARCH_TYPE,
  emptyBikeway,
  emptyStation
} from '../store'
import {LOCATIONS} from '../store/filterOptions'
import { ApiContext, API_TYPES } from '../store/api'

const CitySelector = () => {
  const dispatch = useDispatch()
  const api = useContext(ApiContext)
  const [showPanel, setShowPanel] = useState(false)
  const [buttonName, setButtonName] = useState("縣市")
  const searchType = useSelector(selectSearch('type'))

  const handleCitySelected = (city) => {
    if (LOCATIONS[city] !== undefined) {
      setButtonName(LOCATIONS[city])
      setShowPanel(false)

      dispatch(emptyBikeway())
      dispatch(emptyStation())

      if (searchType === SEARCH_TYPE.BIKEWAY) {
        api.set(API_TYPES.BIKEWAY, { city: city })
        dispatch(api.get()())
      } else if (searchType === SEARCH_TYPE.STATION) {
        api.set(API_TYPES.BIKE_STATION, { city: city })
        dispatch(api.get()())
        api.set(API_TYPES.BIKE_AVAILABLE, { city: city })
        dispatch(api.get()())
      } 
    }
  }

  return (
    <>
      <DropdownGroup
        name={buttonName}
        showPanel={showPanel}
        onClick={() => setShowPanel(!showPanel)}
      >
        <CitySelectPanel onSubmit={(city) => handleCitySelected(city)} />
      </DropdownGroup>
    </>
  )
}

export default CitySelector