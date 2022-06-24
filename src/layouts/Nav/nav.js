import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '~/context/context';
import Logo from './component/logo';
import NavMain from './component/navMain';
import NavScroll from './component/navScroll';
import './nav.css';
function Nav() {
    const navigation = useNavigate();

    const context = useContext(Context);

    const [showNavMobile, setShowNavMobile] = useState(false);
    const nav = useRef();
    const handleShowNav = () => {
        setShowNavMobile(!showNavMobile);
    };

    return (
        <nav
            ref={nav}
            className={
                context.songList[0].length > 0
                    ? showNavMobile
                        ? 'nav show-nav'
                        : 'nav'
                    : showNavMobile
                    ? 'navFull show-nav'
                    : 'navFull'
            }
        >
            <Logo navigation={navigation} showNavMobile={showNavMobile} />

            <div className="nav-content">
                <NavMain />

                <div className="navDivide"></div>

                <NavScroll />
            </div>

            <div className="nav__new-playlist">
                <i className="icon  ic-add"></i>
                <span className="navTitle">Tạo playlist mới</span>
            </div>

            {showNavMobile ? (
                <div onClick={handleShowNav} className="btnBanner show-nav-btn right nextBtnBanner ">
                    <i className="icon ic-go-left"></i>
                </div>
            ) : (
                <div onClick={handleShowNav} className="btnBanner show-nav-btn nextBtnBanner ">
                    <i className="icon ic-go-right"></i>
                </div>
            )}
        </nav>
    );
}

export default Nav;
