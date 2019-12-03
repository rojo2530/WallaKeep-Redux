import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilter, fetchAdverts} from '../store/actions';
import Navbar from './Navbar';
import Loading from './Loading';
import Searchbar from './Searchbar';
import api from '../utils/api';
import Pagination from 'bulma-pagination-react';
import CaptureError from './CaptureError';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
// import { FETCH_ADVERTS_FAILURE } from '../store/types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}

const { getAdverts } = api();

function AdvertsGrid({ adverts }) {
  return (
   <>
     {adverts.length === 0
       ? <p style={styles.content}>No Results Found!!</p>
       : <div className="columns is-multiline cards-group grid-cards-container">
          {adverts.map(advert => (
            <div key={advert._id} className="column is-6-tablet is-3-desktop">
              <div className="card has-equal-height">
						    <div className="image has-spacing image is-3by2">
							    <img src={advert.photo.startsWith('/images') ? `http://localhost:3001${advert.photo}` : `${advert.photo}`} alt="Placeholder" />
						    </div>
						    <div className="card-content has-equal-height">
								  <div className="content">
                    <h4 className="title has-small-spacing-bottom">{advert.name}</h4>
                    <div className="has-spacing-bottom">
                      {advert.tags.map(tag => (
                        <span key={tag} className="tag has-small-spacing-top is-medium">{tag}</span>
                      ))}	
										</div>
										<p className="buttons">
                      <a className="button is-link has-icons-left" href="/products/tattoo/">
                        <span className="icon">
                          <FaShoppingCart />
                        </span>
                        <span>{advert.price}€</span>
                      </a>
										 </p>
                     <h6 className="vc">{advert.type}</h6>
                  </div>
						    </div>
						    <footer className="card-footer">
							    <Link to={`/advert/detail/${advert._id}`} className="card-footer-item">Detail</Link>
							    <Link to={`/advert/edit/${advert._id}`} className="card-footer-item">Edit</Link>
						    </footer>
				      </div>
				    </div>
          ))}
        </div>
        }
      </>
    )
}

AdvertsGrid.propTypes = {
  adverts: PropTypes.array.isRequired
}

class Adverts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      adverts: [],
      filter: {
        name: '',
        type: '',
        tag: '',
        priceMin: '',
        priceMax: '',
      },
      error: false,
      errorMessage: '',
      currentPage: 1,
    }
    this.changeText = this.changeText.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerPage = this.handlerPage.bind(this);
  }

  handlerSubmit(event) {
    event.preventDefault();
    
    this.setState({
      loading: true,
      currentPage: 1,
    });
    this.props.setFilter(this.state.filter);
    // this.fetchAdverts(this.state.filter);
    this.props.loadAdverts();
  }

  handlerPage(currentPage) {
    this.setState({
      currentPage,
      loading: true,
    })
  }

  changeText({ target }) {
    this.setState({
      filter: {
        ...this.state.filter,
        [target.name]: target.value,
      }
    });
  }

  componentDidMount() {
    //Cargamos el filtro inicial
    const user = this.props.user;
    this.props.setFilter({ ...this.state.filter, tag: user.tag } );
    // this.setState({
    //   filter: {
    //     ...this.state.filter,
    //     tag: user.tag,
    //   }
    //   }, () => this.fetchAdverts(this.state.filter)
    // );
    this.props.loadAdverts();
  }

  componentDidUpdate (prevProps, prevState)  {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchAdverts(this.state.filter, this.state.currentPage)
   }
  }
  
  fetchAdverts(filter, page) {
    getAdverts(filter, page)
      .then(res => this.setState({
        loading: false,
        adverts: res.results,
        
      })).catch(err => {  
        console.log("Error caught in catch",err);
        this.setState({
          error: true,
          errorMessage: err.message,
          loading: false,
        })
      });
   }

  render () {
    const { loading , filter, totalPages, currentPage, error, errorMessage } = this.state;
    const { isFetching, adverts } = this.props;
   
    if (error) {
      return <CaptureError message="Error fecthing Adverts" error={errorMessage} />
    }
    return (
      <>
        <Navbar  />
        <Searchbar {...filter} onChangeText={this.changeText} handlerSubmit={this.handlerSubmit} /> 
        {isFetching === true 
          ?  <Loading text='Fetching Adverts' />
          :  <>
              <AdvertsGrid adverts={adverts} text={this.state.text} 
                totalPages={totalPages} currentPage={currentPage} 
                onChangePage={this.handlerPage}/>
              <div className="container-pagination" style={{marginTop: '100px'}}>
                <Pagination 
                  currentPage={currentPage}
                  onChange={(page) =>{this.handlerPage(page)}} />
              </div>
            </>
        }
        <Footer />
      </>
    )
  } 
}

function mapStateToProps(state) {
  return {
    user: state.user,
    adverts: state.adverts,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFilter: filter => dispatch(setFilter(filter)),
    loadAdverts: () => dispatch(fetchAdverts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adverts);
