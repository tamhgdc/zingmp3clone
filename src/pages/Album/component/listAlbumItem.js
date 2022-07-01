import HandlePlay from '~/component/FCHandlePlay';
import secondsToHms from '~/component/FCTime';

function ListAlbumItem({ datas, dataSong, context }) {
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
                                    HandlePlay({ data: dataSong.items, index, context });
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
        </>
    );
}

export default ListAlbumItem;
