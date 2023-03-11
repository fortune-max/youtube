import { formatNum } from '../../utils';
import { ItemContainer, Thumbnail, VideoInfo, VideoTitle, VideoChannel, VideoViews, ButtonWrapper, Button, ItemSubContainer } from "./VideoListItem.styled";

const FAVORITES_PLAYLIST_ID = "KLnGIXyOASyvag-5gNXYI";
const WATCH_LATER_PLAYLIST_ID = "sZxeIfwCx0dNDdlVP9N3J";

const VideoListItem = ({ video } : {
    video?: any,
}) => {
    
    const navigate = (url: string) => {};
    const addToPlaylist = (videoId: string, playlistId: string) => {};

    return (
        <ItemContainer hasButtons={false}>
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