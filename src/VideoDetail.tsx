import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import SideSearchBar from "./SideSearchBar";
import { useParams } from "react-router-dom";

const VideoDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

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