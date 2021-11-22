export function getTags(data) {
  if (!data) return []
  const { City, Class1, Class2, Class3, Level } = data
  const tags = [City, Class1, Class2, Class3].reduce((stack, tag) => {
    return tag ? stack.concat(tag) : stack
  }, [])
  if (Level && Level !== '非古蹟') tags.push(`${Level}古蹟`)
  return tags
}

export function parseEntitiesToIdArrayAndEntitiesDictionary(entitiesArr = []) {
  let entities = {}, ids = []
  entitiesArr.map((entity, i) => {
    entities[i] = { ...entity, id: i }
    ids.push(i)
  })
  return { entities, ids }
}
export function parseBikeStation(entitiesArr = []) {
  let entities = {}, ids = []
  entitiesArr.map((entity, i) => {
    entities[entity.StationUID] = entity
    ids.push(entity.StationUID)
  })
  return { entities, ids }
}

export function parseStationDataToGeojson(stations) {
  return stations.map(station => {
    return {
      "type": "Feature",
      "properties": { ...station },
      "geometry": {
        "type": "Point",
        "coordinates": [
          station?.StationPosition?.PositionLon,
          station?.StationPosition?.PositionLat,
          0
        ]
      }
    }
  })
}