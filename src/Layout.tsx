import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import youtubeLogo from "./youtube_logo.png";

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

const OutletWrapper = styled.div`
    margin-top: 80px;
    padding: 20px;
    min-height: calc(100vh - 120px);
`;

const Layout = () => {
  return (
    <LayoutContainer>
        <Header>
            <Link to="/">
                <Logo src={youtubeLogo} alt="youtube logo"/>
            </Link>
        </Header>
        
        <OutletWrapper>
            <Outlet />
        </OutletWrapper>
    </LayoutContainer>
  );
}

export default Layout;