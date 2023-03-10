import styled from "styled-components";
import VideoListItem from "./VideoListItem";

const VideoQueueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const QueueWrapper = styled.div<{active?: boolean}>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.active ? "lightblue" : "white"};
    cursor: pointer;
`;

const Button = styled.button`
    background-color: white;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
`;

const VideoQueue = ({ videoIdsArray, activeIndex, onVideoClick, deleteFromPlaylist, addToPlaylist, moveVideo } : {
    videoIdsArray: any[],
    activeIndex: number,
    onVideoClick: (videoId: string)=>void;
    deleteFromPlaylist: (videoId: string)=>void;
    addToPlaylist: (videoId: string, playlistId?: string)=>void;
    moveVideo: (videoId: string, newIndex: number)=>void;
}) => {
    const children = videoIdsArray.map((videoId, idx) => {
        return (
            <QueueWrapper active={idx===activeIndex}>
                <VideoListItem key={idx} videoId={videoId} onVideoClick={onVideoClick} needsFetch={true} />
                <ButtonWrapper>
                    <Button onClick={() => moveVideo(videoId, idx - 1)}>⬆️</Button>
                    <Button onClick={() => moveVideo(videoId, idx + 1)}>⬇️</Button>
                    <Button onClick={() => addToPlaylist(videoId, "sZxeIfwCx0dNDdlVP9N3J")}>⏱</Button>
                    <Button onClick={() => addToPlaylist(videoId, "KLnGIXyOASyvag-5gNXYI")}>❤️</Button>
                    <Button onClick={() => deleteFromPlaylist(videoId)}>🗑</Button>
                </ButtonWrapper>
            </QueueWrapper>
        );
    });
    return <VideoQueueContainer>{children}</VideoQueueContainer>;
};

export default VideoQueue;