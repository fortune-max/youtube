import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 500px;
    justify-content: space-between;
    height: calc(100vh - 120px);
    overflow: auto;
`;

export const SearchBar = styled.input`
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 14px;
`;

export const SearchResults = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
`;