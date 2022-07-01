import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

import Context from '~/context/context';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';
import './search.css';
import Result from './component/result';
import Loading from '~/component/FCLoading';

function Search() {
    const context = useContext(Context);

    const [dataSearch, setDataSearch] = useState([]);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setKeywordSearch(decodeURI(window.location.pathname.split('/')[2]));
            context.setInputSearch(decodeURI(window.location.pathname.split('/')[2]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const debouncedValue = useDebounce(context.keywordSearch, 500);

    useEffect(() => {
        if (debouncedValue.length === 0) {
            setDataSearch([]);
            return;
        }
        setLoading(true);
        axios
            .get(`${URL}search/${debouncedValue}`)
            .then(({ data }) => {
                setDataSearch(data.data);
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
                <Loading />
            ) : (
                <>
                    <div className="searchResult">
                        <Result dataSearch={dataSearch} context={context} />
                    </div>
                </>
            )}
        </>
    );
}

export default Search;
