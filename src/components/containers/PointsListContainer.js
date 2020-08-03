import React, { useState, useEffect } from 'react';
import axios from 'axios'
import config from '../../config'
import PointsList from '../presentationals/PointsList';

function PointsListContainer(props) {

    const [points, setPoints] = useState([]);

    function parseResponse(listData) {

        const result = listData.map(data => {
            return ({
                id: data.id_point,
                geometry: [
                    data.latitude,
                    data.longitude
                ],
                options: {
                    preset: data.preset,
                    iconColor: data.iconColor
                },
                modules: [
                    "geoObject.addon.balloon",
                    "geoObject.addon.hint"
                ],
            })
        })

        //console.log(result)
        return result;
    }

    useEffect(() => {
        axios.get(`http://${config.address}:${config.port}/getPoints`)
            .then(response => {
                const data = parseResponse(response.data);
                setPoints(data);
                console.log(`Points list Get data from server: OK. Items: ${data.length}`)
            })
            .catch(error => {
                alert("Не удалось связаться с сервером для получения данных")
                throw error;
            })
    }, [])

    return (
        <PointsList points={points} />
    )
}

export default PointsListContainer;