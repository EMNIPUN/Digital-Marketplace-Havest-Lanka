import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const DeliveryMap = () => {
  const mapCenter = {
    lat: 7.8674,  // Dambulla coordinates
    lng: 80.6510
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Live Vehicle Tracking</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerClassName="w-full h-full rounded-lg"
          center={mapCenter}
          zoom={13}
        >
          {/* Add markers for vehicles here */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DeliveryMap; 