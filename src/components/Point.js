import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './Point.css';

const mapData = {
    center: [55.669535, 36.712811],
    zoom: 15,
};

// const coordinates = [
//     [mapData.center[0], mapData.center[1]],
//     [57.684758, 39.738521]
// ];



var placeMark = {
    geometry: [mapData.center[0], mapData.center[1]],
    options: {
        preset: 'islands#bluePoolIcon',
        iconColor: '#3caa3c',
    },
    properties: {
        hintContent: 'Кликните, чтобы посмотреть описание',
        balloonContent: '<a href="https://yandex.ru/maps/213/moscow/?ll=37.622504%2C55.753215&z=10" target="_blank">Как добраться</a>  <br />'
            + '<a>Болото сима, делает фьюр-фьюрк. <br />Мелкое, классное, твое.</a> '
    },
    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']


}
// balloonContent: "Москва" ,
// hintContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />'




const Point = (props) => (
    <YMaps >
        <Map defaultState={mapData} className="Point-map">
            <Placemark {...placeMark}></Placemark>
            {/* {coordinates.map(coordinate => <Placemark geometry={coordinate} properties={placemark} />)} */}
        </Map>
    </YMaps>
);

export default Point;