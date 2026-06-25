import React, { useMemo, useState, useRef } from "react"
import Leaflet from "leaflet"
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import iconRetina from "leaflet/dist/images/marker-icon-2x.png"
import "./style.scss"
import { TextField, Grid } from "@mui/material"

function MapComp({ coords, setDataAddress, mainAddress }) {
  let DefaultIcon = Leaflet.icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
  })
  Leaflet.Marker.prototype.options.icon = DefaultIcon

  function SetViewOnClick({ coords }) {
    const map = useMap()
    map.setView([coords.fullAddress.lat, coords.fullAddress.lng], map.getZoom())

    return null
  }
  function DraggableMarker({ coords }) {
    const [position, setPosition] = useState(
      coords.fullAddress.lat,
      coords.fullAddress.lng
    )
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        click(event) {
          setPosition(event.latlng)
        },
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      []
    )

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={[coords.fullAddress.long, coords.fullAddress.lat]}
        ref={markerRef}
      ></Marker>
    )
  }
  function LocationMarker() {
    const [position, setPosition] = useState({
      latitude: coords.fullAddress.lat,
      longitude: coords.fullAddress.lng,
    })

    const map = useMapEvents({
      click(e) {
  
        const { lat, lng } = e.latlng
        setPosition({
          latitude: lat,
          longitude: lng,
        })
        setDataAddress({
          sectionId: coords.sectionId,
          cityId:coords.cityId,
          provinceId:coords.provinceId,
          fullAddress: { ...coords.fullAddress, lat: lat, lng: lng },
        })

        map.locate()
      },
      locationfound(e) {
        const { lat, lng } = e.latlng
        setPosition({
          latitude: lat,
          longitude: lng,
        })

        map.flyTo(e.latlng, 11)
      },
    })

    return position.latitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
      />
    ) : null
  }
  function onChangeAddress (evt) {
    setDataAddress({
      sectionId: coords.sectionId,
      cityId:coords.cityId,
      provinceId:coords.provinceId,
      fullAddress: { ...coords.fullAddress, mainAddress:secondAddress + evt.target.value },
    })
  }
  const  secondAddress =
     coords.fullAddress.pro +
    "-" +
    coords.fullAddress.cit +
    "-" +
    coords.fullAddress.sec +
    ":"
  
  return (
    <>
      <Grid container item spacing={4} alignItems={'center'}>
        <Grid item xs={6}>
        {secondAddress}
          <TextField
            className="mt-3"
            name="fullAddress"
            multiline={true}
            rows={4}
           
            fullWidth={true}
            label="آدرس را کامل وارد کنید"
            type="text"
            size="small"
            required
            defaultValue={mainAddress}
           onChange={onChangeAddress}

          />
        </Grid>
        <Grid item xs={6}>
          <MapContainer
            style = {{width:'100%'}}
            center={[coords.fullAddress.lat, coords.fullAddress.lng]}
            zoom={11}
            scrollWheelZoom={true}
            clickable={true}
          >
            <TileLayer
              attribution='<a href="http://kurdnezambargh.ir">electUnit</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {/* <DraggableMarker  coords={coords} /> */}

            <SetViewOnClick coords={coords} />
          </MapContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default MapComp
