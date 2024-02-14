import ClassName from 'models/classname';

import styles from './Ct_inner_content.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';
const Ct_inner_content = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  const generatedStyle = styleGenerator(child.options.original);
  console.log('Child INNER CONTENT', child);
  return (
    <div id={child.options.selector} className={className} style={generatedStyle} {...rest}>
      {child?.children &&
        child?.children?.map((subchild, i) => {
          const name = toPascalCase(subchild.name);
          {
            name;
          }
          return <DynamicComponent key={subchild.options.selector + '' + i} name={name} child={subchild} />;
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

export default Ct_inner_content;
