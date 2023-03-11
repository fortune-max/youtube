import VideoPlayer from "../VideoPlayer";
import VideoQueue from "../VideoQueue";
import { useEffect, useState } from "react";
import { getVideoTime, timeNow, updatePlaylist } from "../../utils";
import { usePlaylistFns } from "../../contexts/context";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { YouTubeEvent } from "react-youtube";
import { IPlaylist } from "../../types";
import { PlaylistName, PlaylistView, PlaylistContainer } from "./Playlist.styled";

const Playlist = () => {
    const {
        youtubeObject,
        setYoutubeObject,
        setPlaylistIdInternal,
        mountTime,
        setMountTime,
    } = usePlaylistFns();

    const { playlistId } = useParams() as { playlistId: string };
    const playlistUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, mutate } = useSWR(playlistUrl, fetcher, { refreshInterval: 50 });
    const playlistData: IPlaylist = data;
    setPlaylistIdInternal(playlistId);

    const onReady = (event: YouTubeEvent) => {
        setMountTime(timeNow());
        setYoutubeObject(event.target);
    
        event.target.seekTo(getVideoTime(playlistData), true);
        if (playlistData.isPlaying)
            event.target.playVideo();
        else
            event.target.pauseVideo();
    }
    
    const onPlay = async (event: YouTubeEvent) => {
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            isPlaying: true,
            currentVideoId: youtubeObject.getVideoData().video_id,
            currentTime: Math.floor(youtubeObject.getCurrentTime()),
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newPlaylistData, playlistId);
        mutate(newPlaylistData);
    };
    
    const onPause = async (event: YouTubeEvent) => {
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            isPlaying: false,
            currentVideoId: youtubeObject.getVideoData().video_id,
            currentTime: Math.floor(youtubeObject.getCurrentTime()),
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newPlaylistData, playlistId);
        mutate(newPlaylistData);
    };
    
    const onEnd = async (event: YouTubeEvent) => {
        const currentIndex = playlistData.videoIds.indexOf(playlistData.currentVideoId);
        if (currentIndex === playlistData.videoIds.length - 1) {
            const newPlaylistData: IPlaylist = {
                ...playlistData,
                isPlaying: false,
                currentVideoId: playlistData.videoIds[0],
                currentTime: 0,
                lastUpdatedAt: timeNow(),
                mountTime: mountTime
            }
            await updatePlaylist(newPlaylistData, playlistId);
            mutate(newPlaylistData);
            return;
        }
        const nextVideo = playlistData.videoIds[currentIndex + 1];
        const newPlaylistData: IPlaylist = {
            ...playlistData,
            currentVideoId: nextVideo,
            currentTime: 0,
            isPlaying: true,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        };
        await updatePlaylist(newPlaylistData, playlistId);
        mutate(newPlaylistData);
    };

    const [lastProcessedTimestamp, setLastProcessedTimestamp] = useState<number>(0);
    
    useEffect(() => {
        if (!!youtubeObject) {
            if (youtubeObject.h && playlistData.mountTime !== mountTime && playlistData.lastUpdatedAt > lastProcessedTimestamp) {
                if (Math.abs(getVideoTime(playlistData) - youtubeObject.getCurrentTime()) > 1){
                    youtubeObject.seekTo(getVideoTime(playlistData), true);
                }
                if (playlistData.isPlaying)
                    youtubeObject.playVideo();
                else
                    youtubeObject.pauseVideo();
                setLastProcessedTimestamp(playlistData.lastUpdatedAt);
            }
        }
    }, [youtubeObject, setYoutubeObject, mountTime, setMountTime, lastProcessedTimestamp, setLastProcessedTimestamp, playlistData]);

    return (
        !playlistData ? <div>Loading...</div> : (
            <PlaylistContainer>
                <PlaylistName>{playlistData.playlistName}</PlaylistName>
                <PlaylistView>
                    <VideoPlayer fromPlaylist videoId={playlistData.currentVideoId} onEnd={onEnd} onPause={onPause} onPlay={onPlay} onReady={onReady} />
                    <VideoQueue mutate={mutate} playlistData={playlistData}/>
                </PlaylistView>
            </PlaylistContainer>
        )
    );
};

export default Playlist;