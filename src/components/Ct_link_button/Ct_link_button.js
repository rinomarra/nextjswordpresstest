import ClassName from 'models/classname';

import styles from './Ct_link_button.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { useEffect } from 'react';
const Ct_link_button = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  if (!child.options.classes) {
    className = '';
  } else {
    className = child.options.classes.join(' ');
  }

  sectionClassName.addIf(className, className);
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
      <a
        id={child.options.selector}
        className={'ct-link-button ' + className}
        {...rest}
        href={url}
        target={target}
        rel={rel}
      >
        {child.options.ct_content}
      </a>
    );
  }
  return (
    <div id={child.options.selector} className={className} {...rest}>
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

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_link_button;
