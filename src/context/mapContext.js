import React from 'react'

const MapContext = React.createContext({
    isShowGallery: false,
    switchOffGallery: () => { },
    switchOnGallery: (placeMarkId) => { },
    images: []
})

const MapProvider = MapContext.Provider
const MapConsumer = MapContext.Consumer

export { MapProvider, MapConsumer }
