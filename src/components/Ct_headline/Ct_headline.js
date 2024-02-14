import ClassName from 'models/classname';

import styles from './Ct_headline.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import React, { useState, useEffect } from 'react';
import { styleGenerator } from '../../lib/util';
const Ct_headline = ({ child, className, tag, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  const generatedStyle = styleGenerator(child.options.original);

  tag = 'h1';
  if (child.options.original.tag) {
    tag = child.options.original.tag;
  }

  if (!child.children) {
    return React.createElement(
      tag,
      { style: generatedStyle, id: child.options.selector, className: className, ...rest },
      child.options.ct_content
    );
  }
  return (
    <div id={child.options.selector} className={className} {...rest}>
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
