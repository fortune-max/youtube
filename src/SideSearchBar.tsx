import styled from "styled-components";
import { useState } from "react";
import VideoListContainer from "./VideoListContainer";
import useSWR from "swr";

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 500px;
    justify-content: space-between;
    height: calc(100vh - 120px);
    overflow: auto;
`;

const SearchBar = styled.input`
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 14px;
`;

const SearchResults = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const SideSearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("hello");

    const handleSearchTermChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleKeydown = (event: any) => {
        if (event.key === "Enter")
            setSearchTerm(inputValue);
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