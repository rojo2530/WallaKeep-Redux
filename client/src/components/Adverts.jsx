import React from 'react';
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
import AdvertsGrid  from './AdvertsGrid';

const { getAdverts } = api();

class Adverts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      // adverts: [],
      filter: {
        name: '',
        type: '',
        tag: '',
        priceMin: '',
        priceMax: '',
      },
      // error: false,
      // errorMessage: '',
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
    this.setState({
      filter: {
        ...this.state.filter,
        tag: user.tag,
      }
    });
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
    const { filter, totalPages, currentPage, errorMessage } = this.state;
    const { isFetching, error } = this.props;
   
    if (error) {
      return <CaptureError message="Error fecthing Adverts" error={error.message} />
    }
    return (
      <>
        <Navbar  />
        <Searchbar {...filter} onChangeText={this.changeText} handlerSubmit={this.handlerSubmit} /> 
        {isFetching === true 
          ?  <Loading text='Fetching Adverts' />
          :  <>
              <AdvertsGrid text={this.state.text} 
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
