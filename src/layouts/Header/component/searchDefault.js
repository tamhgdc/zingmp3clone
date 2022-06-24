import { GetRecommend } from '~/services';

function SearchDefault({ context, navigate, searchInput, suggestSongs }) {
    const [...searchDefaultItem] = GetRecommend();
    return (
        <>
            <h3 className="suggest-song-title">Đề xuất cho bạn</h3>
            <ul className="suggest-song-list">
                {searchDefaultItem.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                searchInput.current.value = item.keyword;
                                suggestSongs.current.classList.add('hidden');
                                context.setInputSearch(item.keyword);
                                context.setKeywordSearch(item.keyword);
                                navigate(`/search/${item.keyword}`);
                            }}
                            className="suggest-song-item"
                        >
                            <i className="icon suggest-song-icon ic-trend"></i>
                            <span className="suggest-song-prev">{item.keyword}</span>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default SearchDefault;
