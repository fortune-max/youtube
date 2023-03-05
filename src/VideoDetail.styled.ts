import styled from "styled-components";

export const VideoDetailContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    margin: 10px;
    width: 640px;
`;

export const VideoDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow: auto;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ChannelCard = styled.div`
    display: inline-flex;
    flex-direction: row;
    gap: 10px;
    overflow: auto;
`;

export const ChannelDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`;

export const ChannelThumbnail = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

export const BoldText = styled.div`
    font-size: 14px;
    font-weight: bold;
`;

export const ThinText = styled.div`
    font-size: 12px;
    color: #777;
`;

export const VideoDescription = styled.div`
    font-size: 14px;
    color: #777;
`;

export const VideoStats = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const VideoTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
`;