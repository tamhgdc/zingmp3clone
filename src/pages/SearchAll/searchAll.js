import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import ScrollLoadPage from '~/component/FCScrollLoadPage';

import secondsToHms from '~/component/FCTime';
import Context from '~/context/context';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';
import './searchAll.css';

function SearchAll() {
    const context = useContext(Context);

    const [suggestSong, setSuggestSong] = useState([]);

    const [loading, setLoading] = useState(false);

    const inputSearch = document.querySelector('.searchInput');

    const debouncedValue = useDebounce(context.inputSearch, 500);

    let indexPage = 1;

    const loadData = () => {
        if (debouncedValue.length === 0) {
            setSuggestSong([]);
            return;
        }
        setLoading(true);
        axios.get(`${URL}searchAll/${debouncedValue}/${indexPage}/20`).then(({ data }) => {
            const newdata = [];
            data.data.items.forEach((item) => newdata.push(item));
            setSuggestSong((prev) => [...prev, ...newdata]);
        });
        setLoading(false);
        indexPage++;
    };

    ScrollLoadPage(loadData, setLoading);

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setInputSearch(decodeURI(window.location.pathname.slice(12)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = (index) => {
        context.setCheckPlaySong(true);
        context.addSongList(suggestSong);
        context.playSong();
        context.currentSong(index);

        FCSaveLocalList(suggestSong);
        FCSaveLocalIndex(index);
    };

    const searchResult = () => {
        return (
            <>
                <div className="searchResult">
                    {suggestSong !== undefined && suggestSong.length !== 0 && (
                        <div className="songResult">
                            <h3 style={{ fontSize: '20px', marginTop: '60px', marginBottom: '15px' }}>Bài Hát</h3>
                            <ul className="boxSongResult">
                                {suggestSong.map((item, index) => {
                                    let time = secondsToHms(item.duration);
                                    return (
                                        <li
                                            onClick={() => {
                                                handleClick(index);
                                            }}
                                            key={index}
                                            className={
                                                context.indexSong === index &&
                                                context.songList[0][index].encodeId === item.encodeId
                                                    ? 'boxSongResultItem songActive'
                                                    : 'boxSongResultItem'
                                            }
                                        >
                                            <div className="songResultLink">
                                                <div className="songResultDetail">
                                                    <img className="songResultDetailImg" src={item.thumbnail} alt="" />
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
                    {suggestSong === undefined
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
                {loading && (
                    <div style={{ display: 'flex' }}>
                        <div className="loader"></div>&emsp;<span>loading...</span>
                    </div>
                )}
            </>
        );
    };

    return <>{searchResult()}</>;
}

export default SearchAll;
