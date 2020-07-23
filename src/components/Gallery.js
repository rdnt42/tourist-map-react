import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import './scss/image-gallery.scss'
import { MapConsumer } from '../context/mapContext'


// const images = [
//     {
//         original: 'https://drive.google.com/uc?export=view&id=1XH1XGuI8J737_oldBDC0_anSRXz4waxc',
//         thumbnail: 'https://drive.google.com/uc?export=view&id=1LyiR-TrT2Lof6FWfoJE1FxGKOI2el6wD',
//     },
//     {
//         original: 'https://drive.google.com/uc?export=view&id=1AfknaCaYtMilGCft10SnL_ZnAYKb_wou',
//         thumbnail: 'https://drive.google.com/uc?export=view&id=1Gyk0dU5yVq-flAWm5qe09dlQk9ehG1e8',
//     },
//     {
//         original: 'https://drive.google.com/uc?export=view&id=1loEE-J9g0jbzzXLvyHHS6hsvWUmD8Qej',
//         thumbnail: 'https://drive.google.com/uc?export=view&id=1XeXankZIVmQpSUvyR-Mp14_v59Cmz80P',
//     },
//     {
//         original: 'https://drive.google.com/uc?export=view&id=1qUoCe20P8V4EDeK6apaQ-M0Dh4LIDhO8',
//         thumbnail: 'https://drive.google.com/uc?export=view&id=1H2ny8dm_tD_8D40xdeXbykPDBTPorJoB',
//     },
// ];

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
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.slideInterval !== prevState.slideInterval ||
            this.state.slideDuration !== prevState.slideDuration) {
        }
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
                        return (
                            val.isShowGallery &&
                            <ImageGallery
                                ref={i => this._imageGallery = i}
                                items={val.images}
                                lazyLoad={false}
                                // onClick={this._onImageClick.bind(this)}
                                onClick={val.switchOffGallery}
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
