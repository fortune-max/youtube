import styled from "styled-components";
import useSWR from "swr";
import VideoPlayer from "./VideoPlayer";
import VideoQueue from "./VideoQueue";
import { useParams } from "react-router-dom";
import { YouTubeEvent } from "react-youtube";
import { useEffect, useState } from "react";

const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const PlaylistName = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
    font-family: "Roboto", sans-serif;
    color: #333;
`;

const PlaylistView = styled.div`
    display: flex;
    gap: 20px;
`

type IPlaylist = {
    playlistName: string;
    videoIds: string[];
    currentVideoId: string;
    currentTime: number;
    isPlaying: boolean;
    lastUpdatedAt: number;
}

const timeNow = () => Math.floor(Date.now() / 1000);

const getVideoTime = (data: IPlaylist) => {
    if (!data.isPlaying) return data.currentTime;
    return data.currentTime + Math.floor(Date.now() / 1000) - data.lastUpdatedAt;
}

const Playlist = () => {
    const { playlistId } = useParams();
    const playlistUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, mutate } = useSWR(playlistUrl, fetcher, { refreshInterval: 50 });
    
    const [youtubeObject, setYoutubeObject] = useState<any>(null);
    const [lastProcessedTimestamp, setLastProcessedTimestamp] = useState(0);
    const mountTime = timeNow();

    const updatePlaylist = async (data: any, playlistId?: string) => {
        let newUrl;
        if (playlistId !== undefined)
            newUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;

        await fetch(newUrl || playlistUrl, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const onReady = (event: YouTubeEvent) => {
        setYoutubeObject(event.target);
        event.target.seekTo(getVideoTime(data), true);
        if (data.isPlaying)
            event.target.playVideo();
        else
            event.target.pauseVideo();
    }
    
    const onPlay = async (event: YouTubeEvent) => {
        const newData = {
            ...data,
            isPlaying: true,
            currentVideoId: youtubeObject.getVideoData().video_id,
            currentTime: Math.floor(youtubeObject.getCurrentTime()),
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newData);
        mutate(newData);
    };

    const onPause = async (event: YouTubeEvent) => {
        const newData = {
            ...data,
            isPlaying: false,
            currentVideoId: youtubeObject.getVideoData().video_id,
            currentTime: Math.floor(youtubeObject.getCurrentTime()),
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newData);
        mutate(newData);
    };

    const onEnd = async (event: YouTubeEvent) => {
        const currentIndex = data.videoIds.indexOf(data.currentVideoId);
        if (currentIndex === data.videoIds.length - 1) {
            const newData = {
                ...data,
                isPlaying: false,
                currentVideoId: data.videoIds[0],
                currentTime: 0,
                lastUpdatedAt: timeNow(),
                mountTime: mountTime
            }
            await updatePlaylist(newData);
            mutate(newData);
            return;
        }
        const nextVideo = data.videoIds[currentIndex + 1];
        const newData = {
            ...data,
            currentVideoId: nextVideo,
            currentTime: 0,
            isPlaying: true,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        };
        await updatePlaylist(newData);
        mutate(newData);
    };
    
    const onVideoClick = async (videoId: string) => {
        const newData = {
            ...data,
            currentVideoId: videoId,
            currentTime: 0,
            isPlaying: true,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        };
        await updatePlaylist(newData);
        mutate(newData);
    };

    useEffect(() => {
        if (!!youtubeObject) {
            if (youtubeObject.h && data.mountTime !== mountTime && data.lastUpdatedAt > lastProcessedTimestamp) {
                if (Math.abs(getVideoTime(data) - youtubeObject.getCurrentTime()) > 1)
                    youtubeObject.seekTo(getVideoTime(data), true);
                if (data.isPlaying)
                    youtubeObject.playVideo();
                else
                    youtubeObject.pauseVideo();
                setLastProcessedTimestamp(data.lastUpdatedAt);
            }
        }
    }, [data, youtubeObject, mountTime, lastProcessedTimestamp]);

    const deleteFromPlaylist = async (videoId: string) => {
        const newData = {
            ...data,
            videoIds: data.videoIds.filter((id: string) => id !== videoId),
            currentVideoId: data.currentVideoId === videoId ? data.videoIds[0] : data.currentVideoId,
            currentTime: data.currentVideoId === videoId ? 0 : data.currentTime,
            isPlaying: data.currentVideoId === videoId ? true : data.isPlaying,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newData);
        mutate(newData);
    };

    const addToPlaylist = async (videoId: string, playlistId?: string) => {
        if (playlistId !== undefined){
            const newUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
            fetch(newUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
                }).then((res) => res.json()).then((res) => {
                    if (res.videoIds.includes(videoId)) return;
                    const newData = {
                        ...res,
                        videoIds: [...res.videoIds, videoId],
                        lastUpdatedAt: timeNow(),
                        mountTime: mountTime
                    }
                    updatePlaylist(newData, playlistId);
                    return;
                });
            return;
        }
        const newData = {
            ...data,
            videoIds: [...data.videoIds, videoId],
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newData);
        mutate(newData);
    };

    const moveVideo = async (videoId: string, newIndex: number) => {
        const currentIndex = data.videoIds.indexOf(videoId);
        const newVideoIds = [...data.videoIds];
        newVideoIds.splice(currentIndex, 1);
        newVideoIds.splice(newIndex, 0, videoId);
        const newData = {
            ...data,
            videoIds: newVideoIds,
            lastUpdatedAt: timeNow(),
            mountTime: mountTime
        }
        await updatePlaylist(newData);
        mutate(newData);
    };

    return (
        !data ? <div>Loading...</div> : (
            <PlaylistContainer>
                <PlaylistName>{data.playlistName}</PlaylistName>
                <PlaylistView>
                    <VideoPlayer videoId={data.currentVideoId} onReady={onReady} onEnd={onEnd} onPlay={onPlay} onPause={onPause} startTime={getVideoTime(data)} autoplay={+data.isPlaying}/>
                    <VideoQueue videoIdsArray={data.videoIds} activeIndex={data.videoIds.indexOf(data.currentVideoId)} onVideoClick={onVideoClick} deleteFromPlaylist={deleteFromPlaylist} addToPlaylist={addToPlaylist} moveVideo={moveVideo}/>
                </PlaylistView>
            </PlaylistContainer>
        )
    );
};

export default Playlist;