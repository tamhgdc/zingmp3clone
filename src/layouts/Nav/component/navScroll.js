import { Link } from 'react-router-dom';
import config from '~/config';

const navScroll = [
    {
        name: 'Nhạc Mới',
        link: config.routes.newmusic,
        icon: 'icon  ic-24-NewReleaseTab',
    },
    {
        name: 'Thể Loại',
        link: config.routes.hub,
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

function NavScroll() {
    return (
        <div className="navScroll">
            <ul className="navList">
                {navScroll.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={item.link === window.location.pathname.slice(0) ? 'navItem active' : 'navItem'}
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
    );
}

export default NavScroll;
