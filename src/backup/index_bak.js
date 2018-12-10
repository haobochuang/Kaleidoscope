import React from "react"
import ReactDOM from "react-dom"

import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from "redux"
import rootReducer from './reducers'
import App1 from './components/App'

import styleCSS  from "./index.scss"


const store = createStore(rootReducer);


//landing page
class App extends React.Component {

  constructor(props){
  	super(props);

  	//bind function to deliver data bewteen child & parent.
  	this.fetchPostNumfromPool = this.fetchPostNumfromPool.bind(this);
  	this.fetchViewStyle = this.fetchViewStyle.bind(this);
  	this.pushNewPost = this.pushNewPost.bind(this);
  	this.state={
  		numofPost:0,
  		viewStyle:"thumb", //default view style: meg, thumb, list
  		showNewpost:false
  	}
  }

  fetchPostNumfromPool(data){
  	this.setState({numofPost:data});
  }

  fetchViewStyle(viewdata){
  	this.setState({viewStyle:viewdata});
  	//alert("App:"+this.state.viewStyle);
  }

  //test
  changeViewStyleMeg(event){
  	this.setState({viewStyle:"meg"});
  }
  changeViewStyleThumb(event){
  	this.setState({viewStyle:"thumb"});
  }
  changeViewStyleList(event){
  	this.setState({viewStyle:"list"});
  }


  //add new Post function
  newPost(){
  	console.log("new post");
  	this.setState({showNewpost:true});
  }

  pushNewPost=(title,tag,content)=>{
  	//alert("pushNewPost");
  	var date = new Date();
  	POSTDATAS.unshift({
			"title":title,
			"tag":tag,
			"date":date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate(),
			"bgimg":"/src/images/0"+(Math.ceil(Math.random()*6))+".jpg",
			"content":content
		});
  	this.setState({numofPost:POSTDATAS.length});
  	this.setState({showNewpost:false});
  	console.log("length:"+POSTDATAS.length);
  }

  closeNewPost=()=>{
  	this.setState({showNewpost:false});
  }


  render() {
    return (
    	<div className={styleCSS.box}>
    		<Header shownumofPost={this.state.numofPost}
    				showNewpost={this.state.showNewpost}
    				newPost={this.newPost.bind(this)}
    				sendViewData={this.fetchViewStyle}
    				postlength={POSTDATAS.length}
    				pushNewPost={this.pushNewPost}
    				closeNewPost={this.closeNewPost}
    				btnViewMeg={this.changeViewStyleMeg.bind(this)}
    				btnViewThumb={this.changeViewStyleThumb.bind(this)}
    				btnViewList={this.changeViewStyleList.bind(this)}
    				/>

    		<div className={styleCSS.poolcontainer}>
    			<Pool postdatas={POSTDATAS} sendData={this.fetchPostNumfromPool} showviewStyle={this.state.viewStyle} />
    		</div>
    		<Footer />
    	</div>
    );
  }
}


//header
class Header extends React.Component{
  
  constructor(props){
  	super(props);
  	//this.newPost = this.newPost.bind(this);
/*  	this.sendViewStyle = this.sendViewStyle.bind(this);
  	this.switchtoMegView = this.switchtoMegView.bind(this);
  	this.switchtoThumbView = this.switchtoThumbView.bind(this);
  	this.switchtoListView = this.switchtoListView.bind(this);
*/
  	this.state ={
  		userName:'Jackie',
  		hviewStyle:"thumb"
  	};
  }


