import styled from "styled-components";
import VideoListItem from "./VideoListItem";

const VideoListContainerElement = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 100vh;
`;

const VideoListContainer = ({ videosArray }: { videosArray: any[]}) => {
    const children = videosArray.map((video, idx) => {
        return <VideoListItem key={idx} video={video} />;
    });
    return <VideoListContainerElement>{children}</VideoListContainerElement>;
};

export default VideoListContainer;