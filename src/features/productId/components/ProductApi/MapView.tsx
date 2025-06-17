"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function MapByPlace({ place }: { place: string }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,

    libraries: ["places"],
  });
  console.log(process.env.GOOGLE_API_KEY);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (!isLoaded || !place) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: place }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setPosition({ lat: location.lat(), lng: location.lng() });
      }
    });
  }, [isLoaded, place]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!position) return <div>위치 찾는 중...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={position}
      mapContainerStyle={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
}
