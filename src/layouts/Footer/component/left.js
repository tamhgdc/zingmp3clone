function LeftFooter({ context, footerImg, footerInfoTitle, footerInfoSinger }) {
    return (
        <div className="footerLeft">
            <div className="footerImg">
                <img
                    ref={footerImg}
                    className="footerImg"
                    src={
                        context.songList[0].length > 0
                            ? context.songList[0][context.indexSong].thumbnailM
                            : 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/e/a/7/6ea713b2089cde546c5b69c0ee916f16.jpg'
                    }
                    alt=""
                />
                <div className={context.play ? 'footer__img-play' : 'footer__img-play hidden'}></div>
            </div>
            <div className="footerInfo">
                <h3 ref={footerInfoTitle} className="footer__info-title">
                    {context.songList[0].length > 0
                        ? context.songList[0][context.indexSong].title
                        : 'Đám Cưới Nha (Lofi VerSion)'}
                </h3>
                <span ref={footerInfoSinger} className="footer__info-singer">
                    {context.songList[0].length > 0
                        ? context.songList[0][context.indexSong].artistsNames
                        : 'Hồng Thanh'}
                </span>
            </div>
            <div className="footerLike">
                <input type="checkbox" id="checkHeat" hidden />
                <label htmlFor="checkHeat" className="like btnLike">
                    <i className="icon footer__icon-like ic-like"></i>
                </label>
                <label htmlFor="checkHeat" className="fullLike btnLike">
                    <i className="icon footer__icon-full-like ic-like-full"></i>
                </label>
                <div className="footer__more">
                    <i className="icon footer__icon-more ic-more"></i>
                </div>
            </div>
        </div>
    );
}

export default LeftFooter;
