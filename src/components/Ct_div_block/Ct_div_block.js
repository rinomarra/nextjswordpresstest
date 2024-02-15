import ClassName from 'models/classname';

import styles from './Ct_div_block.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';

const Ct_div_block = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  const generatedStyle = styleGenerator(child.options.original);
  let i = 0;
  console.log('Child DIV Block', child);
  if (!child.children) {
    return (
      <div
        key={child.options.selector}
        style={generatedStyle}
        id={child.options.selector}
        className={'ct-div-block ' + className}
        {...rest}
      >
        {child.options.ct_content}
      </div>
    );
  }

  return (
    <div style={generatedStyle} id={child.options.selector} className={'ct-div-block ' + className} {...rest}>
      {child.children.map((subchild, i) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent key={subchild.options.selector + i++} name={name} child={subchild} />;
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

export default Ct_div_block;
