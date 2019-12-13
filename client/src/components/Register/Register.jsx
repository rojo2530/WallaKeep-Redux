import React from 'react';
import SelectTagContext from '../SelectTagContext/';
import Form from '../Form';
import Input from '../Input';
import { FaUser, FaTag } from 'react-icons/fa';
import { notification } from 'antd';

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    type: 'warning',
    style: { backgroundColor: 'yellow' }
  });
}

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  isInvalidValidForm(user) {
    return user.name.trim().length <= 3 ||
      user.lastname.trim().length <= 3 
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotification('Invalid Form', `The field name or lastname are not correct`);
      return false;
    }
    this.props.setUser(user);
    this.props.history.push('/');
  }

  render() {
    return(
      <section className="hero is-fullheight is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4 box">
              <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '5rem'}}>🛒</span></h1>
              <div className="login-form">
                <Form onSubmit={this.handleSubmit} initialValue={{name: '', lastname: '', tag: 'all'}}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control has-icons-left">
                      <Input name="name" className="input" type="text" placeholder="e.g Alex" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The name is invalid, is too short</p>
                  </div>
                  
                  <div className="field">
                    <label className="label">Last name</label>
                    <div className="control has-icons-left">
                      <Input name="lastname" className="input" type="text" placeholder="e.g. Smith" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The last name is invalid, is too short</p>
                  </div>

                  <div className="field">
                    <label className="label">Tag</label>
                    <div className="control has-icons-left">
                    <SelectTagContext name="tag" />
                    <span className="icon is-small is-left"><FaTag /></span>
                    </div>
                  </div>
                
                  <div className="field">
                    <p className="control">
                      <button className="button is-dark is-medium is-fullwidth is-disabled">Sign Up</button>
                    </p>
                  </div>
                </Form>
              </div>
              <hr />
              <div className="forgot-password">
                <p className="has-text-centered">Remember, the fields can not be empty</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}




