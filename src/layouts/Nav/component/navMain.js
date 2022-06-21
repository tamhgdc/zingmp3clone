import { Link } from 'react-router-dom';
import navTop from '~/component/NavTopData';

function NavMain() {
    return (
        <div className="navMain">
            <ul className="navList">
                {navTop.map((item, index) => (
                    <li
                        key={index}
                        className={item.link === window.location.pathname.slice(0) ? 'navItem active' : 'navItem'}
                    >
                        <Link to={item.link} className="nav__item-link">
                            <i className={item.icon}></i>
                            <span className="navTitle">{item.name}</span>
                            {item.name === 'Theo Dõi' ? '' : <i className="icon iconHover ic-20-Play-Outline"></i>}
                            {item.name === 'Radio' && (
                                <div className="navLive">
                                    <span>LIVE</span>
                                </div>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavMain;
