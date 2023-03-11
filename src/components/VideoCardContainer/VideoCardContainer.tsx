import VideoCardItem from "../VideoCardItem";
import { VideoCardContainerElement } from "./VideoCardContainer.styled";

const VideoCardContainer = ({ videosArray }: { videosArray: any[]}) => {
    const children = videosArray.map((video, idx) => {
        return <VideoCardItem key={idx} video={video} />;
    });
    return <VideoCardContainerElement>{children}</VideoCardContainerElement>;
};

export default VideoCardContainer;