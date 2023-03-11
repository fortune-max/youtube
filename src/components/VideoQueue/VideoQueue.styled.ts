import styled from "styled-components";

export const VideoQueueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(100vh - 167.5px);
    overflow: scroll;
`;

export const QueueWrapper = styled.div<{active?: boolean}>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.active ? "lightblue" : "white"};
    cursor: pointer;
`;

export const Button = styled.button`
    background-color: white;
    cursor: pointer;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
`;