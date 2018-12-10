import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User'
import styleCSS from './index.scss'


var dialogSwitch = false;

class NavBar extends Component {

	constructor(props){
		super(props);
		this.state={
  		viewStyle:"THUMB"
  	}
	}

	showdialog =(e)=>{
		    e.preventDefault();
		  	dialogSwitch = true;
		  	this.props.dispatch({
			 type: 'SHOW_DIALOG',
			 dialogSwitch
		 	});		  
	}

	changeViewStyle = (e)=>{
		e.preventDefault();
		var SetView = e.target.id;
		var viewStyle = this.state.viewStyle;
		switch(SetView){
			case "SET_MEG":
				this.setState({viewStyle:"MEG"});
				break;
			case "SET_THUMB":
				this.setState({viewStyle:"THUMB"});
				break;
			case "SET_LIST":
				this.setState({viewStyle:"LIST"});
				break;
			default:
				this.setState({viewStyle:"MEG"});
			}
		this.props.dispatch({
			 type: SetView,
			 viewStyle
		 	});	
	}
	

	render() {

    return (
    	<div className={styleCSS.navBox}>
    		
    		<div>
    			<div className={styleCSS.userbox}>
		    		
		    		<div className={styleCSS.userfuncbox} style={{visibility:this.props.auth.status==="logged in"?'visible':'hidden'}}>
		    			<button onClick={this.showdialog}>+</button>
		 			</div>
		 			<User />
	 			</div>
    			<div className={styleCSS.viewstylebox}>
		    		<button id="SET_MEG" disabled={(this.state.viewStyle==="MEG")?true:false} onClick={this.changeViewStyle}>meg</button>
		    		<button id="SET_THUMB" disabled={(this.state.viewStyle==="THUMB")?true:false} onClick={this.changeViewStyle}>thumb</button>
		    		<button id="SET_LIST" disabled={(this.state.viewStyle==="LIST")?true:false} onClick={this.changeViewStyle}>list</button>
	    		</div>

    		</div>

    		
    	</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		auth: state.authReducer
	}
}


export default connect(mapStateToProps)(NavBar);