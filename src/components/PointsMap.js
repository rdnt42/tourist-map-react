import React, { useReducer } from 'react'
import styles from './point.module.css';
import { YMaps, Map } from 'react-yandex-maps';
import PointsList from './PointsList';
import Gallery from './Gallery';
import { MapContext } from '../context/mapContext'

const mapData = {
    center: [55.669535, 36.712811],
    zoom: 10,
};

const initialState = {
    isShowGallery: false,
    selectPoint: -1
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SWITCH_ON_GALLERY':
            console.log(`Gallery: SWITCH ON, select item: ${action.payload}`)
            return {
                isShowGallery: true,
                selectPoint: action.payload
            }

        case 'SWITCH_OFF_GALLERY':
            console.log('Gallery: SWITCH OFF')
            return {
                isShowGallery: false,
                selectPoint: action.payload
            }

        default:
            return state
    }
}

function PointsMap() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <MapContext.Provider value={{ mapState: state, mapDispatch: dispatch }}>
                < YMaps >
                    <Map defaultState={mapData} className={styles['point-map']}>
                        <PointsList />
                    </Map>
                </YMaps >
                <Gallery />
            </MapContext.Provider>
        </div>
    )
}

export default PointsMap

// class PointsMap extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             isShowGallery: false,
//             switchOffGallery: this.switchOffGallery,
//             switchOnGallery: this.switchOnGallery,
//             images: [],
//             selectPoint: -1
//         }
//     }

//     switchOffGallery = () => {
//         console.log("switchOffGallery ")
//         this.setState({
//             isShowGallery: false
//         })
//     }

//     switchOnGallery = (placeMarkId) => {
//         console.log("switchOnGallery ")
//         this.setState({
//             selectPoint: placeMarkId,
//             isShowGallery: true
//         })

//         console.log("switchOnGallery selectPoint ", this.state.selectPoint)
//     }

//     render() {
//         return (
//             <MapProvider value={this.state}>
//                 < YMaps >
//                     <Map defaultState={mapData} className={styles['point-map']}>
//                         <PointsList></PointsList>
//                     </Map>
//                 </YMaps >
//                 <Gallery></Gallery>
//             </MapProvider>
//         )
//     }
// }


// export default PointsMap
