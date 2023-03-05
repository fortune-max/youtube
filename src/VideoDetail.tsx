import useSWR from "swr";
import YouTube from "react-youtube";
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
} from "./VideoDetail.styled";
import SideSearchBar from "./SideSearchBar";
import { useParams } from "react-router-dom";

const VideoDetail = () => {
    const { videoId } = useParams();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/videos/${videoId}`, fetcher);

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <VideoDetailContainer>
                <YouTube style={{width: "640px", height: "360px"}} videoId={videoId} />
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
            <SideSearchBar />
        </div>
    );
};

export default VideoDetail;