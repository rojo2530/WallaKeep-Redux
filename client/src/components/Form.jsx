import React from "react";
import withFormHandle from './withFormHandle';

const Form = ({children, ...props}) => {
    return (
      <form {...props}>
        {children} 
        <input type="submit" />
      </form>
    )
}

export default withFormHandle(Form);