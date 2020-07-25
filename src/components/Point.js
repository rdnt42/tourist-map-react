import React, { useContext } from 'react'
import { Placemark } from 'react-yandex-maps';
import { MapContext } from '../context/mapContext'

function Point(placeMark) {

    const galleryState = useContext(MapContext);
    return (

        <Placemark onClick={() => galleryState.switchOnGallery(placeMark.id)}
            geometry={placeMark.geometry}
            options={placeMark.options}
            properties={placeMark.properties}
            modules={placeMark.modules}
        >
        </Placemark>
    )
}

export default Point
