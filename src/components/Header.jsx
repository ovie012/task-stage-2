import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {
  return (
    <>
        <div className="header noto">
            <img src="/Frame 1618871078.svg" alt="logo" />
            <section>
              <p>
                <NavLink to='/'>event</NavLink>
              </p>
              <p>
                <NavLink to='/Tickets'>my ticket</NavLink>
              </p>
              <p>
                <NavLink to='/About'>about project</NavLink>
              </p>
            </section>
            <button>my ticket<img src="/div.svg" alt="arrow" /></button>
        </div>
    </>
  )
}

export default Header