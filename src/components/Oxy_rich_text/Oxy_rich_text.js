import React from 'react';
import ClassName from 'models/classname';
import styles from './Oxy_rich_text.module.scss';

const Oxy_rich_text = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  // console.log('Child OXY RICH TEXT', child);
  if (!child.options.classes) {
    className = '';
  } else {
    className = child.options.classes.join(' ');
  }

  sectionClassName.addIf(className, className);

  if (!child.children) {
    return (
      <p
        id={child.options.selector}
        className={'oxy-rich-text ' + className}
        {...rest}
        dangerouslySetInnerHTML={{ __html: child.options.ct_content }}
      ></p>
    );
  }
  return (
    <div id={child.options.selector} className={'oxy-rich-text ' + className} {...rest}>
      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent name={name} child={subchild} />;
      })}
    </div>
  );
};

export default Oxy_rich_text;
function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}
