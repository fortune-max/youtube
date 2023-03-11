import VideoPlayer from "../VideoPlayer";
import SideSearchBar from "../SideSearchBar";
import { useParams } from "react-router-dom";
import { VideoDetailContainer } from "./VideoDetail.styled";

const VideoDetail = () => {
    const videoId  = useParams().videoId as string;

    return (
        <VideoDetailContainer>
            <VideoPlayer videoId={videoId} />
            <SideSearchBar />
        </VideoDetailContainer>
    );
};

export default VideoDetail;