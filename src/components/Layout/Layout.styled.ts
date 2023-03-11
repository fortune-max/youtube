import styled from "styled-components";

export const LayoutContainer = styled.div`
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1;
    border-bottom: 1px solid #f0f0f0;
`;

export const Logo = styled.img`
    width: 100px;
    margin-left: 20px;
`;

export const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const SearchBar = styled.input`
    width: 600px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 50px;
    padding: 0 10px;
    font-size: 14px;
`;

export const NavWrapper = styled.div`
    position: absolute;
    right: 30px;
`;

export const OutletWrapper = styled.div`
    margin-top: 80px;
    padding: 20px;
    min-height: calc(100vh - 120px);
`;