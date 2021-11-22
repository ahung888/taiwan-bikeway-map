import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Marker, MapContext} from 'react-map-gl'
import {MdDirectionsBike} from 'react-icons/md'
import styles from '../styles/map.module.css'
import {setSelectedStationUID, selectBikeStation} from '../store/bikeStationReducer'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 60;
const ICON_SIZE = 120;

const StationPins = (props) => {
  const dispatch = useDispatch()
  // const [showAvailableRent, setShowAvailableRent] = useState(true)
  const selectedStationUID = useSelector(selectBikeStation('selectedStationUID'))
  const showAvailableRent = useSelector(selectBikeStation('showAvailableRent'))
  const mapContext = useContext(MapContext)
  const { geojson } = props

  const onClick = (geo) => {
    if (geo?.properties?.StationUID) {
      dispatch(setSelectedStationUID(geo?.properties?.StationUID))
    }
  }

  return mapContext.viewport.zoom > 14
  ? geojson.map((geo, i) => {

    const renderedNumber = showAvailableRent ? geo?.properties?.AvailableRentBikes : geo?.properties?.AvailableReturnBikes
    const isSelected = selectedStationUID === geo?.properties?.StationUID ? true : false
    const classname = `marker ${isSelected ? 'active' : ''}`
    const pinSize = isSelected ? 80 : 60
    const pinColor = showAvailableRent ? '#f8b230' : '#f36969'
    const iconFontSize = isSelected ? "14px" : "10px"
    const iconTransform = isSelected ? "translate(-87px, -86px)" : "translate(-66px, -65px)"
    
    return (
      <Marker
        key={i}
        className={classname}
        longitude={geo.geometry.coordinates[0]}
        latitude={geo.geometry.coordinates[1]}
      >
        <svg
          height={pinSize}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: pinColor,
            stroke: 'none',
            transform: `translate(${-pinSize / 2}px,${-pinSize}px)`
          }}
          onClick={() => onClick(geo)}
        >
          <path d={ICON} />
          <circle cx="12" cy="10" r="7" fill="#fff" />
          <text x="50%" y="50%" style={{ "font-size": '10px', fill: '#000', transform: `translate(-6px, 1px)` }}>
            {renderedNumber}
          </text>
        </svg>
        <MdDirectionsBike
          style={{
            "font-size": iconFontSize,
            color: "#fff",
            transform: iconTransform,
          }}
        />
      </Marker>
    )
  })
  : ''
}

export default React.memo(StationPins)