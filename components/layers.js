const zoomThreshold = 15

export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'stations',
  filter: ['has', 'point_count'],
  maxzoom: zoomThreshold,
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'stations',
  filter: ['has', 'point_count'],
  maxzoom: zoomThreshold,
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'stations',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

export const routeLayer = {
  id: 'bikeway',
  source: 'bikeway',
  type: 'line',
  paint: {
    'line-width': 10,
    'line-color': '#007cbf'
  }
}