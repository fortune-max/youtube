import styled from "styled-components";
import { formatNum } from "./utils";
import { useNavigate } from "react-router-dom";

const VideoCardItemContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 276px;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover {
        cursor: pointer;
        border: 1px solid #ccc;
    }
`;

const Thumbnail = styled.img`
    width: 276px;
    height: 155px;
    border-radius: 8px;
    transition: transform .2s;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
`;

const VideoInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

const VideoTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
`;

const VideoChannel = styled.div`
    font-size: 10px;
    color: #999;
`;

const VideoViews = styled.div`
    font-size: 10px;
    color: #999;
`;

const ChannelThumbnail = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const randomNum = () => Math.ceil(Math.random()*100);

const VideoCardItem = ({ video } : { video: any}) => {
    const navigate = useNavigate();

    return (
        <VideoCardItemContainer onClick={()=> {navigate(`/video/${video.id.videoId}`)}}>
            <Thumbnail src={video.snippet.thumbnails.url} alt="" />
            <VideoInfo>
                <ChannelThumbnail src={`https://picsum.photos/id/${randomNum()}/100/100`} alt="thumbnail" />
                <div>
                    <VideoTitle>{video.snippet.title}</VideoTitle>
                    <VideoChannel>{video.channelName}</VideoChannel>
                    <VideoViews>{`${formatNum(video.views)} views • ${(video.snippet.publishedAt)}`}</VideoViews>
                </div>
            </VideoInfo>
        </VideoCardItemContainer>
    );
};

export default VideoCardItem;