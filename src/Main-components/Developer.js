import React from 'react';
import styled from 'styled-components';

const DevelopFragment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Developer = () => {
    return (
        <DevelopFragment>
            <p>서버오픈 2023.02.21</p>
        </DevelopFragment>
    );
}

export default Developer;