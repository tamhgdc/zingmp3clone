import Context from './context';
import { useState } from 'react';

function StoreProvider({ children }) {
    const [play, setPlay] = useState(false);
    const [songList, setSongList] = useState([
        localStorage.getItem('songList') ? JSON.parse(localStorage.getItem('songList')) : [],
    ]);
    const [indexSong, setIndexSong] = useState(
        localStorage.getItem('currentIndex') ? JSON.parse(localStorage.getItem('currentIndex')) : null,
    );
    const [inputSearch, setInputSearch] = useState('');

    const [indexLike, setIndexLike] = useState([]);

    const togglePlay = () => {
        setPlay(play === false ? true : false);
    };

    const playSong = () => {
        setPlay(true);
    };

    const pauseSong = () => {
        setPlay(false);
    };

    const addSongList = (song) => {
        setSongList([song]);
    };

    const currentSong = (index) => {
        setIndexSong(index);
    };

    const data = {
        play,
        togglePlay,
        songList,
        indexSong,
        playSong,
        pauseSong,
        addSongList,
        currentSong,
        inputSearch,
        setInputSearch,
        indexLike,
        setIndexLike,
    };
    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export default StoreProvider;
