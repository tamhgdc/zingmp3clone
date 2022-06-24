import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '~/hooks';
import axios from 'axios';

import Context from '~/context/context';
import './header.css';
import { URL } from '~/url';
import HeaderRight from './component/headerRight';
import HeaderSearch from './component/headerSearch';
import HeaerLeft from './component/headerLeft';

function Header() {
    const context = useContext(Context);

    const navigate = useNavigate();
    const suggestSongs = useRef();
    const searchInput = useRef();

    const [input, setInput] = useState('');
    const [suggestSong, setSuggestSong] = useState([]);

    useEffect(() => {
        if (input.length === 0) {
            setSuggestSong([]);
        }
    }, [input]);

    const debouncedValue = useDebounce(context.inputSearch, 1000);

    useEffect(() => {
        if (debouncedValue.length === 0) {
            setSuggestSong([]);
            return;
        }
        axios.get(`${URL}search/${debouncedValue}`).then(({ data }) => {
            setSuggestSong(data.data.songs);
        });
    }, [debouncedValue]);

    const headerInfo = useRef();

    return (
        <header className="header">
            <HeaerLeft navigate={navigate} />
            <HeaderSearch
                context={context}
                navigate={navigate}
                suggestSongs={suggestSongs}
                searchInput={searchInput}
                setInput={setInput}
                suggestSong={suggestSong}
                headerInfo={headerInfo}
            />
            <HeaderRight context={context} headerInfo={headerInfo} />
        </header>
    );
}

export default Header;