  render() {

    return (
    	<div className={styleCSS.header}>
    		
    		<NewPost showNewpost={this.props.showNewpost}
    				 addPost={this.props.addPost}
    				 pushNewPost={this.props.pushNewPost}
    				 closeNewPost={this.props.closeNewPost}
    				 />

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


//on Click 'new', show new post dialog
class NewPost extends React.Component{
  constructor(props){
  	super(props);
  	this.handleTitleChange = this.handleTitleChange.bind(this);
  	this.handleTagChange = this.handleTagChange.bind(this);
  	this.handleContentChange = this.handleContentChange.bind(this);
  	//this.handleSumbit = this.handleSubmit.bind(this);
  	this.state={
  		newTitle:"new Title",
  		newTag:"somewhere",
  		newContent:"content"
  	}
  }

  handleTitleChange(event){
  	this.setState({newTitle:event.target.value});
  }

  handleTagChange(event){
  	this.setState({newTag:event.target.value});
  }

  handleContentChange(event){
  	this.setState({newContent:event.target.value});
  }

  handleSumbit=(event)=>{
  	event.preventDefault(event);
  	//lert("handlepost");
  	//this.props.showNewpost = false;
  	this.props.pushNewPost(this.state.newTitle,this.state.newTag,this.state.newContent);
  }


  render(){
  	return(
  		<div className={styleCSS.newPostBox} style={{display:this.props.showNewpost?'block':'none'}}>
  		<div className={styleCSS.newpost} >
  			<p>New Post</p>
  			<form className={styleCSS.newPostForm} onSubmit={this.handleSumbit}>
  				<label>
				    <div>title:</div>
				    <input type="text" name="title" value={this.state.newTitle} onChange={this.handleTitleChange} />
				</label>
				
				<label>
				     <div>tag:</div>
				    <input type="text" name="tag" value={this.state.newTag} onChange={this.handleTagChange} />
				</label>
				
				<label>
				     <div>article:</div>
				    <textarea name="content" value={this.state.newContent} onChange={this.handleContentChange} className={styleCSS.newPostContent} />
				</label>

				<div className={styleCSS.formButton}>
					<input type="submit" value="POST" />
					<input type="button" value="CANCEL" onClick={this.props.closeNewPost}/>
				</div>
  			</form>

  		</div>
  		</div>
  	);
  }
}

//pool for post
class Pool extends React.Component{

  constructor(props){
  	super(props);

  	//bind function to deliver data bewteen child & parent.
  	this.sendNumofPost = this.sendNumofPost.bind(this);
  	this.state=({
  		Pviewstyle:"thumb"
  	});
  	
	
  }

//show elements in list style
  element2List(){
  		return(
  			<ul className={styleCSS.plistUL}>
  				<li className={styleCSS.plistIndex}><div>date</div><div>title</div><div>tag</div></li>
  				{this.props.postdatas.map(
  					(post,i) => {
  						return(
  							<li key={i} className={styleCSS.plist}>
  								<div className={styleCSS.plistDate}>{post.date}</div>
  								<div className={styleCSS.plistTitle}>{post.title}</div>
  								<div className={styleCSS.plistTag}>{post.tag}</div>
  							</li>
  							);
  					}

  					)
  				}
  			</ul>
  			);
  }

//show elements in thumb style
  element2thumb(){
  		return(
  				this.props.postdatas.map(
  					(post,i) => {
  						return(
  							<Pelement 
	  							key={i} 
	  							title={post.title} 
	  							tag={post.tag} 
	  							date={post.date} 
	  							bgimg={post.bgimg}
  							/>
  							);
  					}

  					)
  				
  			);
  }

//show elements in megzine style
  element2meg(){
  		return(
  				this.props.postdatas.map(
  					(post,i)=>{
  						return(
  							<Pmeg
  								key={i}
  								title={post.title}
  								tag={post.tag}
  								date={post.date}
  								content={post.content}
  								bgimg={post.bgimg}
  							/>
  							);
  					}
  					)
  			);
  }

  switchView(){
  	var v = this.props.showviewStyle;
  	var rviewstyle;
  	switch(v){
  		case "meg":{rviewstyle = this.element2meg();
  					//alert("Pool:meg");
  					break;}
  		case "thumb":{rviewstyle = this.element2thumb();
  					//alert("Pool:thumb");
  					break;}
  		case "list":{rviewstyle = this.element2List();
  					//alert("Pool:list");
  					break;}
  		default:{rviewstyle = this.element2meg();}
  	}
  	return rviewstyle;
  }

//send number of post to Parent:App
  sendNumofPost(){
  	var temp = this.props.postdatas.length;
  	this.props.sendData(temp);
  }

  componentDidMount(){
  	this.sendNumofPost();
  }

  render() {
  	var vstyle;
  	if(this.props.showviewStyle=="meg"){vstyle=(styleCSS.poolmeg);}
	else if(this.props.showviewStyle=="thumb"){vstyle=(styleCSS.pool);}
    else{vstyle=(styleCSS.poollist);}
    return (
    	<div className={vstyle}>
    		{this.switchView()}
    	</div>
    );
  }
}

//post meg type
class Pmeg extends React.Component{
  
  constructor(props){
  	super(props);
  }

  render() {
    return (
    	<div className={styleCSS.pmeg} style={{backgroundImage:'url('+this.props.bgimg+')'}}>
	    	<div className={styleCSS.pmegblock}>
	    		<div className={styleCSS.pmegtitle}>{this.props.title}</div>
	    		<div className={styleCSS.pmegtitletags}><a href="">{this.props.tag}</a></div>
	    		<div className={styleCSS.pmegdate}>{this.props.date}</div>
	    		<div className={styleCSS.pmegcontent}>{this.props.content}</div>
	    	</div>
	    	<div className={styleCSS.pmegfunc}>
	    		<div className={styleCSS.pmegedit}>edit</div>
	    		<div className={styleCSS.pmegedit}>delete</div>
	    	</div>
	    </div>
    );
  }
}

//post element
class Pelement extends React.Component{
  
  constructor(props){
  	super(props);
  }

  render() {
    return (
    	<div className={styleCSS.pelement} style={{backgroundImage:'url('+this.props.bgimg+')'}}>
	  			<div className={styleCSS.pdate}>{this.props.date}</div>
	    		<div className={styleCSS.ptitle}>{this.props.title}</div>
	    		<div className={styleCSS.ptags}><a href="">{this.props.tag}</a></div>
	    		<div className={styleCSS.pedit}><button className={styleCSS.navbtn}>...</button></div>
	    </div>
    );
  }
}


//---test <<REDUX>> test---

class ReduxTest extends React.Component{

constructor(props){
  	super(props);
  }


toggleTest(){
	
}

	render(){
		return(
			<div>
				<button onClick={this.toggleTest}>test</button>
				<div>{}</div>
			</div>
		);
	}
}




//---test <<REDUX>> test---


//posts small
var POSTDATAS2 = [
		{
			"title":"Happy Halloween",
			"tag":"taipei",
			"date":"10.28",
			"bgimg":"/src/images/01.jpg",
			"content":"Helloween is a German power metal band founded in 1984 in Hamburg, Northern Germany by members of bands Iron Fist and Gentry. "
		}];

//posts normal
var POSTDATAS = [
		{
			"title":"Happy afternoon",
			"tag":"taipei",
			"date":"2018.10.28",
			"bgimg":"/src/images/01.jpg",
			"content":"Helloween is a German power metal band founded in 1984 in Hamburg, Northern Germany by members of bands Iron Fist and Gentry. "
		},
		{
			"title":"Go Hiking",
			"tag":"yangmingshan",
			"date":"2018.9.27",
			"bgimg":"/src/images/02.jpg",
			"content":"Hiking is the preferred term, in Canada and the United States, for a long, vigorous walk, usually on trails"
		},
		{
			"title":"tiny cars",
			"tag":"iLan",
			"date":"2018.8.02",
			"bgimg":"/src/images/03.jpg",
			"content":"this is content."
		},
		{
			"title":"summer season",
			"tag":"Hsinchu",
			"date":"2018.7.29",
			"bgimg":"/src/images/04.jpg",
			"content":"this is content."
		},
		{
			"title":"playground",
			"tag":"taichung",
			"date":"2018.7.24",
			"bgimg":"/src/images/05.jpg",
			"content":"this is content."
		},
		{
			"title":"hiking in California",
			"tag":"taichung",
			"date":"2018.7.7",
			"bgimg":"/src/images/06.jpg",
			"content":"this is content."
		},
		{
			"title":"play ball!",
			"tag":"SanFrancisco",
			"date":"2018.7.1",
			"bgimg":"/src/images/07.jpg",
			"content":"this is content."
		}
	];


ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, 
	document.getElementById("app")
);

