import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { usePatientContextState } from 'pages/home/PatientHook';
import { useEffect, useMemo, useState } from 'react';
import "leaflet.motion/dist/leaflet.motion";
import { getCardColor } from 'utils/utils';

export default function PatientLocation() {
    const { getCurrentPatient, setPrevLocation } = usePatientContextState();
    const patient = getCurrentPatient();
    const [currentMarker, setCurrentMarker] = useState(null);

    useEffect(() => {
        return () => {
            setPrevLocation({});
        };
    }, [setPrevLocation]);

    if (!patient.location) {
        return <div className='d-flex flex-column h-100 text-center fs-1 justify-content-center align-items-center'>
            No location data available.
            <span className='fs-5 mt-3'>
                Please configure {patient.first_name} {patient.last_name}{"'s"} WanderTracker with their{" "}
                <a className="cert-link" target="_blank" href={patient.presigned_url}>device certificates</a>.
            </span>
        </div>
    }

    const position = {
        "lat": patient.location && patient.location.lat,
        "lng": patient.location && patient.location.lng
    }

    return (
        <MapContainer style={{ height: "100%" }} center={position} zoom={16} scrollWheelZoom={true}>
            <MapItems position={position} patient={patient} currentMarker={currentMarker} setCurrentMarker={setCurrentMarker} />
        </MapContainer>
    )
};

function MapItems({ position, patient, currentMarker, setCurrentMarker }) {
    const map = useMap();
    const { prevLocation, setPrevLocation } = usePatientContextState();
    const color = getCardColor(patient.status);
    const safeZoneLocation = useMemo(() => [patient.safe_zone_location.lat, patient.safe_zone_location.lng], [patient.safe_zone_location]);

    useEffect(() => {
        if (prevLocation.lat && prevLocation.lng && (prevLocation.lat !== position.lat || prevLocation.lng !== position.lng)) {
            L.motion.polyline(
                [prevLocation, position],
                { color: color },
                {
                    auto: true,
                    duration: 500,
                },
                {
                    showMarker: true,
                    removeOnEnd: true
                }
            ).addTo(map);

            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            const newMarker = L.marker(position).addTo(map);
            setCurrentMarker(newMarker);
            setPrevLocation(position);

        } else if (!currentMarker || (currentMarker.getLatLng().lat !== position.lat || currentMarker.getLatLng().lng !== position.lng)) {
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            const newMarker = L.marker(position).addTo(map);
            setCurrentMarker(newMarker);
            setPrevLocation(position);
        }
    }, [position, prevLocation, map, color, currentMarker, setPrevLocation, setCurrentMarker]);

    const goToSafeZone = () => {
        map.setView(safeZoneLocation, 16);
    }

    const goToPatient = () => {
        map.setView(position, 16);
    }

    // edit the circle to be a circle instead of an ellipse
    // L.Circle.include({
    //     _getLngRadius: function () {
    //         return this._getLatRadius();
    //     }
    // });

    return (
        <>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Circle center={safeZoneLocation} radius={patient.safe_zone_radius} color='green' />
            <div className='map-btn-container rounded-3'>
                <button onClick={goToSafeZone} className='btn btn-sm me-1 safe-zone-btn'>Go to Safe Zone</button>
                <button onClick={goToPatient} className='btn btn-sm ms-1 patient-btn'>Go to Patient</button>
            </div>
        </>
    );
}