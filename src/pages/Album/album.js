import { useContext, useEffect, useState } from 'react';

import Context from '~/context/context';
import secondsToHms from '~/component/FCTime';
import './album.css';

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
        fetch(`http://localhost:8000/api/playlist/${document.URL.slice(-8)}`)
            .then((res) => res.json())
            .then((data) => {
                document.title = data.data.title;
                setDataSong(data.data.song);
                setDatas(data.data);
            });
    }, []);
    console.log(datas);

    const handleClick = (index) => {
        context.addSongList(dataSong.items);
        context.playSong();
        context.currentSong(index);

        const JSONSongList = JSON.stringify(dataSong.items);
        localStorage.setItem('songList', JSONSongList);
        const JSONIndex = JSON.stringify(index);
        localStorage.setItem('currentIndex', JSONIndex);
    };

    const loading = () => {
        return (
            <>
                <div className="album__detail-img loading">
                    <div className="album__img" />
                    <h2 className="albumTitle">{datas.title}</h2>
                    <p className="albumDetail">Cập nhật : {datas.releaseDate}</p>
                    <p className="albumDetail">{datas.artistsNames}</p>
                    <p className="albumDetail">{datas.like} người yêu thích</p>
                </div>
                <div className="listAlbum">
                    <div className="list-album-header">
                        <span className="list-album-song-name">
                            <i className="icon list-album-header-icon ic-24-Sort"></i>BÀI HÁT
                        </span>
                        <span className="list-albums-album">ALBUM</span>
                        <span className="list-albums-time">THỜI GIAN</span>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                    <div className="list-album-item">
                        <div className="list-album-song-name">
                            <div className="loading" style={{ width: '225px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-album">
                            <div className="loading" style={{ width: '150px', height: '35px' }}></div>
                        </div>
                        <div className="list-albums-time">
                            <div className="loading" style={{ width: '80px', height: '35px' }}></div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const listAlbumItem = () => {
        return (
            <>
                <div className="album__detail-img">
                    <img
                        className="album__img"
                        src={
                            datas.thumbnailM ||
                            'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/0/e/0/d/0e0d716e78d3c41be8e661cd7ef3d485.jpg'
                        }
                        alt=""
                    />
                    <h2 className="albumTitle">{datas.title}</h2>
                    <p className="albumDetail">Cập nhật : {datas.releaseDate}</p>
                    <p className="albumDetail">{datas.artistsNames}</p>
                    <p className="albumDetail">{datas.like} người yêu thích</p>
                </div>
                <div className="listAlbum">
                    <div className="description-album">
                        <span>Lời Tựa:</span>
                        <span className="description">{datas.description}</span>
                    </div>
                    <div className="list-album-header">
                        <span className="list-album-song-name">
                            <i className="icon list-album-header-icon ic-24-Sort"></i>BÀI HÁT
                        </span>
                        <span className="list-albums-album">ALBUM</span>
                        <span className="list-albums-time">THỜI GIAN</span>
                    </div>
                    {dataSong.items.map((item, index) => {
                        let time = secondsToHms(item.duration);
                        return (
                            <div
                                className={
                                    context.indexSong === index && context.songList[0][index].encodeId === item.encodeId
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
                                            <span>{item.title}</span>
                                            {item.streamingStatus === 2 && <span className="VIP">VIP</span>}
                                        </div>
                                        <span>{item.artistsNames}</span>
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
            </>
        );
    };
    return (
        <>
            <div className="album">{dataSong.items.length > 0 ? listAlbumItem() : loading()}</div>
        </>
    );
}
export default Album;
