import { useState } from 'react';
import { Link } from 'react-router-dom';
import navMobile from '~/component/NavMobileData';

import './navMobile.scss';

function NavMobile() {
    const [navlink, setNavlink] = useState(window.location.pathname.slice(0));
    return (
        <nav>
            <div className="navMobile">
                {navMobile.map((item, index) => {
                    return (
                        <Link
                            to={item.link}
                            className={item.link === navlink ? 'navMobile__item active' : 'navMobile__item'}
                            onClick={() => setNavlink(item.link)}
                            key={index}
                        >
                            <i className={`${item.icon} navMobile-icon`}></i>
                            <div className="navMobile__item-link">{item.name}</div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default NavMobile;
