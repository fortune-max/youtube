import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import {
    PlaylistElement,
    Thumbnail
} from "./PlaylistCard.styled";

const PlaylistCard = ({ playlistId } : {
    playlistId: string,
}) => {
    const playlistDir = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(playlistDir, fetcher);

    const videoDetail = useSWR(`https://youtube.thorsteinsson.is/api/videos/${data?.videoIds?.[0]}`, fetcher)?.data;
    const navigate = useNavigate();

    if (!data) return <div>Loading...</div>;

    if (data?.videoIds?.length === 0) {
        return <div>Empty playlist</div>;
    }

    return(
        <PlaylistElement onClick={() => navigate(`/playlist/${playlistId}`)}>
            <Thumbnail src={videoDetail?.thumbnailUrl} />
            <span>{data?.playlistName}</span>
        </PlaylistElement>
    )
};

export default PlaylistCard;