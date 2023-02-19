import React from 'react';
import { Blocks } from 'react-loader-spinner';
import './Loading.scss';

const Loading = () => {
    return (
        <div className='loading-container'>
            <Blocks
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
        </div>
    );
}

export default Loading;