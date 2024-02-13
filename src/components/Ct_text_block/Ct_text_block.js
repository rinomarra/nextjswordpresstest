import ClassName from 'models/classname';

import styles from './Ct_text_block.module.scss';
import DynamicComponent from 'components/DynamicComponent';
const Ct_text_block = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);

  if (!child.options.classes) {
    className = '';
  } else {
    className = child.options.classes.join(' ');
  }


  sectionClassName.addIf(className, className);

  if (!child.children) {

    return (
      <h1 id={child.options.selector} className={className} {...rest}>
        {child.options.ct_content}
      </h1>
    );

  }
  return (
    <div id={child.options.selector} className={className} {...rest}>

      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {name}
        return <DynamicComponent name={name} child={subchild} />;
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

export default Ct_text_block;
