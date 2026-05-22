"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { VENUE_LNG_LAT } from "@/lib/venue-location"

const DESTINATION = VENUE_LNG_LAT

function whenStyleReady(map: mapboxgl.Map, fn: () => void) {
  if (map.isStyleLoaded()) fn()
  else map.once("load", fn)
}

export default function VenueMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || !mapContainer.current) return

    mapboxgl.accessToken = token

    let unmounted = false
    let interactionListenersRemoved = false

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: DESTINATION,
      zoom: 17,
    })
    map.current = mapInstance

    new mapboxgl.Marker({ color: "#E24B4A" })
      .setLngLat(DESTINATION)
      .setPopup(
        new mapboxgl.Popup().setText(
          "Suite D2, enter under the 2nd-floor overhang"
        )
      )
      .addTo(mapInstance)

    const removeInteractionListeners = () => {
      if (interactionListenersRemoved) return
      interactionListenersRemoved = true
      mapInstance.off("click", onFirstMapGesture)
      mapInstance.off("dragend", onFirstMapGesture)
    }

    const runGeolocationFlow = () => {
      if (!navigator.geolocation) return

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (unmounted) return
          const m = map.current
          if (!m) return

          const user: [number, number] = [
            pos.coords.longitude,
            pos.coords.latitude,
          ]

          const applyUserRoute = () => {
            if (unmounted || !map.current) return

            new mapboxgl.Marker({ color: "#185FA5" })
              .setLngLat(user)
              .addTo(map.current)

            fetch(
              `https://api.mapbox.com/directions/v5/mapbox/walking/${user[0]},${user[1]};${DESTINATION[0]},${DESTINATION[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
            )
              .then((r) => r.json())
              .then((data) => {
                if (unmounted || !map.current) return
                const route = data.routes?.[0]?.geometry
                if (!route) return
                if (map.current.getSource("route")) return

                map.current.addSource("route", {
                  type: "geojson",
                  data: { type: "Feature", geometry: route, properties: {} },
                })
                map.current.addLayer({
                  id: "route",
                  type: "line",
                  source: "route",
                  paint: {
                    "line-color": "#185FA5",
                    "line-width": 4,
                    "line-opacity": 0.8,
                  },
                })
              })
          }

          whenStyleReady(m, applyUserRoute)
        },
        () => {
          /* geolocation denied or unavailable */
        }
      )
    }

    function onFirstMapGesture() {
      removeInteractionListeners()
      runGeolocationFlow()
    }

    mapInstance.on("click", onFirstMapGesture)
    mapInstance.on("dragend", onFirstMapGesture)

    return () => {
      unmounted = true
      removeInteractionListeners()
      mapInstance.remove()
      map.current = null
    }
  }, [])

  return (
    <div
      ref={mapContainer}
      className="h-[min(52dvh,420px)] max-w-full min-w-0 overflow-hidden sm:h-[min(48dvh,460px)] md:h-[480px] lg:h-[500px]"
    />
  )
}
