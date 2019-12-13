import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import { isUserAuth } from '../../store/selectors';
import Register from './Register';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  }
}

function mapStateToProps(state) {
  return {
    isAuth: isUserAuth(state.user)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);