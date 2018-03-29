export const categories = [
  {
    name: 'Espresso & coffee',
    id: 1,
  },
  {
    name: 'Ice blended coffee',
    id: 2,
  },
  {
    name: 'Chocolate',
    id: 3,
  },
  {
    name: 'Special tea',
    id: 4,
  },
  {
    name: 'Smoothies',
    id: 5,
  }
];

export const googleConfig = {
  currentCountry: 'vn',
  defaultCenter: { lat: 21.027029, lng: 105.856645 },
  defaultZoom: 15,
  mapStyles: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }],
    },
  ],
};
