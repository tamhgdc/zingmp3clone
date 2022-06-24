import { useContext, useEffect, useLayoutEffect } from 'react';

import Context from '~/context/context';
import Playlist from './component/playlsit';
import Song from './component/song';
import Video from './component/video';
import './searchAll.css';

function SearchAll() {
    const context = useContext(Context);

    // const inputSearch = document.querySelector('.searchInput');

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setInputSearch(decodeURI(window.location.pathname.split('/')[3]));
        }
        if (context.keywordSearch.length === 0) {
            context.setKeywordSearch(decodeURI(window.location.pathname.split('/')[3]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchResult = () => {
        return (
            <>
                <div className="searchResult">
                    {window.location.pathname.split('/')[2] === 'song' && <Song context={context} />}

                    {window.location.pathname.split('/')[2] === 'playlist' && <Playlist context={context} />}

                    {window.location.pathname.split('/')[2] === 'video' && <Video context={context} />}

                    {/* {suggestSong === undefined
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
                          )} */}
                </div>
                {/* {loading && (
                    <div style={{ display: 'flex' }}>
                        <div className="loader"></div>&emsp;<span>loading...</span>
                    </div>
                )} */}
            </>
        );
    };

    return <>{searchResult()}</>;
}

export default SearchAll;
