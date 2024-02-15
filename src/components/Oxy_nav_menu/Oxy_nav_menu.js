import ClassName from 'models/classname';


import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import IigapNav from 'components/IigapNav';
const Oxy_nav_menu = ({ child, ...rest }) => {

  let menuId = child.options.original.menu_id;
  // menuId should be integer
  if (isNaN(menuId)) {
    menuId = findMenuByLocation(MENU_LOCATION_NAVIGATION_DEFAULT).id;
  }
  else {
    menuId = parseInt(menuId);
  }
  return(
    <IigapNav
      menuId={menuId}
    />
  )


};

function toPascalCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|_)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '');
 }

export default Oxy_nav_menu;
