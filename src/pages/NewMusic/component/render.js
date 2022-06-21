import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import secondsToHms from '~/component/FCTime';

function Render({ data, context }) {
    const handelPlay = (index) => {
        context.setCheckPlaySong(true);
        context.addSongList(data.items);
        context.playSong();
        context.currentSong(index);

        FCSaveLocalList(data.items);
        FCSaveLocalIndex(index);
    };

    return (
        <div style={{ marginTop: '30px' }}>
            {data.length !== 0 &&
                data.items.map((item, index) => {
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
                                handelPlay(index);
                            }}
                        >
                            <div className="list-album-song-name song-album-item">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="new-music__top">
                                        <h1
                                            className={
                                                index === 0
                                                    ? 'new-music__top-num top1'
                                                    : index === 1
                                                    ? 'new-music__top-num top2'
                                                    : index === 2
                                                    ? 'new-music__top-num top3'
                                                    : 'new-music__top-num'
                                            }
                                        >
                                            {index + 1}
                                        </h1>{' '}
                                        {item.rakingStatus !== 0 ? (
                                            <div className="new-music__top-rakingStatus">
                                                <div
                                                    className={
                                                        item.rakingStatus > 0
                                                            ? 'new-music__top-statusRaking'
                                                            : 'new-music__top-statusRaking negative'
                                                    }
                                                ></div>
                                                <h3>{Math.abs(item.rakingStatus)}</h3>
                                            </div>
                                        ) : (
                                            <i className="icon new-music__top-icon grey ic-balance"></i>
                                        )}
                                    </div>
                                    <img className="song-album-item-img" src={item.thumbnailM} alt="" />
                                </div>
                                <div className="detail">
                                    <span style={{ color: 'white', marginBottom: '5px' }}>{item.title}</span>
                                    <span>{item.artistsNames}</span>
                                </div>
                            </div>
                            <div className="list-albums-album">
                                <span>{item.album ? item.album.title : null}</span>
                            </div>
                            <div className="list-albums-time">
                                <span>{time}</span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Render;
