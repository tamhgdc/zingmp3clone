import { useContext, useEffect, useState } from 'react';

import Context from '~/context/context';
import secondsToHms from '~/component/FCTime';
import './album.css';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import { URL } from '~/url';
import axios from 'axios';
import Loading from './component/loading';
import ListAlbumItem from './component/listAlbumItem';

function Album() {
    const context = useContext(Context);
    const [dataSong, setDataSong] = useState({
        items: [],
    });

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
    }, []);

    return (
        <>
            <div className="album">
                {dataSong.items.length > 0 ? (
                    <ListAlbumItem datas={datas} dataSong={dataSong} context={context} />
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
}
export default Album;
