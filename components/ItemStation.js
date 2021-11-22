import { useSelector, useDispatch } from 'react-redux'
import {
} from '../store'
import Card from './Card'
import {showPosition} from './Map'
import {setSelectedStationUID, selectBikeStation} from '../store/bikeStationReducer'
import {AiOutlineDownload, AiOutlineUpload} from 'react-icons/ai'

const ItemStation = ({data}) => {
  const dispatch = useDispatch()
  const selectedStationUID = useSelector(selectBikeStation('selectedStationUID'))

  const serviceType = type => {
    if (type === 1) return 'YouBike1.0'
    else if (type === 2) return 'YouBike2.0'
    else return ''
  }

  const serviceStatus = status => {
    if (status === 0) return '停止營運'
    else if (status === 1) return '正常營運'
    else if (status === 2) return '暫停營運'
    else return ''
  }

  const handleClick = () => {
    if (data?.StationPosition?.PositionLon && data?.StationPosition?.PositionLat) {
      showPosition({
        long: data?.StationPosition?.PositionLon,
        lat: data?.StationPosition?.PositionLat,
      })
      dispatch(setSelectedStationUID(data.StationUID))
    }
  }

  const className = `card ${selectedStationUID === data.StationUID ? 'active' : ''}`

  return (
    <div className={className} onClick={handleClick}>
      <div className="title">{data?.StationName?.Zh_tw}</div>
      <div className="desc">{data?.StationAddress?.Zh_tw}</div>
      {/* <div className="desc">{data?.BikesCapacity}</div> */}
      <div className="desc">{serviceStatus(data?.ServiceStatus)}</div>
      <div className="desc">{serviceType(data?.ServiceType)}</div>
      <div className="row">
        <div className="desc"><AiOutlineUpload/> 可租借 <span className="rent">{data?.AvailableRentBikes} 輛</span></div>
        <div className="desc"><AiOutlineDownload/> 可歸還 <span className="return">{data?.AvailableReturnBikes} 輛</span></div>
      </div>
    </div>
  )
}

export default ItemStation