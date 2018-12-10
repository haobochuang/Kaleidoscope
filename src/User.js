import React, { Component } from 'react';
import { connect } from 'react-redux';
import styleCSS from './index.scss'

class User extends Component {

	constructor(props){
		super(props);
		this.state=({
			clickGuest:false,
			authLabel:"login"
		});
	}

	checkInput=(e)=>{
		if(!this.getUsername.value){
			alert("Please enter User name!");
		}else{
			this.handleLogin(e);
		}
	}
	handleLogin=(e)=>{
		e.preventDefault();
		let username = this.getUsername.value;
		//dispatch
		this.props.dispatch({
			 type: 'LOGIN',
			 value: username
		 });
		this.setState({clickGuest:false,authLabel:"hi, "+username});
	}

	handleLogout=(e)=>{
		e.preventDefault();
		this.getUsername.value = '';
		//dispatch
		this.props.dispatch({
			 type: 'LOGOUT',
			 value: 'Guest'
		 });
		this.setState({clickGuest:false,authLabel:"login"});
	}

	displayLoginDialog=(e)=>{
		e.preventDefault();
		this.setState({clickGuest:true});
		console.log("guestClicked");
	}

	displayForm(){
		let button;
		console.log("status:"+this.props.state.status);
		if(this.props.state.status === "logged in"){
			button = <button onClick={this.handleLogout}>Log out</button>;
		}
		else{
			//button = <button onClick={this.checkInput}>Log in </button>
		}
		return button;
	}

	render() {

		let displayLoginField = true;
		if(this.props.state.status === "logged in")
			displayLoginField = false;

	return (
		<div className={styleCSS.userinfobox}>
			<div onClick={this.displayLoginDialog}>{this.state.authLabel}</div>
			<form className={styleCSS.userformbox} style={{visibility:this.state.clickGuest?'visible':'hidden'}} onSubmit={this.checkInput}>
				<input style={{display:displayLoginField?'block':'none'}}
				required type="text" ref={(input) => this.getUsername = input}
				placeholder="Enter User name"/>
				{this.displayForm()}
			</form>
		</div>

		);
	}

}

const mapStateToProps = (state) => {
	return {
		state: state.authReducer
	}
}

export default connect(mapStateToProps)(User);