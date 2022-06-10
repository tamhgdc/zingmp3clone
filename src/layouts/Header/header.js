import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '~/hooks';
import Context from '~/context/context';
import './header.css';
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
        fetch(`http://localhost:8000/api/search/${debouncedValue}`)
            .then((res) => res.json())
            .then((data) => {
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

    // const searchMore = () => {
    //     return (
    //         <>
    //             {(suggestTop === undefined && suggestSong === undefined) ||
    //                 (suggestTop.length !== 0 && suggestSong.length !== 0 && (
    //                     <>
    //                         <h3 className="suggest-song-title">Từ khóa liên quan</h3>
    //                         <ul className="suggest-song-list">
    //                             <li
    //                                 onClick={() => {
    //                                     context.setInputSearch(suggestTop.name || suggestTop.title);
    //                                     searchInput.current.value = suggestTop.name || suggestTop.title;
    //                                     navigate(`/search/${searchInput.current.value}`);
    //                                     suggestSongs.current.classList.add('hidden');
    //                                 }}
    //                                 className="suggest-song-item"
    //                             >
    //                                 <i className="icon suggest-song-icon ic-trend"></i>
    //                                 <span className="suggest-song-prev">{searchInput.current.value}</span>
    //                             </li>
    //                         </ul>
    //                     </>
    //                 ))}
    //         </>
    //     );
    // };

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
            <button onClick={() => navigate(-1)} className="btnHeader prevPage active">
                <i className="icon ic-back"></i>
            </button>
            <button onClick={() => navigate(1)} className="btnHeader nextPage">
                <i className="icon ic-forward"></i>
            </button>
            <div className="headerSearch">
                <button
                    onClick={() => {
                        context.setInputSearch(input);
                        navigate(`/search/${input}`);
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
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <defs>
                                <linearGradient id="j32lhg93hd" x1="62.206%" x2="18.689%" y1="70.45%" y2="39.245%">
                                    <stop offset="0%" stopColor="#F81212"></stop>
                                    <stop offset="100%" stopColor="red"></stop>
                                </linearGradient>
                                <linearGradient id="hjoavsus6g" x1="50%" x2="11.419%" y1="23.598%" y2="71.417%">
                                    <stop offset="0%" stopColor="#00F"></stop>
                                    <stop offset="100%" stopColor="#0031FF"></stop>
                                </linearGradient>
                                <linearGradient id="la1y5u3dvi" x1="65.655%" x2="25.873%" y1="18.825%" y2="56.944%">
                                    <stop offset="0%" stopColor="#FFA600"></stop>
                                    <stop offset="100%" stopColor="orange"></stop>
                                </linearGradient>
                                <linearGradient id="2dsmrlvdik" x1="24.964%" x2="63.407%" y1="8.849%" y2="55.625%">
                                    <stop offset="0%" stopColor="#13EFEC"></stop>
                                    <stop offset="100%" stopColor="#00E8DF"></stop>
                                </linearGradient>
                                <filter
                                    id="4a7imk8mze"
                                    width="230%"
                                    height="230%"
                                    x="-65%"
                                    y="-65%"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                                </filter>
                                <filter
                                    id="301mo6jeah"
                                    width="312.7%"
                                    height="312.7%"
                                    x="-106.4%"
                                    y="-106.4%"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                                </filter>
                                <filter
                                    id="b2zvzgq7fj"
                                    width="295%"
                                    height="295%"
                                    x="-97.5%"
                                    y="-97.5%"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                                </filter>
                                <filter
                                    id="a1wq161tvl"
                                    width="256%"
                                    height="256%"
                                    x="-78%"
                                    y="-78%"
                                    filterUnits="objectBoundingBox"
                                >
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.9"></feGaussianBlur>
                                </filter>
                                <path
                                    id="qtpqrj1oda"
                                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                                ></path>
                                <path id="jggzvnjgfc" d="M0 0H20V20H0z"></path>
                                <path
                                    id="2eiwxjmc7m"
                                    d="M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z"
                                ></path>
                            </defs>
                            <g fill="none" fillRule="evenodd" transform="translate(2 3)">
                                <mask id="tinejqaasb" fill="#fff">
                                    <use xlinkHref="#qtpqrj1oda"></use>
                                </mask>
                                <use fill="#FFF" fillOpacity="0" xlinkHref="#qtpqrj1oda"></use>
                                <g mask="url(#tinejqaasb)">
                                    <g transform="translate(-2 -3)">
                                        <mask id="uf3ckvfvpf" fill="#fff">
                                            <use xlinkHref="#jggzvnjgfc"></use>
                                        </mask>
                                        <use fill="#D8D8D8" xlinkHref="#jggzvnjgfc"></use>
                                        <circle
                                            cx="8.9"
                                            cy="6.8"
                                            r="9"
                                            fill="url(#j32lhg93hd)"
                                            filter="url(#4a7imk8mze)"
                                            mask="url(#uf3ckvfvpf)"
                                        ></circle>
                                        <circle
                                            cx="9.3"
                                            cy="13.7"
                                            r="5.5"
                                            fill="url(#hjoavsus6g)"
                                            filter="url(#301mo6jeah)"
                                            mask="url(#uf3ckvfvpf)"
                                        ></circle>
                                        <circle
                                            cx="15.9"
                                            cy="6.9"
                                            r="6"
                                            fill="url(#la1y5u3dvi)"
                                            filter="url(#b2zvzgq7fj)"
                                            mask="url(#uf3ckvfvpf)"
                                        ></circle>
                                        <circle
                                            cx="16.4"
                                            cy="17.7"
                                            r="7.5"
                                            fill="url(#2dsmrlvdik)"
                                            filter="url(#a1wq161tvl)"
                                            mask="url(#uf3ckvfvpf)"
                                        ></circle>
                                    </g>
                                </g>
                                <use fill="#FFF" fillOpacity="0.05" xlinkHref="#2eiwxjmc7m"></use>
                            </g>
                        </svg>
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
