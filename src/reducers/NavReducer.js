const NavReducer = (dialogSwitch = false, action) => {
  switch(action.type) {
    case 'SHOW_DIALOG':
      console.log(action.type);
      dialogSwitch = true;
      return dialogSwitch;
    case 'CLOSE_DIALOG':
      console.log(action.type);
      dialogSwitch = false;
      return dialogSwitch;
    default:
      return dialogSwitch;
  }
}
export default NavReducer;