import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import secondsToHms from '~/component/FCTime';
import Context from '~/context/context';
import { useDebounce } from '~/hooks';
import './search.css';

function Search() {
    const context = useContext(Context);

    const navigate = useNavigate();

    const [suggestSong, setSuggestSong] = useState([]);
    const [suggestTop, setSuggestTop] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputSearch = document.querySelector('.searchInput');
    const iconSearch = document.querySelector('.iconSearch');
    try {
        inputSearch.onkeydown = function (e) {
            if (e.keyCode === 13) {
                context.setInputSearch(e.target.value);
                inputSearch.blur();
            }
        };

        iconSearch.onclick = function () {
            context.setInputSearch(inputSearch.value);
        };
    } catch (error) {}

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setInputSearch(decodeURI(window.location.href.slice(29)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const debouncedValue = useDebounce(context.inputSearch, 500);

    useEffect(() => {
        if (debouncedValue.length === 0) {
            setSuggestSong([]);
            setSuggestTop([]);
            return;
        }
        setLoading(true);
        fetch(`http://localhost:8000/api/search/${debouncedValue}`)
            .then((res) => res.json())
            .then((data) => {
                setSuggestSong(data.data.songs);
                setSuggestTop(data.data.top);
            })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [debouncedValue]);

    const handleClick = (index) => {
        context.addSongList(suggestSong);
        context.playSong();
        context.currentSong(index);

        const JSONSongList = JSON.stringify(suggestSong);
        localStorage.setItem('songList', JSONSongList);
        const JSONIndex = JSON.stringify(index);
        localStorage.setItem('currentIndex', JSONIndex);
    };

    const handleClickTop = () => {
        if (suggestTop.title === undefined) {
            alert('singer');
        } else if (suggestTop.sortDescription === undefined) {
            context.addSongList([suggestTop]);
            context.playSong();
            context.currentSong(0);
        } else {
            navigate(`/detail/album/${suggestTop.encodeId}`);
        }
    };

    const searchResult = () => {
        return (
            <>
                {loading ? (
                    <div style={{ display: 'flex' }}>
                        <div className="loader"></div>&emsp;<span>loading...</span>
                    </div>
                ) : (
                    <>
                        <div className="searchResult">
                            {suggestTop !== undefined && suggestTop.length !== 0 && (
                                <div className="topSearch">
                                    <h3 style={{ fontSize: '20px' }}>Top Kết Quả "{context.inputSearch}"</h3>
                                    <div className="boxSearchTop" onClick={handleClickTop}>
                                        <div className="boxSearchTopImg">
                                            <img style={{ width: '100%' }} src={suggestTop.thumbnail} alt="" />
                                        </div>
                                        <div className="boxSearchTopDetail">
                                            <h4 className="searchTopSinger">{suggestTop.title || suggestTop.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {suggestSong !== undefined && suggestSong.length !== 0 && (
                                <div className="songResult">
                                    <h3 style={{ fontSize: '20px', marginTop: '60px', marginBottom: '15px' }}>
                                        Bài Hát
                                    </h3>
                                    <ul className="boxSongResult">
                                        {suggestSong.map((item, index) => {
                                            let time = secondsToHms(item.duration);
                                            return (
                                                <li
                                                    onClick={() => {
                                                        handleClick(index);
                                                    }}
                                                    key={index}
                                                    className="boxSongResultItem"
                                                >
                                                    <div className="songResultLink">
                                                        <div className="songResultDetail">
                                                            <img
                                                                className="songResultDetailImg"
                                                                src={item.thumbnail}
                                                                alt=""
                                                            />
                                                            <div className="boxSearchTopDetail">
                                                                <h4 className="searchTopSinger">{item.title}</h4>
                                                                <p className="searchTopTitle">{item.artistsNames}</p>
                                                            </div>
                                                        </div>
                                                        <span className="songResultAlbum">
                                                            {item.album !== undefined ? item.album.title : ''}
                                                        </span>

                                                        <span className="songResultTime">{time}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {suggestSong === undefined && suggestTop === undefined
                                ? context.inputSearch && (
                                      <>
                                          <div className="searchResult">
                                              <div className="topSearch">
                                                  <h3 style={{ fontSize: '20px' }}>
                                                      {`Không Có Kết Quả Phù Hợp Cho "${inputSearch.value}"`}
                                                  </h3>
                                              </div>
                                          </div>
                                      </>
                                  )
                                : !context.inputSearch && (
                                      <div className="searchResult">
                                          <div className="topSearch">
                                              <h3 style={{ fontSize: '20px' }}>{'Nhập Từ Khóa Cần Tìm'}</h3>
                                          </div>
                                      </div>
                                  )}
                        </div>
                    </>
                )}
            </>
        );
    };

    return <>{searchResult()}</>;
}

export default Search;
