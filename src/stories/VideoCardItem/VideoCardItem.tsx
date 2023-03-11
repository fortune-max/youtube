import { formatNum } from "../../utils";
import { VideoCardItemContainer, Thumbnail, VideoInfo, ChannelThumbnail, VideoTitle, VideoChannel, VideoViews, Button, ButtonWrapper, SubWrapper } from "./VideoCardItem.styled";

const randomNum = () => Math.ceil(Math.random()*100);
const FAVORITES_PLAYLIST_ID = "KLnGIXyOASyvag-5gNXYI";
const WATCH_LATER_PLAYLIST_ID = "sZxeIfwCx0dNDdlVP9N3J";

const VideoCardItem = ({ video } : { video: any}) => {
    const navigate = (url: string)=>{};
    const addToPlaylist = (videoId: string, playlistId: string) => {};

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