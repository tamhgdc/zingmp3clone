import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import Context from '~/context/context';
import './album.css';
import { URL } from '~/url';
import axios from 'axios';
import Loading from '../../component/LoadingListSong/loading';
import ListAlbumItem from './component/listAlbumItem';

function Album() {
    const context = useContext(Context);
    const [dataSong, setDataSong] = useState({
        items: [],
    });

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [datas, setDatas] = useState({
        Song: [],
        total: 40,
        totalDuration: 10481,
    });

    useEffect(() => {
        axios.get(`${URL}playlist/${window.location.pathname.split('/')[3]}`).then(({ data }) => {
            document.title = data.data.title;
            setDataSong(data.data.song);
            setDatas(data.data);
        });
        context.setInputSearch('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="album">
                {dataSong.items.length > 0 ? (
                    <ListAlbumItem datas={datas} dataSong={dataSong} context={context} />
                ) : (
                    <>
                        <div className="album__detail-img loading">
                            <div className="album__img" />
                        </div>
                        <Loading />
                    </>
                )}
            </div>
        </>
    );
}
export default Album;
