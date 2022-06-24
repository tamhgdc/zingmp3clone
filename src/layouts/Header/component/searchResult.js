function SearchResult({ context, navigate, searchInput, suggestSongs, suggestSong }) {
    return (
        <>
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
                                        context.setKeywordSearch(item.title);
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
