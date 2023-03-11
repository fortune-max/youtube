import useSWR from "swr";
import { useState } from "react";
import VideoListContainer from "../VideoListContainer";
import { SearchBar, SearchContainer, SearchResults } from "./SideSearchBar.styled";

const SideSearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("hello");

    const handleSearchTermChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleKeydown = (event: any) => {
        if (event.key === "Enter")
            setSearchTerm(inputValue || "hello");
    };

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/search?q=${searchTerm}`, fetcher);

    return (
        <SearchContainer>
            <SearchBar type="text" value={inputValue} onChange={handleSearchTermChange} onKeyDown={handleKeydown} placeholder="Search" />
            <SearchResults>
                {
                    (!data) ? (
                        <div>Loading...</div>
                    ): <VideoListContainer videosArray={data} />
                }
            </SearchResults>
        </SearchContainer>
    );
};

export default SideSearchBar;