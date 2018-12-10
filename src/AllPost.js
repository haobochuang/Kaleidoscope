import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as math from 'mathjs'


import Post from './Post';
import EditComponent from './EditComponent';
import styleCSS from './index.scss';

class AllPost extends Component {

	constructor(props){
		super(props);
		this.state={
  			thumbWidth:140,
  			borderWidth:28
  		};
  		this.thumbzoom = this.thumbzoom.bind(this);
	}

	showViewStyle(){
		var style = this.props.viewStyle;
		console.log("show:"+style);

		if(style==="MEG_VIEW"){
			return styleCSS.MEGStyle;
		}
		else if(style==="THUMB_VIEW"){
			return styleCSS.THUMBStyle;
		}
		else{
			return styleCSS.LISTStyle;
		}
	}

	thumbzoom(){
		var slider = document.getElementById('thumbRange');

		this.setState({thumbWidth:slider.value});
	}

	showPost(){
		switch(this.props.viewStyle){
		case "MEG_VIEW":
			return(
				this.props.posts.map((post) => (
				  <div key={post.id}>
				    {post.editing ? <EditComponent post={post} key={post.id} /> : <Post post={post}
				    key={post.id} viewStyle={this.props.viewStyle}/>}
				  </div>
					)
					)
				);
		
		case "THUMB_VIEW":
			return(
				this.props.posts.map((post) => (
				  <div key={post.id} className ={styleCSS.pool} >
				    {post.editing ? <EditComponent post={post} key={post.id} /> : <Post post={post}
				    key={post.id} viewStyle={this.props.viewStyle} 
				    thumbWidth = {this.state.thumbWidth}/>}
				  </div>
					)
					)
				);
		case "LIST_VIEW":
			return(
				<ul style={{margin:0}}>
				{this.props.posts.map((post) => (
				  <li key={post.id} className={styleCSS.listBox}>
				    {post.editing ? <EditComponent post={post} key={post.id} /> : <Post post={post}
				    key={post.id} viewStyle={this.props.viewStyle}/>}
				  </li>
				  )
				)}
				</ul>
				);
		default:
			return(
				<div>PLEASE RELOAD PAGE.</div>
			);
		}
	}


	render() {

		//measure thumb pool width by window width
		var poolwidth;
		if(this.props.viewStyle==="THUMB_VIEW"){
			var temp = math.sum(this.state.thumbWidth,this.state.borderWidth);
			var col = Math.floor(window.innerWidth/(temp));
			poolwidth = (temp)*col;
		}


		return (
			<div className= {this.showViewStyle()} style={{width:(this.props.viewStyle==="THUMB_VIEW")?((poolwidth)+'px'):'100vw'}} >
					<div className={styleCSS.thumbSliderBox} style={{visibility:this.props.viewStyle==="THUMB_VIEW"?'visible':'hidden'}}>
	    				<label>small</label>
	    				<input type="range" min="80" max="200" defaultValue={this.state.thumbWidth} step="5"
	    				className={styleCSS.thumbSlider}
	    				onChange={this.thumbzoom}
	    				id="thumbRange"
	    				/>
	    				<label>Large</label>
	    			</div>
			  {this.showPost()}
			</div>
		);
	}
}



const mapStateToProps = (state) => {
	return {
		posts: state.postReducer,
		viewStyle: state.viewReducer
	}
}
export default connect(mapStateToProps)(AllPost);