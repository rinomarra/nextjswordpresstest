import ClassName from 'models/classname';


import { MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import IigapNav from 'components/IigapNav';
const Oxy_nav_menu = ({ child, ...rest }) => {

  let idMenu = child.options.original.menu_id;
  return(
    <IigapNav
    idMenu={idMenu}
      {...rest}
    />
  )


};

function toPascalCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|_)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '');
 }

export default Oxy_nav_menu;
