import { useRef } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

export default function EditMap({ radius, setRadius, position, setPosition }) {
    const forceRadius = (value) => {
        if (value < 5) {
            setRadius(5);
        } else if (value > 5000) {
            setRadius(5000);
        } else {
            setRadius(value);
        }
    }

    return (
        <div className='flex-grow-1 d-flex flex-column'>
            <div className="flex-grow-1 map-container border border-3 border-dark-subtle rounded-3 mb-4">
                <MapContainer style={{ height: "100%" }} center={position} zoom={16} scrollWheelZoom={true}>
                    <MapItems position={position} setPosition={setPosition} radius={radius} />
                </MapContainer>
            </div>
            <label htmlFor="radius" className="form-label fs-5 fw-semibold">Safe Zone Radius</label>
            <input type="range" min={5} max={5000} step={5} value={radius} onChange={(e) => forceRadius(e.target.value)} className="form-range" id="radius" />
            <div className="input-group my-4">
                <input type="number" min={5} max={5000} step={5} className="form-control text-center" value={radius} onChange={(e) => forceRadius(e.target.value)} />
                <span className="input-group-text" id="basic-addon2">Meters</span>
            </div>
        </div>
    )
};

function MapItems({ position, setPosition, radius }) {
    const map = useMap();
    const markerRef = useRef();

    const goToMarker = () => {
        const marker = markerRef.current;
        map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 16);
    }

    const selectMarkerPosition = () => {
        const marker = markerRef.current;
        setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        goToMarker();
    }

    return (
        <>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker ref={markerRef} position={position} draggable >

            </Marker>
            <Circle center={position} radius={radius} color='green' />
            <div className='map-btn-container rounded-3'>
                <button onClick={goToMarker} className='btn btn-sm safe-zone-btn me-1'>Go to Marker</button>
                <button onClick={selectMarkerPosition} className='btn btn-sm safe-zone-btn ms-1'>Select Marker Position</button>
            </div>
        </>
    );
}