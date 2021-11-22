import { useSelector, useDispatch } from 'react-redux'
import {
} from '../store'
import {setSelectedBikewayId, selectBikeway} from '../store/bikewayReducer'
import {showPosition} from './Map'
import Card from './Card'
import {GeometryToCoordinates} from '../utils/positionHelper'
import {FiMapPin} from 'react-icons/fi'
import {BsFlag} from 'react-icons/bs'
import {FaRoute} from 'react-icons/fa'

const ItemBikeway = ({data}) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    let coordinates = GeometryToCoordinates(data.Geometry)
    showPosition({
      long: Number(coordinates[0][0]),
      lat: Number(coordinates[0][1]),
    })
    dispatch(setSelectedBikewayId(data.id))
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="title">{data.RouteName}</div>
      <div className="row">
        <div className="desc">{data.City}</div>
        <div className="desc">{data.Town}</div>
      </div>
      <div className="row">
        <div></div>
        <div className="desc">{data.AuthorityName}</div>
      </div>
      <div className="desc"><FiMapPin/> {data.RoadSectionStart}</div>
      <div className="desc"><BsFlag/> {data.RoadSectionEnd}</div>
      <div className="row">
        <div className="desc"><FaRoute/> {data.CyclingLength} 公尺</div>
        <div className="desc">{data.Direction}</div>
      </div>
    </div>
  )
}

export default ItemBikeway