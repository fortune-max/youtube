import { formatNum, timeNow, updatePlaylist } from "../../utils";
import { useNavigate } from "react-router-dom";
import { VideoCardItemContainer, Thumbnail, VideoInfo, ChannelThumbnail, VideoTitle, VideoChannel, VideoViews, Button, ButtonWrapper, SubWrapper } from "./VideoCardItem.styled";
import { IPlaylist } from "../../types";

const randomNum = () => Math.ceil(Math.random()*100);
const FAVORITES_PLAYLIST_ID = "KLnGIXyOASyvag-5gNXYI";
const WATCH_LATER_PLAYLIST_ID = "sZxeIfwCx0dNDdlVP9N3J";

const VideoCardItem = ({ video } : { video: any}) => {
    const navigate = useNavigate();

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

    return (
        <VideoCardItemContainer>
            <Thumbnail src={video.snippet.thumbnails.url} alt="" onClick={()=> {navigate(`/video/${video.id.videoId}`)}} />
            <VideoInfo>
                <SubWrapper>
                    <ChannelThumbnail src={`https://picsum.photos/id/${randomNum()}/100/100`} alt="thumbnail" />
                    <div>
                        <VideoTitle>{video.snippet.title}</VideoTitle>
                        <VideoChannel>{video.channelName}</VideoChannel>
                        <VideoViews>{`${formatNum(video.views)} views • ${(video.snippet.publishedAt)}`}</VideoViews>
                    </div>
                </SubWrapper>
                <ButtonWrapper>
                    <Button onClick={() => addToPlaylist(video.id.videoId, WATCH_LATER_PLAYLIST_ID)}>⏱</Button>
                    <Button onClick={() => addToPlaylist(video.id.videoId, FAVORITES_PLAYLIST_ID)}>❤️</Button>
                </ButtonWrapper>
            </VideoInfo>
        </VideoCardItemContainer>
    );
};

export default VideoCardItem;