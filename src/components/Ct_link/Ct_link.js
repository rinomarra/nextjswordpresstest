import React from 'react';
import ClassName from 'models/classname';
import styles from './Ct_link.module.scss';

import { styleGenerator } from '../../lib/util';
import DynamicComponent from 'components/DynamicComponent';

const Ct_link = ({ child, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  let className = child.options.classes ? child.options.classes.join(' ') : '';
  // console.log('text_LINK_CHILD: ', child);
  const options = child.options.original;
  // Funzione di decode del url se necessario
  function decodeUrlIfNeeded(options) {
    if (options && options.url_encoded === 'true') {
      return decodeURIComponent(options.url);
    }
    let temp_url = options?.url ? options.url : '';
    return temp_url;
  }
  let url = decodeUrlIfNeeded(options);

  const target = options?.target !== '' && options?.target ? options.target : '';

  const rel = options?.rel !== '' && options?.rel ? options.rel : '';

  sectionClassName.addIf(className, className);
  if (!child.children) {
    return (
      <a id={child.options.selector} className={className} {...rest} href={url} target={target} rel={rel}>
        {/* DA CONTROLLARE LOGICA PER IL LINK */}
        {options?.ct_content ? options.ct_content : child.options.ct_content}
      </a>
    );
  }
  return (
    <a id={child.options.selector} className={'ct-link ' + className} {...rest} href={url} target={target} rel={rel}>
      {child.children.map((subchild, i) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent key={subchild.options.selector + i++} name={name} child={subchild} />;
      })}
    </a>
  );
};

export default Ct_link;

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}
