import styled from "styled-components";

export const VideoCardItemContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 276px;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover {
        border: 1px solid #ccc;
    }
`;

export const SubWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
`;

export const Button = styled.button`
    background-color: white;
    cursor: pointer;
`;

export const Thumbnail = styled.img`
    width: 276px;
    height: 155px;
    border-radius: 8px;
    transition: transform .2s;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const VideoInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`;

export const VideoTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
    text-overflow: ellipsis;
    max-width: 100%;
    max-height: 20px;
    overflow: hidden;
`;

export const VideoChannel = styled.div`
    font-size: 10px;
    color: #999;
`;

export const VideoViews = styled.div`
    font-size: 10px;
    color: #999;
`;

export const ChannelThumbnail = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;