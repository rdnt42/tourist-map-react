import React from 'react';
import ImageGallery from 'react-image-gallery';
import './scss/image-gallery.scss';
import './scss/close-button.scss';

import errorImg from '../../404.png';

function Gallery(props) {
    return (
        <span className="footer">
            {props.images.length > 0 && <div className="close-button" onClick={props.handlers.closeButtonHandler}></div>}
            {props.mapContext.mapState.isShowGallery && props.images.length > 0 &&
                <ImageGallery
                    items={props.images}

                    selectPoint={props.mapContext.mapState.selectPoint}

                    ref={props.refGallery}

                    //-1 hide original image
                    startIndex={-1}

                    onClick={props.handlers._onImageClick}
                    onSlide={props.handlers._onSlide}
                    onImageLoad={props.handlers._onImageLoad}
                    onThumbnailClick={props.handlers._onThumbnailClick}

                    showBullets={props.states.showBullets}
                    showFullscreenButton={props.states.showFullscreenButton}
                    showPlayButton={props.states.showPlayButton}
                    showThumbnails={props.states.showThumbnails}
                    showIndex={props.states.showIndex}
                    showNav={props.states.showNav}

                    infinite={props.states.infinite}
                    isRTL={props.states.isRTL}
                    slideDuration={parseInt(props.states.slideDuration)}
                    slideInterval={parseInt(props.states.slideInterval)}
                    slideOnThumbnailOver={props.states.slideOnThumbnailOver}
                    thumbnailPosition={props.states.thumbnailPosition}

                    onErrorImageURL={errorImg}
                >
                </ImageGallery>
            }
        </span>
    )
}

export default Gallery
