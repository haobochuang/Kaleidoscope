import React, { Component } from 'react';
import { connect } from 'react-redux';

import styleCSS from './index.scss';


class EditComponent extends Component {

  closeDialog=()=>{
    //e.preventDefault();
    const dialogSwitch = false;
    this.props.dispatch({
       type: 'CLOSE_DIALOG',
       dialogSwitch
     });
  }
  
  handleEdit = (e) => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newMessage = this.getMessage.value;
    const newImglink = this.getImglink.value;
    const data = {
      newTitle,
      newMessage,
      newImglink
    }
    this.props.dispatch({ type: 'UPDATE', id: this.props.post.id, data: data })
  }
render() {
return (
<div key={this.props.post.id} className={styleCSS.darkBox}>
  <div className={styleCSS.editPostBox}>
    <p>EDIT</p>
    <form className="form" onSubmit={this.handleEdit} >
      <input required type="text" ref={(input) => this.getTitle = input}
      defaultValue={this.props.post.title} placeholder="Enter Post Title" /><br /><br />
      <textarea required rows="5" ref={(input) => this.getMessage = input}
      defaultValue={this.props.post.message} cols="28" placeholder="Enter Post" /><br /><br />
      <input required type="text" ref={(input) => this.getImglink = input}
      defaultValue={this.props.post.imglink} placeholder="Enter image link" /><br /><br />
      <button>Update</button>
      <button className={styleCSS.close_Btn} onClick={this.closeDialog}>X</button>
    </form>
  </div>
</div>
);
}
}
export default connect()(EditComponent);