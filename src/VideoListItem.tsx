import React from 'react';
import styled from 'styled-components';
import { formatNum } from './utils';

const ItemContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 4px;
`;

const Thumbnail = styled.img`
    width: 168px;
    height: 94px;
    border-radius: 8px;
`;

const VideoInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;
    gap: 5px;
`;

const VideoTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const VideoChannel = styled.div`
    font-size: 14px;
    color: #999;
`;

const VideoViews = styled.div`
    font-size: 14px;
    color: #999;
`;

const VideoListItem = ({ video } : { video: any}) => {
    return (
        <ItemContainer>
            <Thumbnail src={video.snippet.thumbnails.url} alt="" />
            <VideoInfo>
                <VideoTitle>{video.snippet.title}</VideoTitle>
                <VideoChannel>{video.channelName}</VideoChannel>
                <VideoViews>{formatNum(video.views)} views</VideoViews>
            </VideoInfo>
        </ItemContainer>
    );
};

export default VideoListItem;