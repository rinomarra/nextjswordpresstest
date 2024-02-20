import ClassName from 'models/classname';

//import styles from './Ct_headline.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import React, { useState, useEffect } from 'react';
//import { styleGenerator } from '../../lib/util';
const Ct_headline = ({ child, className, tag, ...rest }) => {
  const sectionClassName = new ClassName();
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  //const generatedStyle = styleGenerator(child.options.original);
  // console.log('Classname', className);
  tag = 'h1';
  // console.log('Hedline', child);
  if (child.options.original.tag) {
    tag = child.options.original.tag;
  }

  if (!child.children) {
    return React.createElement(
      tag,
      {
        //style: generatedStyle,
        id: child.options.selector,
        className: 'ct-headline ' + className,
        ...rest,
        dangerouslySetInnerHTML: { __html: child.options.ct_content },
      },
      null
    );
  }
  return (
    <div id={child.options.selector} className={'ct-headline ' + className} {...rest}>
      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent key={child.selector} name={name} child={subchild} />;
      })}
    </div>
  );
};

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_headline;
