import React, { Component } from 'react';
import { connect } from 'react-redux';

import styleCSS from './index.scss'

class Post extends Component {	

	megPost(){
		return(
		<div className={styleCSS.megPostBox} style={{backgroundImage:'url(/src/images/'+this.props.post.imglink+')'}}>
		  	<div className={styleCSS.megPostblock}>
			  <div className={styleCSS.megtitle}>{this.props.post.title}</div>
			  <p className="post_message">{this.props.post.message}</p>
			  <div className={styleCSS.megfuncbox} style={{visibility:this.props.auth.status==="logged in"?'visible':'hidden'}}>
				    <button className="edit"
				    onClick={() => this.props.dispatch({ type: 'EDIT_POST', id: this.props.post.id })
				    }
				    >Edit</button>
				    <button className="delete"
				    onClick={() => this.props.dispatch({ type: 'DELETE_POST', id: this.props.post.id })}
				    >Delete</button>
			  </div>
			</div>
		</div>
			);
	}

	thumbPost(){
		let thumbWidth = this.props.thumbWidth;
		let thumbBoxStyle = 
			{backgroundImage:'url(/src/images/'+this.props.post.imglink+')',
			width:thumbWidth+'px',
			height:thumbWidth+'px'}
		;

		return(
		<div className={styleCSS.thumbPostBox} style={thumbBoxStyle}>
		  <div className={styleCSS.thumbPostTitle} >{this.props.post.title}</div>
		  <div className="control-buttons" style={{display:this.props.auth.status==="logged in"?'block':'none'}}>
		    <button className="edit"
		    onClick={() => this.props.dispatch({ type: 'EDIT_POST', id: this.props.post.id })
		    }
		    >Edit</button>
		    <button className="delete"
		    onClick={() => this.props.dispatch({ type: 'DELETE_POST', id: this.props.post.id })}
		    >Delete</button>
		  </div>
		</div>
			);
	}

	listPost(){
		return(
			<div className={styleCSS.listline}>
				<div className={styleCSS.listTitle}>{this.props.post.title}</div>
				<div className={styleCSS.listfunc} style={{display:this.props.auth.status==="logged in"?'block':'none'}}>
					<button className="edit"
				    onClick={() => this.props.dispatch({ type: 'EDIT_POST', id: this.props.post.id })
				    }
				    >Edit</button>
				    <button className="delete"
				    onClick={() => this.props.dispatch({ type: 'DELETE_POST', id: this.props.post.id })}
				    >Delete</button>
				</div>
			</div>
		);
	}

	showPost(){
		switch(this.props.viewStyle){
			case "MEG_VIEW":
				return this.megPost();
			case "THUMB_VIEW":
				return this.thumbPost();
			case "LIST_VIEW":
				return this.listPost();
			default:
				console.log("fail:"+this.props.viewStyle);
				return this.megPost();
		}
	}

	render() {
	return (
		this.showPost()
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.authReducer
	}
}

export default connect(mapStateToProps)(Post);
