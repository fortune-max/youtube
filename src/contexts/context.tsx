import { createContext, useContext, useState } from "react";

const PlaylistContext = createContext<any>(null);

export const PlaylistProvider = ({ children }: any) => {
    const [youtubeObject, setYoutubeObject] = useState<any>(null);
    const [mountTime, setMountTime] = useState<any>(null);
    const [playlistIdInternal, setPlaylistIdInternal] = useState<any>(null);

    const data = {
        youtubeObject,
        setYoutubeObject,
        mountTime,
        setMountTime,
        playlistIdInternal,
        setPlaylistIdInternal,
    };

    return (
        <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
    );
}

export function usePlaylistFns() {
    const context = useContext<{
        youtubeObject: any;
        setYoutubeObject: (x: any)=>void;
        mountTime: number;
        setMountTime: (x: number)=>void;
        playlistIdInternal: string;
        setPlaylistIdInternal: (x: string)=>void;
    }>(PlaylistContext);
    if (!context)
        throw new Error("usePlaylistFns must be used within a UserProvider");
    return context;
}