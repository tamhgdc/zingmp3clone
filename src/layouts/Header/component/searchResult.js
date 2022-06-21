function SearchResult({ context, navigate, suggestTop, searchInput, suggestSongs, suggestSong }) {
    return (
        <>
            {suggestTop !== undefined && suggestTop.length !== 0 && (
                <>
                    <h3 className="suggest-song-title">Top tìm kiếm</h3>
                    <ul className="suggest-song-list">
                        <li
                            onClick={() => {
                                context.setInputSearch(suggestTop.name || suggestTop.title);
                                searchInput.current.value = suggestTop.name || suggestTop.title;
                                navigate(`/search/${searchInput.current.value}`);
                                suggestSongs.current.classList.add('hidden');
                            }}
                            className="suggest-song-item"
                        >
                            <i className="icon suggest-song-icon ic-trend"></i>
                            <span className="suggest-song-prev">
                                {suggestTop.name !== undefined ? suggestTop.name : suggestTop.title}
                            </span>
                        </li>
                    </ul>
                </>
            )}
            {suggestSong !== undefined && (
                <>
                    <h3 className="suggest-song-title">Đề xuất cho bạn</h3>
                    <ul className="suggest-song-list">
                        {suggestSong.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        suggestSongs.current.classList.add('hidden');
                                        searchInput.current.value = item.title;
                                        context.setInputSearch(item.title);
                                        navigate(`/search/${item.title}`);
                                    }}
                                    className="suggest-song-item"
                                >
                                    <i className="icon suggest-song-icon ic-trend"></i>
                                    <span className="suggest-song-prev">{item.title}</span>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
}

export default SearchResult;
