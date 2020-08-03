import React, { useState, useContext, useEffect, useRef } from 'react';
import { MapContext } from '../../context/mapContext'
import axios from 'axios';
import config from '../../config'
import Gallery from '../presentationals/Gallery';

function GalleryContainer() {

    const [showIndex, setIndex] = useState(false)
    const [showBullets, setBullets] = useState(false)
    const [showNav, setNav] = useState(false)

    const [infinite] = useState(true)
    const [showThumbnails] = useState(true)
    const [showFullscreenButton] = useState(false)
    const [showPlayButton] = useState(false)
    const [isRTL] = useState(false)
    const [slideDuration] = useState(450)
    const [slideInterval] = useState(2000)
    const [slideOnThumbnailOver] = useState(false)
    const [thumbnailPosition] = useState('bottom')

    const [images, setImages] = useState([])

    var refGallery = useRef(null)

    //Show when thumbnail clicked
    function showNavToImage() {
        setBullets(true)
        setIndex(true)
        setNav(true)
    }

    //hide when unmounting
    function hideNavToImage() {
        setBullets(false)
        setIndex(false)
        setNav(false)
    }


    function parseResponse(listData) {
        const result = listData.map(data => {
            return ({
                original: data.src_l,
                thumbnail: data.src_s
            })
        })

        //console.log(result)
        return result;
    }

    /////////////// H A N D L E R S ///////////////
    function closeButtonHandler() {
        hideNavToImage()
        mapContext.mapDispatch({ type: 'SWITCH_OFF_GALLERY', payload: mapContext.mapState.selectPoint })
    }

    function _onImageLoad(event) {
        // console.log('loaded image', event.target.src);
    }

    function _onSlide(index) {
        console.log('slid to index', index);
    }

    function _onThumbnailClick() {
        if (showIndex === false)
            showNavToImage();
    }

    function _onImageClick(event) {
        refGallery.slideToIndex(refGallery.getCurrentIndex() + 1)
        event.preventDefault();
    }

    const mapContext = useContext(MapContext);

    useEffect(() => {

        axios.get(`http://${config.address}:${config.port}/getPhotos?pointId=${mapContext.mapState.selectPoint}`)
            .then(response => {
                const data = parseResponse(response.data);
                setImages(data);

                //console.log(data)
                console.log("Gallery Get data from server: OK")
            })
            .catch(error => {
                alert("Не удалось связаться с сервером для получения данных")
                throw error;
            })

        return () => {
            //Reset image state
            setImages([])
            hideNavToImage()
        }
    }, [mapContext.mapState.selectPoint])


    const states = {
        showIndex: showIndex,
        showBullets: showBullets,
        showNav: showNav,
        showThumbnails: showThumbnails,
        showFullscreenButton: showFullscreenButton,
        showPlayButton: showPlayButton,

        infinite: infinite,
        isRTL: isRTL,
        slideDuration: slideDuration,
        slideInterval: slideInterval,
        slideOnThumbnailOver: slideOnThumbnailOver,
        thumbnailPosition: thumbnailPosition,
    }

    const handlers = {
        _onImageClick: _onImageClick,
        _onSlide: _onSlide,
        _onImageLoad: _onImageLoad,
        _onThumbnailClick: _onThumbnailClick,
        closeButtonHandler: closeButtonHandler
    }

    return (
        <Gallery
            images={images}
            states={states}
            handlers={handlers}
            refGallery={i => refGallery = i}
            mapContext={mapContext}
        />
    )
}

export default GalleryContainer