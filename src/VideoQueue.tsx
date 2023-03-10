import styled from "styled-components";
import VideoListItem from "./VideoListItem";

const VideoQueueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const VideoQueue = ({ videoIdsArray, activeIndex, onVideoClick } : {
    videoIdsArray: any[],
    activeIndex: number,
    onVideoClick: (videoId: string)=>void;
}) => {
    const children = videoIdsArray.map((videoId, idx) => {
        return <VideoListItem key={idx} videoId={videoId} onVideoClick={onVideoClick} needsFetch={true} />;
    });
    return <VideoQueueContainer>{children}</VideoQueueContainer>;
};

export default VideoQueue;