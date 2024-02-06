import ClassName from 'models/classname';
import styles from './DynamicComponent.module.scss';
import React, { useState, useEffect } from 'react';
function DynamicComponent({ name, child, ...props }) {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    import(`../../components/${name}/${name}`)
       .then((module) => setComponent(() => module.default))
       .catch((error) => console.error(`Failed to load component ${name}: ${error}`));
  }, [name]);

  return Component ? <Component key={child.id}  child={child} {...props} /> : null;
 }
 
 export default DynamicComponent;
 