function Album({ context, navigate }) {
    const handleLike = (encodeId, thumbnail, title, sortDescription, index) => {
        context.setIndexLike((prev) => {
            let newLike;
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].encodeId === encodeId) {
                    newLike = prev.filter((item) => item.encodeId !== encodeId);
                    return newLike;
                }
            }
            newLike = [
                ...prev,
                {
                    encodeId,
                    thumbnail,
                    title,
                    sortDescription,
                    index,
                },
            ];
            const JsonLike = JSON.stringify(newLike);
            localStorage.setItem('like', JsonLike);
            return newLike;
        });
    };

    return (
        <div className="row boxBanner">
            {context.indexLike.map((item, index) => {
                return (
                    <div key={index} className="col sm_gutter l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg">
                            <div className="btnImgList">
                                <img className="imgList " src={item.thumbnail} alt="" />
                            </div>
                            <div
                                className="playSongMain"
                                onClick={() => navigate(`/detail/album/${item.encodeId}`)}
                            ></div>
                            <div className="play-song-control">
                                <div
                                    className="btnLike"
                                    onClick={() =>
                                        handleLike(
                                            item.encodeId,
                                            item.thumbnail,
                                            item.title,
                                            item.sortDescription,
                                            item.index,
                                        )
                                    }
                                >
                                    <i className="icon mainListFullLike ic-like-full"></i>
                                </div>

                                <div className="linkAlbum" onClick={() => navigate(`/detail/album/${item.encodeId}`)}>
                                    <i className="icon mainListPlay ic-play-circle-outline"></i>
                                </div>
                                <div className="btnLike songMore">
                                    <i className="icon mainListMore ic-more"></i>
                                    <div className="songMoreDetail"></div>
                                </div>
                            </div>
                        </div>
                        <h3 className="songName">{item.title}</h3>
                        <h5 className="songerName">{item.sortDescription}</h5>
                    </div>
                );
            })}
        </div>
    );
}

export default Album;
