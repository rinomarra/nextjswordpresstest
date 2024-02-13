import ClassName from 'models/classname';

import styles from './Ct_div_block.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';

const Ct_div_block = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  const generatedStyle = styleGenerator(child.options.original);

  if (!child.children) {
  
    return (
      <div key={child.selector} style={generatedStyle} id={child.options.selector} className={className} {...rest}>
        {child.options.ct_content}
      </div>
    );
    
  }

  return (
    <div style={generatedStyle} id={child.options.selector} className={className} {...rest}>

      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {name}
        return <DynamicComponent key={subchild.subchild}  name={name} child={subchild} />;
      }
      )}

    </div>
  );
};

function toPascalCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|_)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, '');
 }

export default Ct_div_block;
