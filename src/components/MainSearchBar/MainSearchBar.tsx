import styled from "styled-components";
import VideoCardContainer from "../VideoCardContainer";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const SearchResults = styled.div``;

const MainSearchBar = () => {
    const [searchParams] = useSearchParams();

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data } = useSWR(`https://youtube.thorsteinsson.is/api/search?q=${searchParams.get("q")}`, fetcher);

    return (
        <SearchResults>
            {
                (!data) ? (
                    <div>Loading...</div>
                ): <VideoCardContainer videosArray={data} />
            }
        </SearchResults>
    );
};

export default MainSearchBar;