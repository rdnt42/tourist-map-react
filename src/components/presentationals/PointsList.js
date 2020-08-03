import React from 'react';
import Point from './Point'

function PointsList(props) {
    const pointsList = props.points.map(point => <Point key={point.id} {...point}></Point>)

    return (
        <div>{pointsList}</div>
    )
}

export default PointsList;