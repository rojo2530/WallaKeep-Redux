import React, {useContext} from "react";
import { MyContext } from './withFormHandle.js'

const Input = ({name, ...props}) => {
  const context = useContext(MyContext);
  return (
    <input  value={context.value[name]} name={name} onChange={context.onChange} {...props} />
  )
}

export default Input;