import React from 'react'

function Alert(props) {

  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    // NOTICE THIS SYNTAX. The second expression returns true always since it is a div element and just shows content, but it will only
    // run if props.alert is true, which means it is nt NULL.
    //alert-primary is blue,    alert-success is green
    //alert-warning is yellow,  alert-danger is red
    <div style={{height:'50px'}}>
      {props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                      <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
                      {/*Below is the X button on dismissble alert. Removing it cuz we are going to auto-dismiss alert through timer.*/}
                      {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  */} 
                      </div>}
    </div>
    
  )
}

export default Alert