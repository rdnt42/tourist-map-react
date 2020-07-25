import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import './scss/image-gallery.scss';
import { MapConsumer } from '../context/mapContext';
import axios from 'axios';
import config from '../config'

class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showIndex: true,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: false,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: false,
            thumbnailPosition: 'bottom',
            items: {},
            selectPoint: 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.slideInterval !== prevState.slideInterval ||
            this.state.slideDuration !== prevState.slideDuration) {
        }
    }

    componentDidMount() {
        //TODO изменить работу pointsMap Для полученя images
        console.log('this.state.selectPoint ' + this.state.selectPoint)
        axios.get('http://' + config.address + ':' + config.port + '/getPhotos?pointId=' + this.state.selectPoint)
            .then(response => {
                console.log(response.data)
                console.log("Gallery Get data from server: OK")
                //Add set images
            })
            .catch(error => {
                alert("Не удалось связаться с сервером для получения данных")
                throw error;
            })
    }

    _onImageClick(event) {
        console.log('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
        this.setState({
            isVisible: false
        })
    }

    _onImageLoad(event) {
        console.log('loaded image', event.target.src);
    }

    _onSlide(index) {
        console.log('slid to index', index);
    }

    _onPause(index) {
        console.log('paused on index', index);
    }

    _onScreenChange(fullScreenElement) {
        console.log('isFullScreen?', !!fullScreenElement);
    }

    _onPlay(index) {
        console.log('playing from index', index);
    }

    _handleInputChange(state, event) {
        this.setState({ [state]: event.target.value });
    }

    _handleCheckboxChange(state, event) {
        this.setState({ [state]: event.target.checked });
    }

    _handleThumbnailPositionChange(event) {
        this.setState({ thumbnailPosition: event.target.value });
    }


    render() {
        return (
            <MapConsumer>
                {
                    (val) => {
                        console.log("selectPoint ", val.selectPoint)
                        return (
                            val.isShowGallery &&
                            <ImageGallery
                                selectPoint={val.selectPoint}
                                items={val.images}
                                onClick={val.switchOffGallery}

                                ref={i => this._imageGallery = i}
                                lazyLoad={false}
                                // onClick={this._onImageClick.bind(this)}
                                onImageLoad={this._onImageLoad}
                                onSlide={this._onSlide.bind(this)}
                                onPause={this._onPause.bind(this)}
                                onScreenChange={this._onScreenChange.bind(this)}
                                onPlay={this._onPlay.bind(this)}
                                infinite={this.state.infinite}
                                showBullets={this.state.showBullets}
                                showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                                showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                                showThumbnails={this.state.showThumbnails}
                                showIndex={this.state.showIndex}
                                showNav={this.state.showNav}
                                isRTL={this.state.isRTL}
                                thumbnailPosition={this.state.thumbnailPosition}
                                slideDuration={parseInt(this.state.slideDuration)}
                                slideInterval={parseInt(this.state.slideInterval)}
                                slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                                additionalClass="app-image-gallery"
                            >
                            </ImageGallery>
                        )
                    }
                }
            </MapConsumer>


        )
    }
}

export default Gallery
