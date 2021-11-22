import {useEffect} from 'react';
import {useSelector} from 'react-redux'
import {selectSearch, SEARCH_TYPE} from '../store'
import {selectBikeway} from '../store/bikewayReducer'
import {selectBikeStation} from '../store/bikeStationReducer'
import ItemBikeway from './ItemBikeway'
import ItemStation from './ItemStation'

const ItemList = ({}) => {
  const searchType = useSelector(selectSearch('type'))
  const bikeways = useSelector(selectBikeway('entities'))
  const stations = useSelector(selectBikeStation('stations'))

  const handleScrolling = event => {
    // console.log(event)
  }

  let renderedItems = ''
  if (searchType === SEARCH_TYPE.BIKEWAY) {
    renderedItems = Object.values(bikeways).map((bikeway, i) => (
      <ItemBikeway key={i} data={bikeway} />
    ))
  } else if (searchType === SEARCH_TYPE.STATION) {
    renderedItems = Object.values(stations).map((station, i) => (
      <ItemStation key={i} data={station} />
    ))
  }

  return (
    <div className="item-list" onScroll={handleScrolling}>
      {renderedItems}
    </div>
  )
}

export default ItemList