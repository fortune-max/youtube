import styled from 'styled-components';

export const ItemContainer = styled.div<{hasButtons?:boolean}>`
    display: inline-flex;
    flex-direction: row;
    padding: 4px;
    min-width: 30vw;
    justify-content: ${props => props.hasButtons ? "flex-start" : "space-between"};
`;

export const ItemSubContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Thumbnail = styled.img`
    min-width: 168px;
    width: 168px;
    height: 94px;
    border-radius: 8px;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
`;

export const Button = styled.button`
    background-color: white;
    cursor: pointer;
`;

export const VideoInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;
    gap: 5px;
`;

export const VideoTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    max-width: 30vw;
    max-height: 20px;
    overflow: hidden;
`;

export const VideoChannel = styled.div`
    font-size: 14px;
    color: #999;
`;

export const VideoViews = styled.div`
    font-size: 14px;
    color: #999;
`;