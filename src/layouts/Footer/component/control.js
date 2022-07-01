import { useState } from 'react';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import secondsToHms from '~/component/FCTime';
import { SVGLoadingSong } from '~/images';

function Control({
    context,
    audio,
    setValue,
    value,
    currenttime,
    rangeInputSong,
    btnPrev,
    btnNext,
    totalTime,
    loading,
}) {
    const handlePlay = () => {
        context.togglePlay();
        if (context.play) {
            context.setCheckPlaySong(false);
            audio.current.pause();
        } else {
            if (audio.current.src) {
                context.setCheckPlaySong(true);
                audio.current.play();
            } else {
                context.setCheckPlaySong(false);
                audio.current.pause();
                context.pauseSong();
                alert('Đợi xíu nhé');
            }
        }
    };

    const [shuffle, setShuffle] = useState(false);
    const [randomList, setRandomList] = useState([]);

    const handleNext = () => {
        if (shuffle) {
            let random = Math.floor(Math.random() * context.songList[0].length);
            do {
                random = Math.floor(Math.random() * context.songList[0].length);
            } while (randomList.includes(random));
            if (randomList.length < context.songList[0].length) {
                setRandomList([...randomList, random]);
                context.currentSong(random);

                FCSaveLocalIndex(random);
            } else {
                setRandomList([]);
            }
        } else {
            if (context.indexSong < context.songList[0].length - 1) {
                context.currentSong(context.indexSong + 1);

                FCSaveLocalIndex(context.indexSong + 1);
            } else {
                context.currentSong(0);

                FCSaveLocalIndex(0);
            }
        }
        audio.current.pause();
        context.pauseSong();
    };

    const handlePrev = () => {
        if (shuffle) {
            if (randomList.length > 1) {
                randomList.pop();
                context.currentSong(randomList[randomList.length - 1]);

                FCSaveLocalIndex(randomList[randomList.length - 1]);
            } else {
                context.currentSong(context.indexSong);
                setRandomList([]);
                alert('Đã hết bài hát ramdom');
            }
        } else {
            if (context.indexSong > 0) {
                context.currentSong(context.indexSong - 1);

                FCSaveLocalIndex(context.indexSong - 1);
            } else {
                context.currentSong(context.songList[0].length - 1);

                FCSaveLocalIndex(context.songList[0].length - 1);
            }
        }
        audio.current.pause();
        context.pauseSong();
    };

    const handleRandom = () => {
        setShuffle(!shuffle);
        if (!shuffle) {
            setRandomList([]);
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

    const handleChangeTimeSong = (e) => {
        const target = e.target;
        const val = target.value;
        const duration = audio.current.duration;
        const percentage = (val / 100) * duration;
        audio.current.currentTime = percentage;
        target.style.backgroundSize = val + '% 100%';
    };

    const songTimeUpdate = () => {
        const time = secondsToHms(Math.floor(audio.current.currentTime));
        currenttime.current.innerText = time;
        const currentTime = audio.current.currentTime;
        const duration = audio.current.duration;
        const percentage = Math.floor((currentTime / duration) * 100);
        rangeInputSong.current.style.backgroundSize = percentage + '% 100%';
        rangeInputSong.current.value = percentage;
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

                FCSaveLocalIndex(random);
            } else {
                setRandomList([]);
            }
        } else {
            if (context.indexSong < context.songList[0].length - 1) {
                context.currentSong(context.indexSong + 1);

                FCSaveLocalIndex(context.indexSong + 1);
            } else {
                context.currentSong(0);

                FCSaveLocalIndex(0);
            }
        }
    };
    return (
        <div className="footer__control">
            <div className="controls">
                <span className="btnControl" onClick={() => handleRandom()}>
                    <i className={shuffle ? 'icon ic-shuffle active' : 'icon ic-shuffle'}></i>
                </span>
                <span ref={btnPrev} className="btnControl" onClick={() => handlePrev()}>
                    <i className="icon ic-pre"></i>
                </span>

                {!loading ? (
                    <>
                        <span className={context.play ? 'btn-control-toggle hidden' : 'btn-control-toggle '}>
                            <i className="icon footer__control-icon ic-play-circle-outline" onClick={handlePlay}></i>
                        </span>
                        <span className={context.play ? 'btn-control-toggle ' : 'btn-control-toggle hidden'}>
                            <i className="icon footer__control-icon  ic-pause-circle-outline" onClick={handlePlay}></i>
                        </span>
                    </>
                ) : (
                    <>
                        <span style={{ margin: 'unset' }} className="btn-control-toggle"></span>
                        <span className="btn-control-toggle">
                            <i className="icon">
                                <SVGLoadingSong />
                            </i>
                        </span>
                    </>
                )}

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
    );
}

export default Control;
