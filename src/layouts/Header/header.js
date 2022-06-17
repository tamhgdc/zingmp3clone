import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '~/hooks';
import axios from 'axios';

import Context from '~/context/context';
import './header.css';
import { SVGHeader } from '~/images';
import { URL } from '~/url';
import config from '~/config';

function Header() {
    const context = useContext(Context);

    const navigate = useNavigate();
    const suggestSongs = useRef();
    const searchInput = useRef();

    const [input, setInput] = useState('');
    const [suggestSong, setSuggestSong] = useState([]);
    const [suggestTop, setSuggestTop] = useState([]);

    useEffect(() => {
        if (input.length === 0) {
            setSuggestSong([]);
            setSuggestTop([]);
        }
    }, [input]);

    const debouncedValue = useDebounce(input, 500);

    useEffect(() => {
        if (debouncedValue.length === 0) {
            return;
        }
        axios.get(`${URL}search/${debouncedValue}`).then(({ data }) => {
            setSuggestSong(data.data.songs);
            setSuggestTop(data.data.top);
        });
    }, [debouncedValue]);

    const headerInfo = useRef();

    const handleClick = (e) => {
        headerInfo.current.classList.toggle('hidden');
    };

    const handleFocus = (e) => {
        suggestSongs.current.classList.remove('hidden');
    };

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.headerSearch')) {
            suggestSongs.current.classList.add('hidden');
        }
        if (!e.target.closest('.header__info-last')) {
            headerInfo.current.classList.add('hidden');
        }
    });

    const searchDefaultItem = [
        {
            title: 'thương em',
        },
        {
            title: 'trọn vẹn nghĩa',
        },
        {
            title: 'đôi mi',
        },
        {
            title: 'karaoke',
        },
        {
            title: 'radio',
        },
    ];

    const searchDefault = () => {
        return (
            <>
                <h3 className="suggest-song-title">Đề xuất cho bạn</h3>
                <ul className="suggest-song-list">
                    {searchDefaultItem.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    searchInput.current.value = item.title;
                                    suggestSongs.current.classList.add('hidden');
                                    context.setInputSearch(item.title);
                                    navigate(`/search/${item.title}`);
                                }}
                                className="suggest-song-item"
                            >
                                <i className="icon suggest-song-icon ic-trend"></i>
                                <span className="suggest-song-prev">{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    };

    const searchResult = () => {
        return (
            <>
                {suggestTop !== undefined && suggestTop.length !== 0 && (
                    <>
                        <h3 className="suggest-song-title">Top tìm kiếm</h3>
                        <ul className="suggest-song-list">
                            <li
                                onClick={() => {
                                    context.setInputSearch(suggestTop.name || suggestTop.title);
                                    searchInput.current.value = suggestTop.name || suggestTop.title;
                                    navigate(`/search/${searchInput.current.value}`);
                                    suggestSongs.current.classList.add('hidden');
                                }}
                                className="suggest-song-item"
                            >
                                <i className="icon suggest-song-icon ic-trend"></i>
                                <span className="suggest-song-prev">
                                    {suggestTop.name !== undefined ? suggestTop.name : suggestTop.title}
                                </span>
                            </li>
                        </ul>
                    </>
                )}
                {suggestSong !== undefined && suggestSong.length !== 0 && (
                    <>
                        <h3 className="suggest-song-title">Đề xuất cho bạn</h3>
                        <ul className="suggest-song-list">
                            {suggestSong.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            suggestSongs.current.classList.add('hidden');
                                            searchInput.current.value = item.title;
                                            context.setInputSearch(item.title);
                                            navigate(`/search/${item.title}`);
                                        }}
                                        className="suggest-song-item"
                                    >
                                        <i className="icon suggest-song-icon ic-trend"></i>
                                        <span className="suggest-song-prev">{item.title}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </>
        );
    };

    return (
        <header className="header">
            <div className="logo-m" onClick={() => navigate(config.routes.home)}>
                <img
                    className="logoImg-m"
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt="Zing"
                />
            </div>
            <button onClick={() => navigate(-1)} className="btnHeader prevPage active">
                <i className="icon ic-back"></i>
            </button>
            <button onClick={() => navigate(1)} className="btnHeader nextPage">
                <i className="icon ic-forward"></i>
            </button>
            <div className="headerSearch">
                <button
                    onClick={() => {
                        context.setInputSearch(searchInput.current.value);
                        navigate(`/search/${searchInput.current.value}`);
                        suggestSongs.current.classList.add('hidden');
                    }}
                    className="iconSearch"
                >
                    <i style={{ fontSize: '20px' }} className="icon iconSearch ic-search"></i>
                </button>
                <input
                    ref={searchInput}
                    onChange={(e) => {
                        setInput(e.target.value);
                        context.setInputSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            suggestSongs.current.classList.add('hidden');
                            context.setInputSearch(searchInput.current.value);
                            navigate(`/search/${searchInput.current.value}`);
                        }
                    }}
                    onFocus={() => handleFocus()}
                    className="searchInput"
                    type="text"
                    placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                    value={context.inputSearch}
                />
                <div ref={suggestSongs} className="suggestSongs hidden">
                    {(suggestSong !== undefined || suggestTop !== undefined) &&
                    (suggestSong.length !== 0 || suggestTop.length !== 0)
                        ? searchResult()
                        : searchDefault()}
                </div>
            </div>
            <div className="headerRight">
                <button className="circle ">
                    <i className="icon">
                        <SVGHeader />
                    </i>
                    <div className="headerTheme">
                        <span>Chủ đề</span>
                    </div>
                </button>
                <button className="circle ">
                    <i className="icon circleIcon ic-20-VIP-2"></i>
                    <div className="headerVIP">
                        <span>Nâng cấp VIP</span>
                    </div>
                </button>
                <button className="circle ">
                    <i className="icon circleIcon ic-upload"></i>
                    <div className="headerUp">
                        <span>Tải lên</span>
                    </div>
                </button>
                <button className="circle ">
                    <i className="icon circleIcon ic-settings"></i>
                    <div className="headerSetting">
                        <span>Cài đặt</span>
                    </div>
                </button>
                <div className="header__info-last" style={{ position: 'relative' }}>
                    {/* <input type="checkbox" name="" id="check-btn-info" hidden/>  htmlFor="check-btn-info" */}
                    <div onClick={(e) => handleClick(e)} className="circle check-btn-info">
                        <img
                            className="check-btn-img"
                            src="https://s120-ava-talk-zmp3.zmdcdn.me/8/b/9/3/10/120/34dc3b79fce0b96839a43e2cf66ddfde.jpg"
                            alt=""
                        />
                    </div>
                    <div ref={headerInfo} className="headerInfo hidden">
                        <div className="header__info-VIP">
                            <button className="header__info-VIP-link">
                                <i className="icon circleIcon ic-20-VIP-2"></i>
                                <span className="header__info-title">Nâng cấp VIP</span>
                            </button>
                            <button className="header__info-VIP-link">
                                <i className="icon circleIcon ic-20-VIP"></i>
                                <span className="header__info-title">Mua gói VIP</span>
                            </button>
                        </div>
                        <div className="header__info-VIP logout">
                            <button className="header__info-VIP-link">
                                <i className="icon circleIcon ic-log-out"></i>
                                <span className="header__info-title">Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
