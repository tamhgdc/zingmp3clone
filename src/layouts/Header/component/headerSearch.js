import SearchDefault from './searchDefault';
import SearchResult from './searchResult';

function HeaderSearch({ context, navigate, suggestSongs, searchInput, setInput, suggestSong, headerInfo }) {
    const handleFocus = (e) => {
        suggestSongs.current.classList.remove('hidden');
    };

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.headerSearch')) {
            suggestSongs.current.classList.add('hidden');
        }
        if (!e.target.closest('.header__info-last')) {
            headerInfo.current.classList.add('hidden');
        }
    });

    return (
        <div className="headerSearch">
            <button
                onClick={() => {
                    context.setInputSearch(searchInput.current.value);
                    context.setKeywordSearch(searchInput.current.value);
                    navigate(`/search/${searchInput.current.value}`);
                    suggestSongs.current.classList.add('hidden');
                }}
                className="iconSearch"
            >
                <i style={{ fontSize: '20px' }} className="icon iconSearch ic-search"></i>
            </button>
            <input
                ref={searchInput}
                onChange={(e) => {
                    setInput(e.target.value);
                    context.setInputSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        suggestSongs.current.classList.add('hidden');
                        context.setInputSearch(searchInput.current.value);
                        context.setKeywordSearch(searchInput.current.value);
                        navigate(`/search/${searchInput.current.value}`);
                    }
                }}
                onFocus={() => handleFocus()}
                className="searchInput"
                type="text"
                placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                value={context.inputSearch}
            />
            <div ref={suggestSongs} className="suggestSongs hidden">
                {suggestSong !== undefined && suggestSong.length !== 0 ? (
                    <SearchResult
                        context={context}
                        navigate={navigate}
                        searchInput={searchInput}
                        suggestSongs={suggestSongs}
                        suggestSong={suggestSong}
                    />
                ) : (
                    <SearchDefault
                        context={context}
                        navigate={navigate}
                        searchInput={searchInput}
                        suggestSongs={suggestSongs}
                    />
                )}
            </div>
        </div>
    );
}

export default HeaderSearch;
