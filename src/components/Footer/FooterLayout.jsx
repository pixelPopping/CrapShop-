import {NavLink} from "react-router-dom";
import "./FooterLayout.css"

function FooterLayout() {
    return (
        <section className="outer-layout">
        <footer className="layout-footer">
            <div className="footer-links">
                <ul>
                    <li><NavLink to="/profiel">Profiel</NavLink></li>
                    <li><NavLink to="/recencies">Recensies</NavLink></li>
                    <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                </ul>
            </div>
        </footer>
        </section>
    )
}

export default FooterLayout;