import React, { useState, useContext, useEffect, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import './scss/image-gallery.scss';
import './scss/close-button.scss';
import { MapContext } from '../context/mapContext'
import axios from 'axios';
import config from '../config'
import errorImg from '../404.png';

function Gallery() {

    const [showIndex, setIndex] = useState(false)
    const [showBullets, setBullets] = useState(false)
    const [showNav, setNav] = useState(false)

    const [infinite] = useState(true)
    const [showThumbnails] = useState(true)
    const [showFullscreenButton] = useState(false)
    const [showGalleryFullscreenButton] = useState(false)
    const [showPlayButton] = useState(false)
    const [showGalleryPlayButton] = useState(false)
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


    return (
        <span className="footer">
            {images.length > 0 && <div className="close-button" onClick={closeButtonHandler}></div>}
            {mapContext.mapState.isShowGallery && images.length > 0 &&
                <ImageGallery
                    selectPoint={mapContext.mapState.selectPoint}
                    onClick={_onImageClick}
                    items={images}
                    ref={i => refGallery = i}

                    //-1 hide original image
                    startIndex={-1}
                    onSlide={_onSlide}
                    lazyLoad={true}
                    onImageLoad={_onImageLoad}
                    onThumbnailClick={_onThumbnailClick}
                    infinite={infinite}
                    showBullets={showBullets}
                    showFullscreenButton={showFullscreenButton && showGalleryFullscreenButton}
                    showPlayButton={showPlayButton && showGalleryPlayButton}
                    showThumbnails={showThumbnails}
                    showIndex={showIndex}
                    showNav={showNav}
                    isRTL={isRTL}
                    thumbnailPosition={thumbnailPosition}
                    slideDuration={parseInt(slideDuration)}
                    slideInterval={parseInt(slideInterval)}
                    slideOnThumbnailOver={slideOnThumbnailOver}
                    onErrorImageURL={errorImg}
                >
                </ImageGallery>
            }
        </span>
    )
}

export default Gallery
