import HandlePlay from '~/component/FCHandlePlay';
import secondsToHms from '~/component/FCTime';

function Top10({ chart, context, slice }) {
    return (
        <>
            <>
                {chart.length !== 0 &&
                    chart.RTChart.items.slice(0, slice).map((item, index) => {
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
                                    HandlePlay({ data: chart.RTChart.items, index, context });
                                }}
                            >
                                <div className="list-album-song-name song-album-item">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="zingchart__top">
                                            <h1
                                                className={
                                                    index === 0
                                                        ? 'zingchart__top-num top1'
                                                        : index === 1
                                                        ? 'zingchart__top-num top2'
                                                        : index === 2
                                                        ? 'zingchart__top-num top3'
                                                        : 'zingchart__top-num'
                                                }
                                            >
                                                {index + 1}
                                            </h1>
                                            {item.rakingStatus !== 0 ? (
                                                <div className="zingchart__top-rakingStatus">
                                                    <div
                                                        className={
                                                            item.rakingStatus > 0
                                                                ? 'zingchart__top-statusRaking'
                                                                : 'zingchart__top-statusRaking negative'
                                                        }
                                                    ></div>
                                                    <h3>{Math.abs(item.rakingStatus)}</h3>
                                                </div>
                                            ) : (
                                                <i className="icon zingchart__top-icon grey ic-balance"></i>
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
            </>
        </>
    );
}

export default Top10;
