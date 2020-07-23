import React from 'react'
import { Placemark } from 'react-yandex-maps';
import { MapConsumer } from '../context/mapContext'

function Point(placeMark) {
    // function openGallery(id) {
    //     alert('Show object: ' + id)
    // }
    return (
        <MapConsumer>
            {
                (val) => {
                    return (
                        <Placemark onClick={() => val.switchOnGallery(placeMark.id)}
                            geometry={placeMark.geometry}
                            options={placeMark.options}
                            properties={placeMark.properties}
                            modules={placeMark.modules}
                        >
                        </Placemark>
                    )
                }
            }
        </MapConsumer>

    )
}

export default Point
