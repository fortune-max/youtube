import useSWR from 'swr';
import styled from 'styled-components';
import { formatNum } from './utils';
import { useNavigate } from "react-router-dom";

const ItemContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    padding: 4px;
`;

const Thumbnail = styled.img`
    min-width: 168px;
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

const VideoListItem = ({ video, videoId, onVideoClick, needsFetch } : {
    video?: any,
    videoId?: string,
    onVideoClick?: (videoId: string)=>void;
    needsFetch: boolean;
}) => {
    const navigate = useNavigate();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher);
    
    if (needsFetch){
        if (!data) return <div>Loading...</div>;
        return (
            <ItemContainer onClick={() => onVideoClick?.(data.videoId)}>
                <Thumbnail src={data.thumbnailUrl} />
                <VideoInfo>
                    <VideoTitle>{data.title}</VideoTitle>
                    <VideoChannel>{data.owner}</VideoChannel>
                    <VideoViews>{formatNum(data.views)} views</VideoViews>
                </VideoInfo>
            </ItemContainer>
        );
    }

    return (
        <ItemContainer onClick={()=> {navigate(`/video/${video.id.videoId}`)}}>
            <Thumbnail src={video.snippet.thumbnails.url} />
            <VideoInfo>
                <VideoTitle>{video.snippet.title}</VideoTitle>
                <VideoChannel>{video.channelName}</VideoChannel>
                <VideoViews>{formatNum(video.views)} views</VideoViews>
            </VideoInfo>
        </ItemContainer>
    );
};

export default VideoListItem;