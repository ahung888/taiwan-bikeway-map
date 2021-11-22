import {useState} from 'react';
import {LOCATIONS, AREAS} from '../store/filterOptions'

const CitySelectPanel = ({ onSubmit }) => {
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const renderedAreas = AREAS.map((area, idx) => {
    const handleAreaButtonClick = () => {
      setSelectedArea(idx)
      setSelectedLocation(null)
    }
    return (
      <div
        key={idx}
        className={`btn ${idx === selectedArea ? 'active' : ''}`}
        onClick={handleAreaButtonClick}
      >{area.name}</div>
    )
  })

  const locations = selectedArea !== null ? AREAS[selectedArea].locations : []
  const renderedLocations = locations.map((location, idx) => (
    <div
      key={idx}
      className={`btn ${location === selectedLocation ? 'active' : ''}`}
      onClick={() => handleLocationSelected(location)}
    >{LOCATIONS[location]}</div>
  ))

  const handleLocationSelected = (location) => {
    onSubmit(location)
    setSelectedLocation(null)
    setSelectedArea(null)
  }
  
  return (
    <div className="city-select-panel">
      <div>
        <div className="title">區域</div>
        <div className="collection">{renderedAreas}</div>
      </div>
      <div>
        <div className="title">縣市</div>
        <div className="collection">{renderedLocations}</div>
      </div>
    </div>
  )
}

export default CitySelectPanel