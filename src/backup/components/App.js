import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div >
    		<Header />
    		<div>
    			<Pool />
    		</div>
    		<Footer />
    	</div>
)

//header
class Header extends React.Component{
  
  constructor(props){
  	super(props);
  	this.state ={
  		userName:'Jackie',
  		hviewStyle:"thumb"
  	};
  }


  render() {

    return (
    	<div >
    		
    		<NewPost />

    		<div className={styleCSS.logoname}>Kaleidoscope</div>
    		
    		<div className={styleCSS.navBtns}>
	    		<button className={styleCSS.navbtn} onClick={this.props.newPost}>new</button>
	    		<label> | </label>
	    		
	    		<button className={styleCSS.navbtn} onClick={this.props.btnViewMeg}>meg</button>
	    		<button className={styleCSS.navbtn} onClick={this.props.btnViewThumb}>thumb</button>
	    		<button className={styleCSS.navbtn} onClick={this.props.btnViewList}>list</button>
    		</div>

    		

    		<div className={styleCSS.postinfo}>
    			Hi, {this.state.userName}
    			<div className={styleCSS.postnumber}>{this.props.postlength}</div><div className={styleCSS.postlabel}>posts</div>   		</div>
    		<div>
    			
    		</div>
    	</div>
    );
  }
}

export default App