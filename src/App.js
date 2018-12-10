import React, { Component } from 'react';
import PostForm from './PostForm';
import AllPost from './AllPost';
import NavBar from './NavBar';
import Footer from './footer';
import styleCSS from './index.scss';

class App extends Component {
render() {
    return (
      <div className={styleCSS.container} >
          <div className = {styleCSS.titleArea}>
              <div className = {styleCSS.indextitle} >Kaleidoscope</div>
          </div>
          <NavBar />
          <PostForm />
          
          <div className={styleCSS.poolcontainer}>
            <AllPost />
          </div>
          <Footer />
      </div>
      );
    }
}
export default App;