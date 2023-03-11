import { usePlaylistFns } from "../../contexts/context";
import { timeNow, updatePlaylist } from "../../utils";
import VideoListItem from "../VideoListItem";
import { IPlaylist } from "../../types";
import {
    Button,
    ButtonWrapper,
    QueueWrapper,
    VideoQueueContainer
} from "./VideoQueue.styled"

const FAVORITES_PLAYLIST_ID = "KLnGIXyOASyvag-5gNXYI";
const WATCH_LATER_PLAYLIST_ID = "sZxeIfwCx0dNDdlVP9N3J";

const VideoQueue = ({ mutate, playlistData } : {
    mutate: (a?: any)=> {},
    playlistData: IPlaylist
}) => {
    const { mountTime, playlistIdInternal } = usePlaylistFns();

    const deleteFromPlaylist = async (videoId: string, playlistData: any) => {
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            videoIds: playlistData.videoIds.filter((id: string) => id !== videoId),
            currentVideoId: playlistData.currentVideoId === videoId ? playlistData.videoIds[0] : playlistData.currentVideoId,
            currentTime: playlistData.currentVideoId === videoId ? 0 : playlistData.currentTime,
            isPlaying: playlistData.currentVideoId === videoId ? true : playlistData.isPlaying,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newPlaylistData, playlistIdInternal);
        mutate(newPlaylistData);
    };
    
    const onVideoClick = async (videoId: string, playlistData: any) => {
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            currentVideoId: videoId,
            currentTime: 0,
            isPlaying: true,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        };
        await updatePlaylist(newPlaylistData, playlistIdInternal);
        mutate(newPlaylistData);
    };
    
    const addToPlaylist = async (videoId: string, playlistId: string) => {
        const playlistUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
        fetch(playlistUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            }).then((res) => res.json()).then(async (res) => {
                if (res.videoIds.includes(videoId)) return;
                const newPlaylistData: IPlaylist = {
                    ...res,
                    videoIds: [...res.videoIds, videoId],
                    lastUpdatedAt: timeNow(),
                    mountTime: mountTime
                }
                await updatePlaylist(newPlaylistData, playlistId);
                mutate();
        });
    }
    
    const moveVideo = async (videoId: string, newIndex: number, playlistData: any) => {
        const currentIndex = playlistData.videoIds.indexOf(videoId);
        const newVideoIds = [...playlistData.videoIds];
        newVideoIds.splice(currentIndex, 1);
        newVideoIds.splice(newIndex, 0, videoId);
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            videoIds: newVideoIds,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newPlaylistData, playlistIdInternal);
        mutate(newPlaylistData);
    };

    const activeIndex = playlistData.videoIds.indexOf(playlistData.currentVideoId);
    const children = playlistData.videoIds.map((videoId: string, idx: number) => {
        return (
            <QueueWrapper active={idx===activeIndex} key={idx} >
                <VideoListItem key={idx} videoId={videoId} onVideoClick={()=>onVideoClick(videoId, playlistData)} needsFetch={true} />
                <ButtonWrapper>
                    <Button onClick={() => moveVideo(videoId, idx - 1, playlistData)}>⬆️</Button>
                    <Button onClick={() => moveVideo(videoId, idx + 1, playlistData)}>⬇️</Button>
                    <Button onClick={() => addToPlaylist(videoId, WATCH_LATER_PLAYLIST_ID)}>⏱</Button>
                    <Button onClick={() => addToPlaylist(videoId, FAVORITES_PLAYLIST_ID)}>❤️</Button>
                    <Button onClick={() => deleteFromPlaylist(videoId, playlistData)}>🗑</Button>
                </ButtonWrapper>
            </QueueWrapper>
        );
    });
    return <VideoQueueContainer>{children}</VideoQueueContainer>;
};

export default VideoQueue;