import { type } from "os";

type TAddressComponent = {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
};

type TPlusCode = {
  globalCode: string;
  compoundCode: string;
};

export type TLocation = {
  latitude: number;
  longitude: number;
};

type TViewport = {
  low: TLocation;
  high: TLocation;
};

type TPeriod = {
  open: {
    day: number;
    hour: number;
    minute: number;
    truncated?: boolean;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
  close?: {
    day: number;
    hour: number;
    minute: number;
    truncated?: boolean;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
};

type TOpeningHours = {
  openNow: boolean;
  periods: TPeriod[];
  weekdayDescriptions: string[];
};

type TDisplayName = {
  text: string;
  languageCode: string;
};

type TReview = {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: string;
  };
  originalText: {
    text: string;
    languageCode: string;
  };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
};

type TPhoto = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: {
    displayName: string;
    uri: string;
    photoUri: string;
  }[];
};

type TAccessibility = {
  wheelchairAccessibleParking?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  wheelchairAccessibleRestroom?: boolean;
  wheelchairAccessibleSeating?: boolean;
};

export type TPlace = {
  name: string;
  id: string;
  types: string[];
  nationalPhoneNumber: string;
  internationalPhoneNumber: string;
  formattedAddress: string;
  addressComponents: TAddressComponent[];
  plusCode: TPlusCode;
  location: TLocation;
  viewport: TViewport;
  rating: number;
  googleMapsUri: string;
  regularOpeningHours: TOpeningHours;
  utcOffsetMinutes: number;
  adrFormatAddress: string;
  businessStatus: string;
  userRatingCount: number;
  iconMaskBaseUri: string;
  iconBackgroundColor?: string;
  displayName: TDisplayName;
  primaryTypeDisplayName?: TDisplayName;
  currentOpeningHours?: TOpeningHours;
  primaryType: string;
  shortFormattedAddress?: string;
  reviews?: TReview[];
  photos?: TPhoto[];
  accessibilityOptions?: TAccessibility;
};

type TGeoCodingAddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type TLatLng = {
  lat: number;
  lng: number;
};

type TGeometry = {
  bounds: {
    northeast: TLatLng;
    southwest: TLatLng;
  };
  location: TLatLng;
  location_type: string;
  viewport: {
    northeast: TLatLng;
    southwest: TLatLng;
  };
};

export type TGeocodingPlace = {
  address_components: TGeoCodingAddressComponent[];
  formatted_address: string;
  geometry: TGeometry;
  place_id: string;
  types: string[];
};

export type TOSMNeighbourhoods = {
  type: "node";
  id: number;
  lat: number;
  lon: number;
};

type GeoJSONCoordinates = [number, number];

type Geometry = {
  type: "LineString"; // Or any other geometry type you may use
  coordinates: GeoJSONCoordinates[];
};

type GeometryCollection = {
  type: "GeometryCollection";
  geometries: Geometry[];
};

export type TNeighbourhoodPolygon = {
  type: "item";
  id: number;
  geometry: GeometryCollection;
};
