import React from 'react'
import './Header.scss'
import logo from '../../assets/tmovie.png'
import { Link, useLocation } from 'react-router-dom'

const HeaderNav = [
    { display: "Home", path: '/' },
    { display: "Movies", path: '/movie' },
    { display: "TV Series", path: '/tv' },
]

const Header = () => {

    const { pathname } = useLocation()
    const headerRef = React.useRef(null)

    const active = HeaderNav.findIndex(e => e.path === pathname)

    React.useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add("shrink")
            } else {

                headerRef.current.classList.remove("shrink")
            }
        }

        window.addEventListener("scroll", shrinkHeader)
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <Link to={'/'}>tMovies</Link>
                </div>
                <ul className="header__nav">
                    {
                        HeaderNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header