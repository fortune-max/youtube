import { IPlaylist } from "./types";

export const formatNum = (n: number) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const timeNow = () => Date.now();

export const getVideoTime = (playlistData: IPlaylist) => {
    if (!playlistData.isPlaying) return playlistData.currentTime;
    return (playlistData.currentTime * 1000 + Date.now() - playlistData.lastUpdatedAt) / 1000;
}

export const updatePlaylist = async (playlistData: any, playlistId: string) => {
    const playlistUrl = `https://youtube.thorsteinsson.is/api/playlists/${playlistId}`;
    await fetch(playlistUrl, {
        method: 'PUT',
        body: JSON.stringify(playlistData),
        headers: { 'Content-Type': 'application/json' }
    });
}

export const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        const val = Math.floor(interval);
        return val + " year" + (val > 1 ? "s" : "");
    }

    interval = seconds / 2592000;

    if (interval > 1) {
        const val = Math.floor(interval);
        return val + " month" + (val > 1 ? "s" : "");
    }

    interval = seconds / 86400;

    if (interval > 1) {
        const val = Math.floor(interval);
        return val + " day" + (val > 1 ? "s" : "");
    }

    interval = seconds / 3600;

    if (interval > 1) {
        const val = Math.floor(interval);
        return val + " hour" + (val > 1 ? "s" : "");
    }

    interval = seconds / 60;

    if (interval > 1) {
        const val = Math.floor(interval);
        return val + " minute" + (val > 1 ? "s" : "");
    }

    const val = Math.floor(interval);
    return val + " second" + (val > 1 ? "s" : "");
};
