import { useContext, useEffect, useRef, useState } from 'react';

import Context from '~/context/context';
import secondsToHms from '~/component/FCTime';
import './footer.css';

function Footer() {
    const context = useContext(Context);
    const rangeInputSong = useRef();
    const [value, setValue] = useState(0);
    const rangeInputVolume = useRef();
    const [volume, setVolume] = useState(100);

    function handleInputChange(e) {
        let target = e.target;
        if (e.target.type !== 'range') {
            target = document.getElementById('range');
        }
        const min = target.min;
        const max = target.max;
        const val = target.value;
        setValue(val);
        target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
    }

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

    const audio = useRef();
    const currenttime = useRef();

    const handlePlay = () => {
        context.togglePlay();
        if (context.play) {
            audio.current.pause();
        } else {
            if (audio.current.src) {
                audio.current.play();
            } else {
                alert('Chưa có bài hát nào được chọn');
            }
        }
    };

    const footerImg = useRef();
    const footerInfoTitle = useRef();
    const footerInfoSinger = useRef();
    const totalTime = useRef();
    const btnPrev = useRef();
    const btnNext = useRef();

    const footerPlaylist = useRef();

    useEffect(() => {
        if (context.songList[0].length > 0) {
            const song = context.songList ? context.songList[0][context.indexSong] : {};
            fetch(`http://localhost:8000/api/song/${context.songList[0][context.indexSong].encodeId}`)
                .then((res) => res.json())
                .then((data) => {
                    footerImg.current.src = song.thumbnailM;
                    footerInfoTitle.current.innerHTML = song.title;
                    footerInfoSinger.current.innerHTML = song.artistsNames;
                    totalTime.current.innerHTML = secondsToHms(song.duration);
                    context.playSong();
                    audio.current.src = data.data[128];
                    audio.current.play();
                })
                .catch((err) => {
                    rangeInputSong.current.style.backgroundSize = 0;
                    setValue(0);
                    // alert('Lỗi khi tải bài hát')
                    audio.current.src = '';
                    context.pauseSong();
                    audio.current.pause();
                    if (context.indexSong < context.songList[0].length - 1) {
                        context.currentSong(context.indexSong + 1);
                    } else {
                        context.currentSong(0);
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.indexSong, context.songList[0]]);

    const songTimeUpdate = () => {
        const time = secondsToHms(Math.floor(audio.current.currentTime));
        currenttime.current.innerText = time;
        const currentTime = audio.current.currentTime;
        const duration = audio.current.duration;
        const percentage = Math.floor((currentTime / duration) * 100);
        rangeInputSong.current.style.backgroundSize = percentage + '% 100%';
        rangeInputSong.current.value = percentage;
    };
    const [shuffle, setShuffle] = useState(false);
    const [randomList, setRandomList] = useState([]);
    const handlePrev = () => {
        if (shuffle) {
            if (randomList.length > 1) {
                randomList.pop();
                context.currentSong(randomList[randomList.length - 1]);

                const JSONIndex = JSON.stringify(randomList[randomList.length - 1]);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                context.currentSong(context.indexSong);
                setRandomList([]);
                alert('Đã hết bài hát ramdom');
            }
        } else {
            if (context.indexSong > 0) {
                context.currentSong(context.indexSong - 1);

                const JSONIndex = JSON.stringify(context.indexSong - 1);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                context.currentSong(context.songList[0].length - 1);

                const JSONIndex = JSON.stringify(context.songList[0].length - 1);
                localStorage.setItem('currentIndex', JSONIndex);
            }
        }
        audio.current.pause();
        context.pauseSong();
    };

    const handleNext = () => {
        if (shuffle) {
            let random = Math.floor(Math.random() * context.songList[0].length);
            do {
                random = Math.floor(Math.random() * context.songList[0].length);
            } while (randomList.includes(random));
            if (randomList.length < context.songList[0].length) {
                setRandomList([...randomList, random]);
                context.currentSong(random);

                const JSONIndex = JSON.stringify(random);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                setRandomList([]);
            }
        } else {
            if (context.indexSong < context.songList[0].length - 1) {
                context.currentSong(context.indexSong + 1);

                const JSONIndex = JSON.stringify(context.indexSong + 1);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                context.currentSong(0);

                const JSONIndex = JSON.stringify(0);
                localStorage.setItem('currentIndex', JSONIndex);
            }
        }
        audio.current.pause();
        context.pauseSong();
    };

    const songEnded = () => {
        if (shuffle) {
            let random = Math.floor(Math.random() * context.songList[0].length);
            do {
                random = Math.floor(Math.random() * context.songList[0].length);
            } while (randomList.includes(random));
            if (randomList.length < context.songList[0].length) {
                setRandomList([...randomList, random]);
                context.currentSong(random);

                const JSONIndex = JSON.stringify(random);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                setRandomList([]);
            }
        } else {
            if (context.indexSong < context.songList[0].length - 1) {
                context.currentSong(context.indexSong + 1);

                const JSONIndex = JSON.stringify(context.indexSong + 1);
                localStorage.setItem('currentIndex', JSONIndex);
            } else {
                context.currentSong(0);

                const JSONIndex = JSON.stringify(0);
                localStorage.setItem('currentIndex', JSONIndex);
            }
        }
    };

    const [repeat, setRepeat] = useState(false);

    const handleRepeat = () => {
        setRepeat(!repeat);
        if (repeat) {
            audio.current.loop = false;
        } else {
            audio.current.loop = true;
        }
    };

    const handleRandom = () => {
        setShuffle(!shuffle);
        if (!shuffle) {
            setRandomList([]);
        }
    };

    const handleChangeTimeSong = (e) => {
        const target = e.target;
        const val = target.value;
        const duration = audio.current.duration;
        const percentage = (val / 100) * duration;
        audio.current.currentTime = percentage;
        target.style.backgroundSize = val + '% 100%';
    };

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
        context.currentSong(index);
        context.playSong();

        const JSONIndex = JSON.stringify(index);
        localStorage.setItem('currentIndex', JSONIndex);
    };

    const [playlist, setPlaylist] = useState(false);

    const [hiddenMore, setHiddenMore] = useState(true);

    const handleShowMore = (e) => {
        if (e.target.closest('.footer__more')) {
            setHiddenMore(!hiddenMore);
        }
    };

    document.addEventListener('click', (e) => {
        if (e.target.className !== 'footer__more' && e.target.className !== 'footer__icon-more') {
            setHiddenMore(true);
        }
    });

    return (
        <footer className="footer">
            <div className="footerLeft">
                <div className="footerImg">
                    <img
                        ref={footerImg}
                        className="footerImg"
                        src={
                            context.songList[0].length > 0
                                ? context.songList[0][context.indexSong].thumbnailM
                                : 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/e/a/7/6ea713b2089cde546c5b69c0ee916f16.jpg'
                        }
                        alt=""
                    />
                    <div className={context.play ? 'footer__img-play' : 'footer__img-play hidden'}></div>
                </div>
                <div className="footerInfo">
                    <h3 ref={footerInfoTitle} className="footer__info-title">
                        {context.songList[0].length > 0
                            ? context.songList[0][context.indexSong].title
                            : 'Đám Cưới Nha (Lofi VerSion)'}
                    </h3>
                    <span ref={footerInfoSinger} className="footer__info-singer">
                        {context.songList[0].length > 0
                            ? context.songList[0][context.indexSong].artistsNames
                            : 'Hồng Thanh'}
                    </span>
                </div>
                <div className="footerLike">
                    <input type="checkbox" id="checkHeat" hidden />
                    <label htmlFor="checkHeat" className="like btnLike">
                        <i className="icon footer__icon-like ic-like"></i>
                    </label>
                    <label htmlFor="checkHeat" className="fullLike btnLike">
                        <i className="icon footer__icon-full-like ic-like-full"></i>
                    </label>
                    <div onClick={(e) => handleShowMore(e)} className="footer__more">
                        <i className="icon footer__icon-more ic-more"></i>
                    </div>
                    <div className={hiddenMore ? 'more hidden' : 'more'}></div>
                </div>
            </div>
            <div className="footer__control">
                <div className="controls">
                    <span className="btnControl" onClick={() => handleRandom()}>
                        <i className={shuffle ? 'icon ic-shuffle active' : 'icon ic-shuffle'}></i>
                    </span>
                    <span ref={btnPrev} className="btnControl" onClick={() => handlePrev()}>
                        <i className="icon ic-pre"></i>
                    </span>

                    <span className={context.play ? 'btn-control-toggle hidden' : 'btn-control-toggle '}>
                        <i className="icon footer__control-icon ic-play-circle-outline" onClick={handlePlay}></i>
                    </span>
                    <span className={context.play ? 'btn-control-toggle ' : 'btn-control-toggle hidden'}>
                        <i className="icon footer__control-icon  ic-pause-circle-outline" onClick={handlePlay}></i>
                    </span>
                    <span ref={btnNext} className="btnControl" onClick={() => handleNext()}>
                        <i className="icon ic-next"></i>
                    </span>
                    <span className="btnControl" onClick={() => handleRepeat()}>
                        <i className={repeat ? 'icon ic-repeat active' : 'icon ic-repeat'}></i>
                    </span>
                </div>
                <div className="range">
                    <span ref={currenttime} className="time">
                        00:00
                    </span>
                    <input
                        ref={rangeInputSong}
                        onInput={handleInputChange}
                        id="rangeSlider"
                        className="rangeSlider"
                        type="range"
                        min="1"
                        max="100"
                        value={value}
                        onChange={(e) => handleChangeTimeSong(e)}
                    />
                    <span ref={totalTime} className="totalTime">
                        02:55
                    </span>
                    <audio
                        onTimeUpdate={() => songTimeUpdate()}
                        onEnded={() => songEnded()}
                        ref={audio}
                        id="audio"
                        src={
                            context.songList[0].length > 0
                                ? context.songList[0][context.indexSong].song
                                : 'https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/d2173ae863a98af7d3b8/7483268733970923050?authen=exp=1653470249~acl=/d2173ae863a98af7d3b8/*~hmac=eefbb5837622166c2ee4aeefce781e61&fs=MTY1MzI5NzQ0OTIyNHx3ZWJWNnwxMDYwMTkzMzA0fDEyMy4yMC4yNC4yMDk'
                        }
                    ></audio>
                </div>
            </div>
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
                    <i
                        ref={footerPlaylist}
                        onClick={() => {
                            setPlaylist(!playlist);
                        }}
                        className="icon ic-list-music"
                    ></i>
                </div>
            </div>
            <div className={playlist ? 'footer__playlist-content active' : 'footer__playlist-content'}>
                {context.songList[0].map((item, index) => {
                    return (
                        <div
                            className={context.indexSong === index ? 'list-album-item songActive' : 'list-album-item'}
                            key={index}
                            onClick={() => {
                                handleClick(index);
                            }}
                        >
                            <div className="list-album-song-name song-album-item">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <i className="icon list-album-header-icon ic-song"></i>
                                    <img className="song-album-item-img" src={item.thumbnailM} alt="" />
                                </div>
                                <div className="detail">
                                    <span style={{ color: 'white', marginBottom: '5px' }}>{item.title}</span>
                                    <span>{item.artistsNames}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </footer>
    );
}

export default Footer;
