import axios from 'axios';
import { useState } from 'react';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import ScrollLoadPage from '~/component/FCScrollLoadPage';
import secondsToHms from '~/component/FCTime';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';
import LoadingSong from './loadingSong';

function Song({ context }) {
    const [suggestSong, setSuggestSong] = useState([]);

    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(context.inputSearch, 500);

    let indexPage = 1;

    const loadDataSong = () => {
        if (debouncedValue.length === 0) {
            setSuggestSong([]);
            return;
        }
        setLoading(true);
        axios
            .get(`${URL}searchAll/${debouncedValue}/${indexPage}/20`)
            .then(({ data }) => {
                const newdata = [];
                if (data.data.items !== undefined) {
                    data.data.items.map((item) => newdata.push(item));
                    setSuggestSong((prev) => [...prev, ...newdata]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        indexPage++;
    };

    ScrollLoadPage(loadDataSong);

    const handleClick = (index) => {
        context.setCheckPlaySong(true);
        context.addSongList(suggestSong);
        context.playSong();
        context.currentSong(index);

        FCSaveLocalList(suggestSong);
        FCSaveLocalIndex(index);
    };

    return (
        <>
            {suggestSong !== undefined && suggestSong.length !== 0 && (
                <div className="songResult">
                    <h3 style={{ fontSize: '20px', marginTop: '60px', marginBottom: '15px' }}>Bài Hát</h3>
                    <div className="listAlbum">
                        {suggestSong.map((item, index) => {
                            let time = secondsToHms(item.duration);
                            return (
                                <div
                                    className={
                                        context.indexSong === index &&
                                        context.songList[0][index].encodeId === item.encodeId
                                            ? 'list-album-item songActive'
                                            : 'list-album-item'
                                    }
                                    key={index}
                                    onClick={() => {
                                        if (item.streamingStatus !== 2) {
                                            context.currentSong(index);
                                            handleClick(index);
                                        }
                                    }}
                                >
                                    {item.streamingStatus === 2 && <div className="modal-vip"></div>}
                                    <div className="list-album-song-name song-album-item">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="icon list-album-header-icon ic-song"></i>
                                            <img className="song-album-item-img" src={item.thumbnailM} alt="" />
                                        </div>
                                        <div className="detail">
                                            <div className="detail-title">
                                                <span className="detail-title-name">{item.title}</span>
                                                {item.streamingStatus === 2 && <span className="VIP">VIP</span>}
                                            </div>
                                            <span className="detail-artist">{item.artistsNames}</span>
                                        </div>
                                    </div>
                                    <div className="list-albums-album">
                                        <span>{item.album ? item.album.title : ''}</span>
                                    </div>
                                    <div className="list-albums-time">
                                        <span>{time}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {loading && <LoadingSong />}
                </div>
            )}
        </>
    );
}

export default Song;
