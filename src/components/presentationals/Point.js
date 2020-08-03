import React, { useContext } from 'react'
import { Placemark } from 'react-yandex-maps';
import { MapContext } from '../../context/mapContext'

function Point(placeMark) {

    const mapContext = useContext(MapContext);

    function markClickHandler() {
        mapContext.mapDispatch({ type: 'SWITCH_ON_GALLERY', payload: placeMark.id })
    }
    return (
        <Placemark
            onClick={markClickHandler}
            geometry={placeMark.geometry}
            options={placeMark.options}
            properties={placeMark.properties}
            modules={placeMark.modules}
        >
        </Placemark>
    )
}

export default Point
