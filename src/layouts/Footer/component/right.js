import { useRef, useState } from 'react';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';

function RightFooter({ context, audio }) {
    const rangeInputVolume = useRef();
    const [volume, setVolume] = useState(100);

    function handleInputChangeVolume(e) {
        let target = e.target;
        if (e.target.type !== 'range') {
            target = document.getElementById('range');
        }
        const min = target.min;
        const max = target.max;
        const val = target.value;
        setVolume(val);
        target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
    }

    const footerPlaylist = useRef();

    const handleChangeVolume = (e) => {
        const target = e.target;
        const val = target.value;
        const percentage = val / 100;
        audio.current.volume = percentage;
        target.style.backgroundSize = val + '% 100%';
    };

    const [mute, setMute] = useState(true);

    const handleMute = () => {
        audio.current.muted = !audio.current.muted;
        setMute(!mute);
    };

    const handleClick = (index) => {
        context.setCheckPlaySong(true);
        context.currentSong(index);
        context.playSong();

        FCSaveLocalIndex(index);
    };
    const [playlist, setPlaylist] = useState(false);

    document.onclick = (e) => {
        if (e.target.closest('.footer__playlist')) {
            setPlaylist(!playlist);
            list.current.scrollTo({ top: songActive.current.offsetTop, behavior: 'smooth' });
            return;
        }
        if (!e.target.closest('.footer__playlist-content')) {
            if (playlist === true) {
                setPlaylist(false);
            }
        }
    };

    const list = useRef();
    const songActive = useRef();

    return (
        <>
            <div className="footerRight">
                <div className="controls">
                    <span className="btnControl footer__right-control">
                        <i className="icon  ic-mv"></i>
                    </span>
                    <span className="btnControl footer__right-control">
                        <i className="icon  ic-karaoke"></i>
                    </span>
                    <span className="btnControl footer__right-control">
                        <i className="icon  ic-restore"></i>
                    </span>
                    <span onClick={() => handleMute()} className="btnControl footer__right-control">
                        {mute ? <i className="icon  ic-volume"></i> : <i className="icon  ic-volume-mute"></i>}
                    </span>
                    <input
                        ref={rangeInputVolume}
                        onInput={handleInputChangeVolume}
                        id="rangeSliderVolume"
                        className="volume"
                        type="range"
                        min="1"
                        max="100"
                        value={volume}
                        onChange={(e) => handleChangeVolume(e)}
                    />
                </div>
                <div className="footer__playlist">
                    <i ref={footerPlaylist} className="icon ic-list-music"></i>
                </div>
            </div>
            <div ref={list} className={playlist ? 'footer__playlist-content active' : 'footer__playlist-content'}>
                {context.songList[0].map((item, index) => {
                    return (
                        <div
                            ref={context.indexSong === index ? songActive : null}
                            className={context.indexSong === index ? 'list-album-item songActive' : 'list-album-item'}
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
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RightFooter;
