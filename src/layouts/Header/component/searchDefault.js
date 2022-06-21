const searchDefaultItem = [
    {
        title: 'thương em',
    },
    {
        title: 'trọn vẹn nghĩa',
    },
    {
        title: 'đôi mi',
    },
    {
        title: 'karaoke',
    },
    {
        title: 'radio',
    },
];

function SearchDefault({ context, navigate, searchInput, suggestSongs }) {
    return (
        <>
            <h3 className="suggest-song-title">Đề xuất cho bạn</h3>
            <ul className="suggest-song-list">
                {searchDefaultItem.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                searchInput.current.value = item.title;
                                suggestSongs.current.classList.add('hidden');
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
    );
}

export default SearchDefault;
