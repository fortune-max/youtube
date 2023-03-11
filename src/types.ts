export interface IPlaylist {
    playlistName: string;
    videoIds: string[];
    currentVideoId: string;
    currentTime: number;
    isPlaying: boolean;
    lastUpdatedAt: number;
    mountTime: number;
};