import React from 'react';
import { Carousel as MinimalCarousel } from 'react-carousel-minimal';
import './1.css'; // Check the correct path to your CSS file

function MyCarousel() {
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../Carousel/image_carousel', false, /\.(png|jpe?g|svg)$/));

    const data = images.map((image, index) => ({
        image: image,
        caption: ``
    }));

    const captionStyle = {
        fontSize: '1em',
        fontWeight: 'bold',
    };
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    };

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <div style={{
                    padding: "0 20px"
                }}>
                    <MinimalCarousel className="carousel"
                        data={data}
                        time={2000}
                        width="400px"
                        height="400px"
                        captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={false}
                        dots={false}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="none"
                        slideImageFit="contain"
                        thumbnails={true}
                        thumbnailWidth="64px"
                        thumbnailHeight="64px"
                        style={{
                            textAlign: "center",
                            margin: "0",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyCarousel;



