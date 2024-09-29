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
  
  type TLocation = {
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
    iconBackgroundColor: string;
    displayName: TDisplayName;
    primaryTypeDisplayName: TDisplayName;
    currentOpeningHours: TOpeningHours;
    primaryType: string;
    shortFormattedAddress: string;
    reviews: TReview[];
    photos: TPhoto[];
  };