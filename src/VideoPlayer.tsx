import useSWR from "swr";
import YouTube, { YouTubeEvent } from "react-youtube";
import { timeAgo, formatNum } from "./utils";
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

const VideoPlayer = ({ videoId, onReady, onEnd, onPlay, onPause, autoplay }: {
    videoId: string;
    startTime?: number;
    autoplay?: number;
    onReady?: (e: YouTubeEvent) => void;
    onEnd?: (e: YouTubeEvent) => void;
    onPlay?: (e: YouTubeEvent) => void;
    onPause?: (e: YouTubeEvent) => void;
}) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher);

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <VideoDetailContainer>
                <YouTube style={{width: "640px", height: "360px"}} videoId={videoId} onReady={onReady} onEnd={onEnd} onPause={onPause} onPlay={onPlay} opts={
                    {
                        playerVars: {
                            autoplay: autoplay || 0,
                            mute: 1
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
        </div>
    );
};

export default VideoPlayer;