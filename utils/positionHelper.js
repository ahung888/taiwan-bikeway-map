export function center(positions = []) {
  let center = { latitude: 0, longitude: 0 }

  if (positions.length > 0) {

    positions.map(pos => {
      center.latitude += pos?.Position?.PositionLat || 0
      center.longitude += pos?.Position?.PositionLon || 0
    })
    
    center.latitude /= positions.length
    center.longitude /= positions.length
  }

  return center
}

export const zoomLevel = {
  area: 8,
  spot: 14.5,
}

export function GeometryToCoordinates(geometry) {
  return geometry
    .substring(18, geometry.length-2)
    .split(',')
    .map(p => p.split(' ').map(pp => Number(pp)))
    .filter(pos => {
      if (isNaN(pos[0]) || isNaN(pos[1])) return false
      return true
    })
}