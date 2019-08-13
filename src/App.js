import React, { Component } from 'react';
import './App.css';

// following this tutorial:
//https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

class App extends Component {
  render() {
  return (
    <div className="App">
      <div class="container">
	      <div class="row">

          <div class="col-md-6">
	          <form method="post" action="#" id="#">
              <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" class="form-control" multiple=""></input>
              </div>
            </form>
          </div>
	    </div>
	  </div>
  </div>
  )
}
}

export default App;
