import React from "react";
import Form from './Form';
import Input from './Input';
import { MyContext } from './withFormHandle';
import { FaUser, FaTag } from 'react-icons/fa';
import SelectTag from './SelectTag';




export default class Login extends React.Component {
    static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        lastname: '',
        tag: 'all',
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
   
    }
  
  isInvalidValidForm() {
    // return this.state.user.name.trim().length <= 3 ||
    //   this.state.user.lastname.trim().length <= 3 
    return false;
  }

  handleSubmit(value) {
    console.log('Values from Login COmponent: ', value);
  }

  render() {
    const { user } = this.state;

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
                    <SelectTag name="tag"  tag={user.tag} onChange={this.onChangeField}/>
                    <span className="icon is-small is-left"><FaTag /></span>
                    </div>
                  </div>
                
                  <div className="field">
                    <p className="control">
                      <button className="button is-dark is-medium is-fullwidth is-disabled"  disabled={this.isInvalidValidForm()}>Sign Up</button>
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


