import React, { useState, useContext, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import './scss/image-gallery.scss';
import { MapContext } from '../context/mapContext'
import axios from 'axios';
import config from '../config'

function Gallery() {

    const [showIndex] = useState(true)
    const [showBullets] = useState(true)
    const [infinite] = useState(true)
    const [showThumbnails] = useState(true)
    const [showFullscreenButton] = useState(false)
    const [showGalleryFullscreenButton] = useState(false)
    const [showPlayButton] = useState(false)
    const [showGalleryPlayButton] = useState(false)
    const [showNav] = useState(true)
    const [isRTL] = useState(false)
    const [slideDuration] = useState(450)
    const [slideInterval] = useState(2000)
    const [slideOnThumbnailOver] = useState(false)
    const [thumbnailPosition] = useState('bottom')
    const [images, setImages] = useState([])
    const [isShowGallery, setShowGallery] = useState(false)

    function _onImageLoad(event) {
        console.log('loaded image', event.target.src);
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

    const galleryState = useContext(MapContext);

    useEffect(() => {
        //if gallery switch off by picture closing - reset local state
        if (!galleryState.isShowGallery) {
            setShowGallery(false);
            return;
        }

        axios.get('http://' + config.address + ':' + config.port + '/getPhotos?pointId=' + galleryState.selectPoint)
            .then(response => {
                const data = parseResponse(response.data);
                setImages(data);
                //wait asunc answer and rise local state
                setShowGallery(true);

                console.log(data)
                console.log("Gallery Get data from server: OK")
                //Add set images
            })
            .catch(error => {
                alert("Не удалось связаться с сервером для получения данных")
                throw error;
            })

    }, [galleryState.selectPoint, galleryState.isShowGallery])


    return (
        <React.Fragment>
            {isShowGallery &&
                <ImageGallery
                    selectPoint={galleryState.selectPoint}
                    items={images}
                    onClick={galleryState.switchOffGallery}

                    lazyLoad={false}
                    onImageLoad={_onImageLoad}
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
                    additionalClass="app-image-gallery"
                >
                </ImageGallery>
            }
        </React.Fragment>
    )
}

export default Gallery

// class Gallery extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             showIndex: true,
//             showBullets: true,
//             infinite: true,
//             showThumbnails: true,
//             showFullscreenButton: true,
//             showGalleryFullscreenButton: true,
//             showPlayButton: false,
//             showGalleryPlayButton: true,
//             showNav: true,
//             isRTL: false,
//             slideDuration: 450,
//             slideInterval: 2000,
//             slideOnThumbnailOver: false,
//             thumbnailPosition: 'bottom',
//             items: {},
//             selectPoint: 0
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log('componentDidUpdate ' + this.state.selectPoint)
//         if (this.state.slideInterval !== prevState.slideInterval ||
//             this.state.slideDuration !== prevState.slideDuration) {
//         }
//     }

//     componentDidMount() {
//         //TODO изменить работу pointsMap Для полученя images
//         console.log('this.state.selectPoint ' + this.state.selectPoint)
//         axios.get('http://' + config.address + ':' + config.port + '/getPhotos?pointId=' + this.state.selectPoint)
//             .then(response => {
//                 console.log(response.data)
//                 console.log("Gallery Get data from server: OK")
//                 //Add set images
//             })
//             .catch(error => {
//                 alert("Не удалось связаться с сервером для получения данных")
//                 throw error;
//             })
//     }

//     _onImageClick(event) {
//         console.log('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
//         this.setState({
//             isVisible: false
//         })
//     }

//     _onImageLoad(event) {
//         console.log('loaded image', event.target.src);
//     }

//     _onSlide(index) {
//         console.log('slid to index', index);
//     }

//     _onPause(index) {
//         console.log('paused on index', index);
//     }

//     _onScreenChange(fullScreenElement) {
//         console.log('isFullScreen?', !!fullScreenElement);
//     }

//     _onPlay(index) {
//         console.log('playing from index', index);
//     }

//     _handleInputChange(state, event) {
//         this.setState({ [state]: event.target.value });
//     }

//     _handleCheckboxChange(state, event) {
//         this.setState({ [state]: event.target.checked });
//     }

//     _handleThumbnailPositionChange(event) {
//         this.setState({ thumbnailPosition: event.target.value });
//     }


//     render() {
//         return (
//             <MapConsumer>
//                 {
//                     (val) => {
//                         console.log("Gallery selectPoint ", val.selectPoint)
//                         return (
//                             val.isShowGallery &&
//                             <ImageGallery
//                                 selectPoint={val.selectPoint}
//                                 items={val.images}
//                                 onClick={val.switchOffGallery}

//                                 ref={i => this._imageGallery = i}
//                                 lazyLoad={false}
//                                 // onClick={this._onImageClick.bind(this)}
//                                 onImageLoad={this._onImageLoad}
//                                 onSlide={this._onSlide.bind(this)}
//                                 onPause={this._onPause.bind(this)}
//                                 onScreenChange={this._onScreenChange.bind(this)}
//                                 onPlay={this._onPlay.bind(this)}
//                                 infinite={this.state.infinite}
//                                 showBullets={this.state.showBullets}
//                                 showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
//                                 showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
//                                 showThumbnails={this.state.showThumbnails}
//                                 showIndex={this.state.showIndex}
//                                 showNav={this.state.showNav}
//                                 isRTL={this.state.isRTL}
//                                 thumbnailPosition={this.state.thumbnailPosition}
//                                 slideDuration={parseInt(this.state.slideDuration)}
//                                 slideInterval={parseInt(this.state.slideInterval)}
//                                 slideOnThumbnailOver={this.state.slideOnThumbnailOver}
//                                 additionalClass="app-image-gallery"
//                             >
//                             </ImageGallery>
//                         )
//                     }
//                 }
//             </MapConsumer>


//         )
//     }
// }

// export default Gallery
