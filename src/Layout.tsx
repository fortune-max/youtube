import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import youtubeLogo from "./youtube_logo.png";
import { useState } from "react";

const LayoutContainer = styled.div`
    position: relative;
`;

const Header = styled.div`
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

const Logo = styled.img`
    width: 100px;
    margin-left: 20px;
`;

const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const SearchBar = styled.input`
    width: 600px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 50px;
    padding: 0 10px;
    font-size: 14px;
`;

const OutletWrapper = styled.div`
    margin-top: 80px;
    padding: 20px;
    min-height: calc(100vh - 120px);
`;

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleKeydown = (event: any) => {
        if (event.key === "Enter")
            navigate(`/search?q=${searchTerm}`);
    };

    return (
        <LayoutContainer>
            <Header>
                <Link to="/">
                    <Logo src={youtubeLogo} alt="youtube logo"/>
                </Link>
                {location.pathname.startsWith("/video/") ? null : (
                    <SearchBarContainer>
                        <SearchBar value={searchTerm} type="text" placeholder="Search" onKeyDown={handleKeydown} onChange={handleOnChange} />
                    </SearchBarContainer>
                )}
            </Header>

            <OutletWrapper>
                <Outlet />
            </OutletWrapper>
        </LayoutContainer>
    );
}

export default Layout;