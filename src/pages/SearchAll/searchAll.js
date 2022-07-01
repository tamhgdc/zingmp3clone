import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Loading from '~/component/FCLoading';

import Context from '~/context/context';
import Playlist from './component/playlsit';
import Song from './component/song';
import Video from './component/video';
import './searchAll.css';

function SearchAll() {
    const context = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setInputSearch(decodeURI(window.location.pathname.split('/')[3]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchResult = () => {
        return (
            <>
                <div className="searchResult">
                    {window.location.pathname.split('/')[2] === 'song' && (
                        <Song
                            context={context}
                            loading={loading}
                            setLoading={setLoading}
                            dataList={dataList}
                            setDataList={setDataList}
                        />
                    )}

                    {window.location.pathname.split('/')[2] === 'playlist' && (
                        <Playlist
                            context={context}
                            loading={loading}
                            setLoading={setLoading}
                            dataList={dataList}
                            setDataList={setDataList}
                        />
                    )}

                    {window.location.pathname.split('/')[2] === 'video' && (
                        <Video
                            context={context}
                            loading={loading}
                            setLoading={setLoading}
                            dataList={dataList}
                            setDataList={setDataList}
                        />
                    )}
                    {loading && <Loading height="unset" />}
                </div>
            </>
        );
    };

    return <>{searchResult()}</>;
}

export default SearchAll;
