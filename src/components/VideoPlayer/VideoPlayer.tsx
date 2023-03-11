import useSWR from "swr";
import YouTube from "react-youtube";
import { timeAgo, formatNum } from "../../utils";
import {
    BoldText, 
    ChannelCard, 
    ChannelDetails, 
    ChannelThumbnail, 
    FlexColumn, 
    ThinText, 
    VideoDescription, 
    VideoDetailContainer, 
    VideoDetails, 
    VideoStats, 
    VideoTitle
} from "./VideoPlayer.styled";

const VideoPlayer = ({ fromPlaylist, videoId, autoplay, onPlay, onPause, onEnd, onReady }: {
    fromPlaylist?: boolean;
    videoId: string;
    autoplay?: number;
    onPlay?: (e: any) => void;
    onPause?: (e: any) => void;
    onEnd?: (e: any) => void;
    onReady?: (e: any) => void;
}) => {
    if (fromPlaylist) autoplay = 1;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher);

    return (
            <VideoDetailContainer>
                <YouTube style={{width: "640px", height: "360px"}} videoId={videoId} onReady={onReady} onEnd={onEnd} onPause={onPause} onPlay={onPlay} opts={
                    {
                        playerVars: {
                            autoplay: autoplay || 0,
                            mute: 0
                        }
                    } 
                } />
                <VideoDetails>
                    <VideoTitle>{data?.title}</VideoTitle>
                    <VideoStats>
                        <ChannelCard>
                            <ChannelThumbnail src={"https://picsum.photos/100/100"} alt="thumbnail" />
                            <ChannelDetails>
                                <BoldText>{data?.owner}</BoldText>
                                <ThinText>{formatNum(Math.round(data?.views / 123))} subscribers</ThinText>
                            </ChannelDetails>
                        </ChannelCard>
                        <FlexColumn>
                            <BoldText>{`${formatNum(Math.round(data?.views / 161))} likes`}</BoldText>
                            <ThinText>{`${timeAgo(data?.datePublished)} ago`}</ThinText>
                        </FlexColumn>
                    </VideoStats>
                    
                    <VideoDescription>{data?.description}</VideoDescription>
                </VideoDetails>
            </VideoDetailContainer>
    );
};

export default VideoPlayer;