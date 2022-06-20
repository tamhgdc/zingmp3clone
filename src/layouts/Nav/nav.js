import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navTop from '~/component/NavTopData';
import config from '~/config';
import Context from '~/context/context';
import './nav.css';
function Nav() {
    const navigation = useNavigate();

    const navScroll = [
        {
            name: 'Nhạc Mới',
            link: config.routes.newmusic,
            icon: 'icon  ic-24-NewReleaseTab',
        },
        {
            name: 'Thể Loại',
            link: '#',
            icon: 'icon  ic-24-GenreTab',
        },
        {
            name: 'Top 100',
            link: config.routes.top100,
            icon: 'icon  ic-24-Top100Tab',
        },
        {
            name: 'MV',
            link: '/mv/viet-nam/IWZ9Z08I',
            icon: 'icon  ic-24-MVTab',
        },
    ];

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
            <div className="logo" onClick={() => navigation(config.routes.home)}>
                <img
                    className="logoImg"
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt="Zing"
                />
                {showNavMobile ? (
                    <img
                        className="logoImgMb"
                        style={{ width: '100px', marginLeft: '-40px' }}
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                        alt="Zing"
                    />
                ) : (
                    <img
                        className="logoImgMb"
                        style={{ width: '30px' }}
                        src="https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png"
                        alt="Zing"
                    />
                )}
            </div>
            <div className="navMain">
                <ul className="navList">
                    {navTop.map((item, index) => (
                        <li
                            key={index}
                            className={item.link === window.location.pathname.slice(0) ? 'navItem active' : 'navItem'}
                        >
                            <Link to={item.link} className="nav__item-link">
                                <i className={item.icon}></i>
                                <span className="navTitle">{item.name}</span>
                                {item.name === 'Theo Dõi' ? '' : <i className="icon iconHover ic-20-Play-Outline"></i>}
                                {item.name === 'Radio' && (
                                    <div className="navLive">
                                        <span>LIVE</span>
                                    </div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navDivide"></div>
            <div className="navScroll">
                <ul className="navList">
                    {navScroll.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    item.link === window.location.pathname.slice(0) ? 'navItem active' : 'navItem'
                                }
                            >
                                <Link to={item.link} className="nav__item-link">
                                    <i className={item.icon}></i>
                                    <span className="navTitle">{item.name}</span>
                                    {item.name === 'Nhạc Mới' && <i className="icon iconHover ic-20-Play-Outline"></i>}
                                </Link>
                            </li>
                        );
                    })}

                    <li className="navItem">
                        <label className="nav__item-link">
                            <div className="navAdv">
                                <span className="nav__adv-title">Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                                <button href="#" className="nav__adv-link">
                                    NÂNG CẤP VIP
                                </button>
                            </div>
                        </label>
                    </li>
                    <div className="navLibrary ">
                        <div className="nav__library-icon">
                            <i className="icon icon-library ic-edit"></i>
                        </div>
                        <li className="navItem nav__library-title">
                            <span>Thư Viện</span>
                        </li>
                        <li className="navItem">
                            <button href="#" className="nav__item-link">
                                <i className="icon">
                                    <img
                                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg"
                                        alt=""
                                    />
                                </i>
                                <span className="navTitle">Bài Hát</span>
                                <i className="icon iconHover ic-20-Play-Outline"></i>
                            </button>
                        </li>
                        <li className="navItem">
                            <button href="#" className="nav__item-link">
                                <i className="icon">
                                    <img
                                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                                        alt=""
                                    />
                                </i>
                                <span className="navTitle">Playlist</span>
                            </button>
                        </li>
                        <li className="navItem">
                            <button href="#" className="nav__item-link">
                                <i className="icon">
                                    <img
                                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg"
                                        alt=""
                                    />
                                </i>
                                <span className="navTitle">Gần Đây</span>
                            </button>
                        </li>
                    </div>
                </ul>
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
