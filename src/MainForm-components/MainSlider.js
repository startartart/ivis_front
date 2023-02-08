import React from 'react';
import styled from 'styled-components';
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    //랜덤 이미지
    { url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640" },
    { url: "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640" },
    { url: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640" },
    { url: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640" },
]
const MainFragment = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center; 
    overflow: hidden;
`;

const MainSlider = () => {

    return (
        <MainFragment>
            <SimpleImageSlider
                width={360}
                height={360}
                images={images}
                showBullets={true}
                showNavs={true}
                style={{display: 'block', margin: '0 auto'}}
            />
        </MainFragment>
    );
    }
export default MainSlider;
