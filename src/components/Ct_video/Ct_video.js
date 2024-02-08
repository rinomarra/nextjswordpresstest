import ClassName from 'models/classname';

import styles from './Ct_video.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { useEffect } from 'react';
const Ct_video = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes.join(' ');

  sectionClassName.addIf(className, className);
  useEffect(() => {
    console.log('child video', child);
  }, []);

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

export default Ct_video;
