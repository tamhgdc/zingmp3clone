import config from '~/config';

function Logo({ navigation, showNavMobile }) {
    return (
        <div className="logo" onClick={() => navigation(config.routes.home)}>
            <img
                className="logoImg"
                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                alt="Zing"
            />
            {showNavMobile ? (
                <img
                    className="logoImgMb"
                    style={{ width: '100px', marginLeft: '-40px' }}
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt="Zing"
                />
            ) : (
                <img
                    className="logoImgMb"
                    style={{ width: '30px' }}
                    src="https://static-zmp3.zmdcdn.me/skins/zmp3-v5.2/images/icon_zing_mp3_60.png"
                    alt="Zing"
                />
            )}
        </div>
    );
}

export default Logo;
