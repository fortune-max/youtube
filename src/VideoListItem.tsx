// [0].id.videoId
// [0].url
// [0].title
// [0].description
// [0].publishedAt
// [0].channelName
// [0].duration_raw
// [0].views
// [0].snippet.thumbnails.url
// [0].snippet.thumbnails.width
// [0].snippet.thumbnails.height

import React from 'react';
import styled from 'styled-components';

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

const formatNum = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

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