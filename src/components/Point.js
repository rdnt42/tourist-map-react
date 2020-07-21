import React from 'react'
import { Placemark } from 'react-yandex-maps';

function Point(placeMark) {
    function openGallery(id) {
        alert('Show object: ' + id)
    }
    return (
        <Placemark onClick={() => openGallery(placeMark.id)}
            geometry={placeMark.geometry}
            options={placeMark.options}
            properties={placeMark.properties}
            modules={placeMark.modules}
        ></Placemark>
    )
}

export default Point
