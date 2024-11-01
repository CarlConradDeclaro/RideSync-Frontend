import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; 
import DestMarker from '../../../assets/location.png'


const Components = ({
    selectedPositionDest ,
    mapRef,
    selectedPosition ,
    customIcon 
}) => {
  return (
    <div className='flex flex-col  w-full    '>
      
       <div className='ml-3 mr-3 mt-3'>
            <MapContainer
                center={selectedPositionDest ? [selectedPositionDest.lat, selectedPositionDest.lon] : [51.505, -0.09]} // Default center
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '450px'  }}
                ref={mapRef}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    />
                {selectedPositionDest && (
                  <Marker
                   position={[selectedPositionDest.lat, selectedPositionDest.lon]}
                   icon={customIcon(DestMarker)}
                  >
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                {selectedPosition && (
                  <Marker
                  position={[selectedPosition.lat, selectedPosition.lon]}
                   
                  >
                    <Popup>{selectedPosition.display_name}</Popup>
                  </Marker>              
                )}
      </MapContainer>
       </div>
    </div>
  )
}

export default Components
