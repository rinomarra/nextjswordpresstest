import React from 'react';
import ClassName from 'models/classname';
import styles from './Ct_span.module.scss';
import DynamicComponent from 'components/DynamicComponent';

const Ct_span = ({ child, className, tag = 'div', ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  // console.log('Child SPAN', child);
  if (!child.options.classes) {
    className = '';
  } else {
    className = child.options.classes.join(' ');
  }

  sectionClassName.addIf(className, className);

  if (!child.children) {
    // console.log('Child SPAN-----------------------------');
    return (
      <span
        id={child.options.selector}
        className={'ct-span ' + className}
        {...rest}
        dangerouslySetInnerHTML={{ __html: child.options.ct_content }}
      ></span>
    );
  }
  return (
    <span span id={child.options.selector} className={'ct-span ' + className} {...rest}>
      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent name={name} child={subchild} />;
      })}
    </span>
  );
};

export default Ct_span;
function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}
