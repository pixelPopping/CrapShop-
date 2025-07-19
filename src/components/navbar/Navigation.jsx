import {NavLink} from "react-router-dom";

function Navigation () {
    return (
        <div className="Navigation">
            <nav className="navbar">
                <ul className="unordered-list">
                    <li><NavLink to="/" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Home Page</NavLink></li>
                    <li><NavLink to="/Shop" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Shop</NavLink></li>
                    <li><NavLink to="/Jewlery" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Jewlery</NavLink></li>
                    <li><NavLink to="/Menchlotes" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Men Chlotes</NavLink></li>
                    <li><NavLink to="/Electronics" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Electronics</NavLink></li>
                    <li><NavLink to="/WomanChlotes" className={({isActive}) => isActive === true ? 'active-link' :'default-link'}>Woman Chlotes</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;