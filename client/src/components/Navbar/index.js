import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import Navbar from './Navbar';
import { withRouter } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Navbar)); 