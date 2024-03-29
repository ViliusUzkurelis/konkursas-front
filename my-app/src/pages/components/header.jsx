import './headers.css';


function Header() {
  return (
  
    <header>
    <h1><a href="/">KITM DI logo generator</a></h1>
    <nav>
      <div class="dropdown">

        <div class="menu">
          <p>Menu</p>
        </div>
        <div class="options">
          <a href="/login">Login</a>
          <a href="/favourites">Favourites</a>
        </div>
      </div>
    </nav>
  </header>
  )
};

export default Header;
