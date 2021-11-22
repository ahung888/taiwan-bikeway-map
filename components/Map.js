import React, { useState, useEffect, useRef, useCallback } from 'react';
import MapGL, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer
} from 'react-map-gl';
import StationPins from './StationPins'
import { HOME_POS } from '../store/position'
import {clusterLayer, clusterCountLayer, routeLayer} from './layers';
import {useSelector} from 'react-redux'
import {selectDevice, selectSearch} from '../store'
import {selectSelectedBikeway} from '../store/bikewayReducer'
import {selectBikeStation} from '../store/bikeStationReducer'
import {parseStationDataToGeojson} from '../utils/dataHelper'
import {zoomLevel, GeometryToCoordinates} from '../utils/positionHelper'

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const Map = () => {
  const refMap = useRef(null)
  const [viewport, setViewport] = useState({
    latitude: HOME_POS.TAIWAN[0],
    longitude: HOME_POS.TAIWAN[1],
    zoom: 7,
    bearing: 0,
    pitch: 0
  });
  const isMobile = useSelector(selectDevice('isMobile'))
  const selectedBikeway = useSelector(selectSelectedBikeway())
  const stations = useSelector(selectBikeStation('stations'))
  const offsetLongitude = isMobile ? -0.015 : 0;

  const handleOnViewportChange = (viewport) => {
    const {width, height, ...etc} = viewport
    setViewport(etc)
  }

  useEffect(() => {
    const map = refMap.current.getMap()
    const features = map.features
    // let s = map.getSource('earthquakes')
    map.loadImage(
      'http://localhost:3000/taiwan-bikeway-map/20210517-01.jpg',
      (error, image) => {
        if (error) throw error
        map.addImage('cat', image)
      }
    )
    // animation.start()
  }, [refMap])

  useEffect(() => {
    if (typeof document !== undefined) {
      document.addEventListener('flytospot', flyToPosition)
      return () => document.removeEventListener('flytospot', flyToPosition)
    }
  }, [])

  const flyToPosition = (({ position }) => {
    if (position === undefined) return

    const { long = 0, lat = 0 } = position
    if (long === 0 || lat === 0) return

    setViewport({
      latitude: lat,
      longitude: long + offsetLongitude,
      zoom: Math.max(viewport.zoom, zoomLevel.spot),
      // transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      // transitionDuration: 'auto'
    })

    // dispatch(setPopupInfo(entity))
  }).bind(viewport)
  
  const onClick = event => {
    const feature = event.features[0];
    // setViewport(new WebMercatorViewport({width: 800, height: 600})
    //   .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
    //     padding: 20,
    //     offset: [0, -100]
    // }))
  }

  const geolocateControlStyle= {
    right: 7,
    bottom: 135
  };
  const navControlStyle= {
    right: 7,
    bottom: 40
  };
  const scaleControlStyle= {
    right: 50,
    bottom: 10
  };

  const stationGeojson = parseStationDataToGeojson(Object.values(stations))
  let bikewayData = {}
  if (selectedBikeway) {
    console.log('selectedBikeway: ', selectedBikeway)
    let coordinates = GeometryToCoordinates(selectedBikeway.Geometry)
    console.log('coordinates: ', coordinates)
    bikewayData = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': coordinates
          }
        }
      ]
    }
    // flyToPosition({ position: { long: coordinates[0][0], lat: coordinates[0][1] }})
  }

  return (
    <div className="map">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => handleOnViewportChange(viewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={refMap}
        onClick={onClick}
      >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto
        />
        <NavigationControl style={navControlStyle} />
        {/* <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} /> */}
        
        <StationPins geojson={stationGeojson} />

        <Source 
          id="bikeway"
          type="geojson"
          data={bikewayData}
        >
          <Layer {...routeLayer} />
        </Source>
      </MapGL>
    </div>
  )
}

export default Map

export const showPosition = (position) => {
  let event = new Event("flytospot")
  event.position = position
  document.dispatchEvent(event)
}