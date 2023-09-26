import React from 'react'

const Header = () => {
  const showMobileMenu = () => {
    document.getElementById('main-wrapper').classList.toggle('show-sidebar')
  }

  return (
    <header className="topbar navbarbg" data-navbarbg="skin6">
      <nav className={`navbar navbar-light h-100`}>
        <div className="navbar-header" id="logobg" data-logobg="skin6">
          <button
            className="btn-link nav-toggler d-block d-md-none"
            onClick={() => showMobileMenu()}
          >
            <i className="ti-menu ti-close" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
