import React, { useState, useEffect } from 'react';
import Point from './Point'
import axios from 'axios'
import config from '../config'
// import jpoints from '../points.json'

function PointsList(props) {

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
        axios.get('http://' + config.address + ':' + config.port + '/getPoints')
            .then(response => {
                const data = parseResponse(response.data);
                setPoints(data);
                console.log("Points list Get data from server: OK")
            })
            .catch(error => {
                alert("Не удалось связаться с сервером для получения данных")
                throw error;
            })
    }, [])

    const pointsList = points.map(point => <Point key={point.id} {...point}></Point>)
    // console.log('points ', points)

    return (

        <div>{pointsList}</div>
    )
}

export default PointsList;