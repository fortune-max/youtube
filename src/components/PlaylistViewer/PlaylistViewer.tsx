import swr from "swr";
import { PlaylistViewerContainer } from "./PlaylistViewer.styled";
import PlaylistCard from "../PlaylistCard";

const PlaylistViewer = () => {
    const playlistDir = `https://youtube.thorsteinsson.is/api/playlists/J-NnysZRpJQx2A6eaxMwJ`;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = swr(playlistDir, fetcher);

    if (!data) return <div>Loading...</div>;
    const children = Object.values(data.my_playlists).map((playlistId, idx) => {
        return <PlaylistCard key={idx} playlistId={playlistId as any} />;
    });
    return <PlaylistViewerContainer>{children}</PlaylistViewerContainer>;
};

export default PlaylistViewer;