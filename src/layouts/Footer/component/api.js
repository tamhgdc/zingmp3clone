import axios from 'axios';
import { useEffect } from 'react';
import secondsToHms from '~/component/FCTime';
import { URL } from '~/url';

function Api(
    context,
    audio,
    setValue,
    rangeInputSong,
    footerImg,
    footerInfoTitle,
    footerInfoSinger,
    totalTime,
    setLoading,
) {
    useEffect(() => {
        if (context.songList[0].length > 0) {
            const song = context.songList ? context.songList[0][context.indexSong] : {};
            audio.current.pause();
            setLoading(true);
            axios
                .get(`${URL}song/${context.songList[0][context.indexSong].encodeId}`)
                .then(({ data }) => {
                    footerImg.current.src = song.thumbnailM;
                    footerInfoTitle.current.innerHTML = song.title;
                    footerInfoSinger.current.innerHTML = song.artistsNames;
                    totalTime.current.innerHTML = secondsToHms(song.duration);
                    audio.current.src = data.data[128];

                    if (context.checkPlaySong) {
                        audio.current.play();
                        context.playSong();
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    rangeInputSong.current.style.backgroundSize = 0;
                    setValue(0);
                    alert('Lỗi khi tải bài hát. Nguyên nhân do dữ liệu! Vui lòng chọn bài hát khác!');
                    audio.current.src = '';
                    context.pauseSong();
                    audio.current.pause();
                    setLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.indexSong, context.songList[0]]);
}

export default Api;
