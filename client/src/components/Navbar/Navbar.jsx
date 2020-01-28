import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
      lang: "en",
    }
    this.toggleBurguer = this.toggleBurguer.bind(this);
    this.logout = this.logout.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  componentDidMount() {
    this.props.i18n.changeLanguage(this.state.lang);
  }
 
  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer
    })
  }

  logout(event) {
    event.preventDefault();
    //Dejamos el campo de user a un objecto vacio en el estado de redux
    this.props.setUser({});
    this.props.history.push('/register');
  }

  changeLang() {
    this.setState(prevState => ({
      lang: prevState.lang === 'es' ? 'en' : 'es'
    }), () =>this.props.i18n.changeLanguage(this.state.lang));
    
  }

  render() {
    const { activeBurguer } = this.state;
    const { t } = this.props;
    return (
      <>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item " href="/">
              <span role="img" aria-label="Movies" className="bd-emoji">🛒</span> &nbsp;<span className="title-logo">WallaKeep</span>
            </a>
            <div className={`navbar-burger burger ${activeBurguer === true ? 'is-active' : null}`} onClick={this.toggleBurguer} data-target="navMenubd-example">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenubd-example" className={`navbar-menu ${activeBurguer === true ? 'is-active' : null}`}>
            <div className="navbar-start">
              <Link className="navbar-item " to='/'><span role="img" aria-label="Home" className="bd-emoji">🏠</span> &nbsp;{t("Home")}</Link>
              <Link className="navbar-item " to='/advert/create'><span role="img" aria-label="Profile" className="bd-emoji">📦</span> &nbsp;{t("Create Advert")}</Link>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={this.changeLang} className="is-dark has-text-weight-bold is-normal button">Lang</button>
                <button onClick={this.logout} className="is-dark has-text-weight-bold is-normal button">{t("LogOut")}</button>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default withTranslation()(Navbar);