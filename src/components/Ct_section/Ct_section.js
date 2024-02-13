import ClassName from 'models/classname';

import styles from './Ct_section.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';
import React, { useState, useEffect } from 'react';


const Ct_section = ({ child, className, tag, ...rest }) => {

  console.log(child);
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  
  const generatedStyle = styleGenerator(child.options.original);


  if(child.options.original.tag){
    tag = child.options.original.tag;
  }
  else{
    tag = 'section';
  }

if (!child.children) {

    return React.createElement(tag, {style: generatedStyle, id: child.options.selector, className: className, ...rest}, child.options.ct_content);

  }
  
  return (
    <section style={generatedStyle} id={child.options.selector} className={className} {...rest}>

      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {name}
        return <DynamicComponent key={subchild.selector} name={name} child={subchild} />;
      }
      )}

    </section>
  );
};

function toPascalCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|_)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '');
 }

export default Ct_section;
