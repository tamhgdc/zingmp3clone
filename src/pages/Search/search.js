import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Context from '~/context/context';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';
import './search.css';
import Top from './component/top';
import Result from './component/result';
import NoData from './component/noData';

function Search() {
    const context = useContext(Context);
    const navigate = useNavigate();

    const [suggestSong, setSuggestSong] = useState([]);
    const [suggestTop, setSuggestTop] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputSearch = document.querySelector('.searchInput');
    const iconSearch = document.querySelector('.iconSearch');
    try {
        inputSearch.onkeydown = function (e) {
            if (e.keyCode === 13) {
                context.setInputSearch(e.target.value);
                inputSearch.blur();
            }
        };

        iconSearch.onclick = function () {
            context.setInputSearch(inputSearch.value);
        };
    } catch (error) {}

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setInputSearch(decodeURI(window.location.pathname.split('/')[2]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const debouncedValue = useDebounce(context.inputSearch, 500);

    useEffect(() => {
        if (debouncedValue.length === 0) {
            setSuggestSong([]);
            setSuggestTop([]);
            return;
        }
        setLoading(true);
        axios
            .get(`${URL}search/${debouncedValue}`)
            .then(({ data }) => {
                setSuggestSong(data.data.songs);
                setSuggestTop(data.data.top);
            })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [debouncedValue]);

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex' }}>
                    <div className="loader"></div>&emsp;<span>loading...</span>
                </div>
            ) : (
                <>
                    <div className="searchResult">
                        <Top suggestTop={suggestTop} context={context} navigate={navigate} />

                        <Result suggestSong={suggestSong} context={context} />

                        <NoData
                            suggestTop={suggestTop}
                            suggestSong={suggestSong}
                            inputSearch={inputSearch}
                            context={context}
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default Search;
