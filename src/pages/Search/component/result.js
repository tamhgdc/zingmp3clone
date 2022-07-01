import { Link, useNavigate } from 'react-router-dom';
import HandlePlay from '~/component/FCHandlePlay';
import secondsToHms from '~/component/FCTime';
import HandleLike from '~/component/HandleLike';
import NoData from './noData';

function Result({ dataSearch, context }) {
    const navigate = useNavigate();

    const audio = document.querySelector('audio');

    const handleMV = (encodeId) => {
        document.querySelector('.modalMV').style.top = '0';
        document.querySelector('.modalMV-bg-opacity').style.top = '0';
        context.pauseSong();
        context.setCheckPlaySong(false);
        if (audio !== null) {
            audio.pause();
        }

        context.setEncodeIdMV(encodeId);
    };

    return (
        <>
            {dataSearch.songs !== undefined && dataSearch.songs.length !== 0 && (
                <div className="songResult">
                    <h3 className="songResult-title">Bài Hát</h3>
                    <Link to={`/search/song/${context.inputSearch}`} className="see-all">
                        <span>TẤT CẢ</span> <i className="icon see-all-icon ic-go-right"></i>
                    </Link>
                    <div className="listAlbum">
                        {dataSearch.songs.map((item, index) => {
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
                                            HandlePlay({ data: dataSearch.songs, index, context });
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
                </div>
            )}

            {dataSearch.playlists !== undefined && dataSearch.playlists.length !== 0 && (
                <div className="songResult">
                    <h3 className="songResult-title">Playlists</h3>
                    <Link to={`/search/playlist/${context.inputSearch}`} className="see-all">
                        <span>TẤT CẢ</span> <i className="icon see-all-icon ic-go-right"></i>
                    </Link>
                    <div className="row boxBanner">
                        {dataSearch.playlists.slice(0, 5).map((items, indexx) => {
                            return (
                                <div className="col sm_gutter l_2_4 m_3 c_4 render-album-item " key={indexx}>
                                    <div className="bannerImg">
                                        <div className="btnImgList">
                                            <img className="imgList " src={items.thumbnail} alt="" />
                                        </div>

                                        <div
                                            className="playSongMain"
                                            onClick={() => navigate(`/detail/album/${items.encodeId}`)}
                                        ></div>
                                        <div className="play-song-control">
                                            <div
                                                className="btnLike"
                                                onClick={() =>
                                                    HandleLike(
                                                        items.encodeId,
                                                        items.thumbnail,
                                                        items.title,
                                                        items.sortDescription,
                                                        indexx,
                                                        context,
                                                    )
                                                }
                                            >
                                                <i className="icon mainListLike ic-like"></i>
                                                {context.indexLike.map((i) => {
                                                    return (
                                                        i.encodeId === items.encodeId && (
                                                            <i
                                                                key={i.encodeId}
                                                                className="icon mainListFullLike ic-like-full"
                                                            ></i>
                                                        )
                                                    );
                                                })}
                                            </div>

                                            <div
                                                className="linkAlbum"
                                                onClick={() => navigate(`/detail/album/${items.encodeId}`)}
                                            >
                                                <i className="icon mainListPlay ic-play-circle-outline"></i>
                                            </div>
                                            <div className="btnLike songMore">
                                                <i className="icon mainListMore ic-more"></i>
                                                <div className="songMoreDetail"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="songName">{items.title}</h3>
                                    <h5 className="songerName">
                                        {items.artists
                                            ? items.artists.map((x, i) =>
                                                  items.artists.length - 1 === i ? x.name : `${x.name}, `,
                                              )
                                            : items.userName}
                                    </h5>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {dataSearch.videos !== undefined && dataSearch.videos.length !== 0 && (
                <div className="songResult">
                    <h3 className="songResult-title">MV</h3>

                    <Link to={`/search/video/${context.inputSearch}`} className="see-all">
                        <span>TẤT CẢ</span> <i className="icon see-all-icon ic-go-right"></i>
                    </Link>
                    <div className="row MV-content">
                        {dataSearch.videos.slice(0, 3).map((item, index) => {
                            return (
                                <div key={index} className="col sm_gutter l_4 m_6 c_12 render-MV-item">
                                    <div className="MV-img">
                                        <img src={item.thumbnailM} alt="" />
                                        <div
                                            className="MV-hover"
                                            onClick={() => {
                                                if (item.streamingStatus !== 2) {
                                                    handleMV(item.encodeId);
                                                } else {
                                                    alert('Cần nâng tài khoản VIP để xem');
                                                }
                                            }}
                                        >
                                            <i className="icon icon-play-MV ic-play-circle-outline"></i>
                                        </div>
                                    </div>
                                    <div className="MV-detail">
                                        {item.artists && <img src={item.artists[0].thumbnailM} alt="" />}
                                        <div className="MV-box-detail">
                                            <span className="MV-title">{item.title}</span>
                                            <span className="MV-singer">
                                                {item.artists &&
                                                    item.artists.map((x, i) =>
                                                        item.artists.length - 1 === i ? x.name : `${x.name}, `,
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {dataSearch.songs === undefined &&
                dataSearch.playlists === undefined &&
                dataSearch.videos === undefined && <NoData context={context} />}
        </>
    );
}

export default Result;
