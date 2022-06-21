import { Link } from 'react-router-dom';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import secondsToHms from '~/component/FCTime';

function Result({ suggestSong, context }) {
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
                    <Link to={`/search-all/${context.inputSearch}`} className="see-all">
                        <span>TẤT CẢ</span> <i className="icon see-all-icon ic-go-right"></i>
                    </Link>
                    <ul className="boxSongResult">
                        {suggestSong.map((item, index) => {
                            let time = secondsToHms(item.duration);
                            return (
                                <li
                                    onClick={() => {
                                        handleClick(index);
                                    }}
                                    key={index}
                                    className={
                                        context.indexSong === index &&
                                        context.songList[0][index].encodeId === item.encodeId
                                            ? 'boxSongResultItem songActive'
                                            : 'boxSongResultItem'
                                    }
                                >
                                    <div className="songResultLink">
                                        <div className="songResultDetail">
                                            <img className="songResultDetailImg" src={item.thumbnail} alt="" />
                                            <div className="boxSearchTopDetail">
                                                <h4 className="searchTopSinger">{item.title}</h4>
                                                <p className="searchTopTitle">{item.artistsNames}</p>
                                            </div>
                                        </div>
                                        <span className="songResultAlbum">
                                            {item.album !== undefined ? item.album.title : ''}
                                        </span>

                                        <span className="songResultTime">{time}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}

export default Result;
