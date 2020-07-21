import React from 'react';
import Point from './Point'
import points from '../points.json'

function PointsList(props) {
    const pointsList = points.map(point => <Point key={point.id} {...point}></Point>)

    return (
        <div>{pointsList}</div>
    )
}

export default PointsList;