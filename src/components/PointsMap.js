import React, { Component } from 'react'
import styles from './point.module.css';
import { YMaps, Map } from 'react-yandex-maps';
import PointsList from './PointsList';
import Gallery from './Gallery';
import AliceGallery from './AliceGallery';
import { MapProvider } from '../context/mapContext'
import points from '../points.json'

const mapData = {
    center: [55.669535, 36.712811],
    zoom: 13,
};
class PointsMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowGallery: false,
            switchOffGallery: this.switchOffGallery,
            switchOnGallery: this.switchOnGallery,
            images: []
        }
    }

    switchOffGallery = () => {
        this.setState({
            isShowGallery: false
        })
    }

    switchOnGallery = (placeMarkId) => {
        console.log("placeMarkId ", placeMarkId)
        //FIXME изменить метод получения массива изображений
        var pointsUrls = [{
            original: "",
            thumbnail: ""
        }]
        points.map(point => {
            if (point.id == placeMarkId) {
                if (point.urls != undefined)
                    pointsUrls = point.urls;

                return true;
            }

        })

        this.setState({
            isShowGallery: true,
            images: pointsUrls
        }, () => {
            console.log(this.state.images)
        })
    }

    render() {
        return (
            <MapProvider value={this.state}>
                < YMaps >
                    <Map defaultState={mapData} className={styles['point-map']}>
                        <PointsList></PointsList>
                    </Map>
                </YMaps >
                <Gallery></Gallery>
            </MapProvider>
            // <AliceGallery></AliceGallery>

        )
    }
}


export default PointsMap
