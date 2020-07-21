import React, { Component } from 'react'
import styles from './point.module.css';
import { YMaps, Map } from 'react-yandex-maps';
import PointsList from './PointsList';
import Gallery from './Gallery';

const mapData = {
    center: [55.669535, 36.712811],
    zoom: 13,
};
class PointsMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowGallery: true
        }
    }

    switchOffGallery = () => {
        this.setState({
            isShowGallery: false
        })
    }

    render() {
        return (
            <div>
                < YMaps >
                    <Map defaultState={mapData} className={styles['point-map']}>
                        <PointsList></PointsList>
                    </Map>
                </YMaps >
                <Gallery isShowGallery={this.state.isShowGallery} swithcHandler={this.switchOffGallery}></Gallery>
            </div>

        )
    }
}


export default PointsMap
