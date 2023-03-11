import VideoListItem from "../VideoListItem";
import { VideoListContainerElement } from "./VideoListContainer.styled";

const VideoListContainer = ({ videosArray }: { videosArray: any[]}) => {
    const children = videosArray.map((video, idx) => {
        return <VideoListItem key={idx} video={video} needsFetch={false} />;
    });
    return <VideoListContainerElement>{children}</VideoListContainerElement>;
};

export default VideoListContainer;