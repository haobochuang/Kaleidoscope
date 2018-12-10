import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultPostData from './defaultData.js'

import styleCSS from './index.scss';

class PostForm extends Component {

	closeDialog=()=>{
		//e.preventDefault();
		const dialogSwitch = false;
		this.props.dispatch({
			 type: 'CLOSE_DIALOG',
			 dialogSwitch
		 });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		 const title = this.getTitle.value;
		 const message = this.getMessage.value;
		 const imglink = this.getImgLink.value;
		 const data = {
		  id: new Date(),
		  title,
		  message,
		  imglink,
		  editing: false
		 }

		 this.props.dispatch({
			 type: 'ADD_POST',
			 data
		 })
		 this.getTitle.value = '';
		 this.getMessage.value = '';
		 this.getImgLink.value = '';
		 this.closeDialog();
	}

	showDefaultPost(){
		var key=1;
		const id = "";
		const title ="";
		const message ="";
		const imglink ="";
		

		//map default post data
		DefaultPostData.map(
			(post,i)=>{
				const data = {
				  id,
				  title,
				  message,
				  imglink,
				  editing: false
				 }
				data.id = key;
				data.title = post.title;
				data.message = post.message;
				data.imglink = post.imglink;
				this.props.dispatch({
					type: 'ADD_POST',
					data,
				});
				key++;
				}
			);
	}


	render() {
	if(firstmount){
		this.showDefaultPost();
		firstmount = false;
	}
	return (
	<div className={styleCSS.darkBox} style={{display:this.props.dialog?'block':'none'}}>
	  <div className={styleCSS.editPostBox} >
		  <p>Create Post</p>
		  <form className="form" onSubmit={this.handleSubmit} >
		   <input required type="text" ref={(input) => this.getTitle = input}
		   placeholder="Enter Post Title" /><br /><br />
		   <textarea required rows="5" ref={(input) => this.getMessage = input}
		   cols="30" placeholder="Enter Post" /><br /><br />
		   <input required type="text" ref={(input) => this.getImgLink = input}
		   placeholder="Enter image link" /><br /><br />
		   <button>Post</button>
		  </form>
		  <button className={styleCSS.close_Btn} onClick={this.closeDialog}>X</button>
	  </div>
	</div>
	);
}
}

var firstmount = true;

const mapStateToProps = (state) => {
	return {
		dialog: state.NavReducer
	}
}

export default connect(mapStateToProps)(PostForm);