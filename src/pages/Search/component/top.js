function Top({ suggestTop, context, navigate }) {
    const handleClickTop = () => {
        if (suggestTop.title === undefined) {
            alert('singer');
        } else if (suggestTop.sortDescription === undefined) {
            context.setCheckPlaySong(true);
            context.addSongList([suggestTop]);
            context.playSong();
            context.currentSong(0);
        } else {
            navigate(`/detail/album/${suggestTop.encodeId}`);
        }
    };

    return (
        <>
            {suggestTop !== undefined && suggestTop.length !== 0 && (
                <div className="topSearch">
                    <h3 style={{ fontSize: '20px' }}>Top Kết Quả "{context.inputSearch}"</h3>
                    <div className="boxSearchTop" onClick={handleClickTop}>
                        <div className="boxSearchTopImg">
                            <img style={{ width: '100%' }} src={suggestTop.thumbnail} alt="" />
                        </div>
                        <div className="boxSearchTopDetail">
                            <h4 className="searchTopSinger">{suggestTop.title || suggestTop.name}</h4>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Top;
