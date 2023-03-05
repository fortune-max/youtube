import styled from "styled-components";
import VideoCardItem from "./VideoCardItem";

const VideoCardContainerElement = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    overflow: scroll;
`;

const VideoCardContainer = ({ videosArray }: { videosArray: any[]}) => {
    const children = videosArray.map((video, idx) => {
        return <VideoCardItem key={idx} video={video} />;
    });
    return <VideoCardContainerElement>{children}</VideoCardContainerElement>;
};

export default VideoCardContainer;