import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import Context from '~/context/context';
import './nav.css';
function Nav() {
    const navigation = useNavigate();

    const navTop = [
        {
            name: 'Cá Nhân',
            link: config.routes.mymusic,
            icon: 'icon ic-24-LibraryTab',
        },
        {
            name: 'Khám Phá',
            link: config.routes.home,
            icon: 'icon ic-24-HomeTab',
        },
        {
            name: '#zingchart',
            link: config.routes.zingchart,
            icon: 'icon ic-24-ChartTab',
        },
        {
            name: 'Radio',
            link: config.routes.radio,
            icon: 'icon ic-24-RadioTab',
        },
        {
            name: 'Theo Dõi',
            link: config.routes.follow,
            icon: 'icon ic-24-FeedTab',
        },
    ];

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
            link: '#',
            icon: 'icon  ic-24-Top100Tab',
        },
        {
            name: 'MV',
            link: '#',
            icon: 'icon  ic-24-MVTab',
        },
    ];

    const context = useContext(Context);

    return (
        <nav className={context.songList[0].length > 0 ? 'nav' : 'navFull'}>
            <div className="logo" onClick={() => navigation(config.routes.home)}>
                <img
                    className="logoImg"
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt="Zing"
                />
            </div>
            <div className="navMain">
                <ul className="navList">
                    {navTop.map((item, index) => (
                        <li
                            key={index}
                            className={item.link === window.location.href.slice(21) ? 'navItem active' : 'navItem'}
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
                                className={item.link === window.location.href.slice(21) ? 'navItem active' : 'navItem'}
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
        </nav>
    );
}

export default Nav;
