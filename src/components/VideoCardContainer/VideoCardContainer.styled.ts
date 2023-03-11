import styled from 'styled-components';

export const VideoCardContainerElement = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    overflow: scroll;
`;