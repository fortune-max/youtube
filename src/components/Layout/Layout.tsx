import { Outlet, Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { LayoutContainer, Header, Logo, SearchBarContainer, SearchBar, OutletWrapper, NavWrapper } from "./Layout.styled";
import youtubeLogo from "../../youtube_logo.png";
import { useState } from "react";
import { PlaylistProvider } from "../../contexts/context";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleKeydown = (event: any) => {
        if (event.key === "Enter")
            navigate(`/search?q=${searchTerm || "hello"}`);
    };

    return (
        <LayoutContainer>
            <Header>
                <Link to="/">
                    <Logo src={youtubeLogo} alt="youtube logo"/>
                </Link>
                {location.pathname === "/" || location.pathname.startsWith("/search") ? (
                    <SearchBarContainer>
                        <SearchBar value={searchTerm} type="text" placeholder="Search" onKeyDown={handleKeydown} onChange={handleOnChange} />
                    </SearchBarContainer>
                ): null}
                <NavWrapper>
                    <NavLink to="/playlist">Playlists</NavLink>
                </NavWrapper>
            </Header>
            <OutletWrapper>
                <PlaylistProvider>
                    <Outlet />
                </PlaylistProvider>
            </OutletWrapper>
        </LayoutContainer>
    );
}

export default Layout;