import ClassName from 'models/classname';

import styles from './Oxygen.module.scss';
import DynamicComponent from '../DynamicComponent';
const Oxygen = ({ json }) => {
  // decode json to object
  json = JSON.parse(json);
 
  json = json.children;
 
  return (
     <div key={json.id}>

         {json.map((child) => {
           const name = toPascalCase(child.name);
           return <DynamicComponent key={child.id} name={name} child={child} />;
         })}

     </div>
  );
 };
 
 function toPascalCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|_)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '');
 }
 
 export default Oxygen;
