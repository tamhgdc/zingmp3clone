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

    const [keywordSearch, setKeywordSearch] = useState('');

    const [indexLike, setIndexLike] = useState(
        localStorage.getItem('like') ? JSON.parse(localStorage.getItem('like')) : [],
    );

    const [showModalTheme, setShowModalTheme] = useState(false);

    const [encodeIdMV, setEncodeIdMV] = useState('');

    const [checkPlaySong, setCheckPlaySong] = useState(false);

    const togglePlay = () => {
        setPlay(!play);
        // === false ? true : false
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

    const [dataHome, setDataHome] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [dataNewSong, setDataNewSong] = useState([]);
    const [dataTop100, setDataTop100] = useState([]);

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
        keywordSearch,
        setKeywordSearch,
        indexLike,
        setIndexLike,
        showModalTheme,
        setShowModalTheme,
        encodeIdMV,
        setEncodeIdMV,
        checkPlaySong,
        setCheckPlaySong,

        dataHome,
        setDataHome,
        dataChart,
        setDataChart,
        dataNewSong,
        setDataNewSong,
        dataTop100,
        setDataTop100,
    };
    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export default StoreProvider;
