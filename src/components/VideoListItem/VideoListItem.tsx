import useSWR from 'swr';
import { formatNum, timeNow, updatePlaylist } from '../../utils';
import { useNavigate } from "react-router-dom";
import { ItemContainer, Thumbnail, VideoInfo, VideoTitle, VideoChannel, VideoViews, ButtonWrapper, Button, ItemSubContainer } from "./VideoListItem.styled";
import { IPlaylist } from '../../types';

const FAVORITES_PLAYLIST_ID = "KLnGIXyOASyvag-5gNXYI";
const WATCH_LATER_PLAYLIST_ID = "sZxeIfwCx0dNDdlVP9N3J";

const VideoListItem = ({ video, videoId, onVideoClick, needsFetch } : {
    video?: any,
    videoId?: string,
    onVideoClick?: (videoId: string)=>void;
    needsFetch: boolean;
}) => {
    const navigate = useNavigate();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher);

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
                    mountTime: timeNow()
                }
                await updatePlaylist(newPlaylistData, playlistId);
        });
        const isFavorites = playlistId === FAVORITES_PLAYLIST_ID;
        alert(`Added to ${isFavorites? "Favorites" : "Watch Later"} playlist! 🎉`);
    }
    
    if (needsFetch){
        if (!data) return <div>Loading...</div>;
        return (
            <ItemContainer onClick={() => onVideoClick?.(data.videoId)}>
                <div>
                    <Thumbnail src={data.thumbnailUrl} />
                    <VideoInfo>
                        <VideoTitle>{data.title}</VideoTitle>
                        <VideoChannel>{data.owner}</VideoChannel>
                        <VideoViews>{formatNum(data.views)} views</VideoViews>
                    </VideoInfo>
                </div>
            </ItemContainer>
        );
    }

    return (
        <ItemContainer hasButtons={needsFetch}>
            <ItemSubContainer>
                <Thumbnail src={video.snippet.thumbnails.url} onClick={()=> {navigate(`/video/${video.id.videoId}`)}}/>
                <VideoInfo>
                    <VideoTitle>{video.snippet.title}</VideoTitle>
                    <VideoChannel>{video.channelName}</VideoChannel>
                    <VideoViews>{formatNum(video.views)} views</VideoViews>
                </VideoInfo>
            </ItemSubContainer>
            <ButtonWrapper>
                <Button onClick={() => addToPlaylist(video.id.videoId, WATCH_LATER_PLAYLIST_ID)}>⏱</Button>
                <Button onClick={() => addToPlaylist(video.id.videoId, FAVORITES_PLAYLIST_ID)}>❤️</Button>
            </ButtonWrapper>
        </ItemContainer>
    );
};

export default VideoListItem;