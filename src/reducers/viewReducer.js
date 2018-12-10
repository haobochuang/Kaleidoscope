const viewReducer = (state = "THUMB_VIEW", action) => {
  switch(action.type) {
    case 'SET_MEG':
      console.log("toggle:"+action.type);
      state = "MEG_VIEW";
      return state;
    case 'SET_THUMB':
      console.log("toggle:"+action.type);
      state = "THUMB_VIEW";
      return state;
    case 'SET_LIST':
      console.log("toggle:"+action.type);
      state = "LIST_VIEW";
      return state;
    default:
      return state;
  }
}
export default viewReducer;