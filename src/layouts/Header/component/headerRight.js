import { SVGHeader } from '~/images';

function HeaderRight({ context, headerInfo }) {
    const handleClick = () => {
        headerInfo.current.classList.toggle('hidden');
    };

    return (
        <div className="headerRight">
            <button className="circle " onClick={() => context.setShowModalTheme(true)}>
                <i className="icon">
                    <SVGHeader />
                </i>
                <div className="headerTheme">
                    <span>Chủ đề</span>
                </div>
            </button>
            <button className="circle ">
                <i className="icon circleIcon ic-20-VIP-2"></i>
                <div className="headerVIP">
                    <span>Nâng cấp VIP</span>
                </div>
            </button>
            <button className="circle ">
                <i className="icon circleIcon ic-upload"></i>
                <div className="headerUp">
                    <span>Tải lên</span>
                </div>
            </button>
            <button className="circle ">
                <i className="icon circleIcon ic-settings"></i>
                <div className="headerSetting">
                    <span>Cài đặt</span>
                </div>
            </button>
            <div className="header__info-last" style={{ position: 'relative' }}>
                <div onClick={() => handleClick()} className="circle check-btn-info">
                    <img
                        className="check-btn-img"
                        src="https://s120-ava-talk-zmp3.zmdcdn.me/8/b/9/3/10/120/34dc3b79fce0b96839a43e2cf66ddfde.jpg"
                        alt=""
                    />
                </div>
                <div ref={headerInfo} className="headerInfo hidden">
                    <div className="header__info-VIP">
                        <button className="header__info-VIP-link">
                            <i className="icon circleIcon ic-20-VIP-2"></i>
                            <span className="header__info-title">Nâng cấp VIP</span>
                        </button>
                        <button className="header__info-VIP-link">
                            <i className="icon circleIcon ic-20-VIP"></i>
                            <span className="header__info-title">Mua gói VIP</span>
                        </button>
                    </div>
                    <div className="header__info-VIP logout">
                        <button className="header__info-VIP-link">
                            <i className="icon circleIcon ic-log-out"></i>
                            <span className="header__info-title">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderRight;
