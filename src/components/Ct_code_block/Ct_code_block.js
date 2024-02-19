import ClassName from 'models/classname';


import DynamicComponent from 'components/DynamicComponent';

const Ct_code_block = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName();
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);

  let i = 0;

  


  const code = child.options.original;

  // get php-code key from code object
  const phpCode = code['code-php'];
  


  return (
    <div id={child.options.selector} className={'ct-code-block ' + className} {...rest}>
      <div dangerouslySetInnerHTML={{ __html: phpCode }} />
    </div>
  );
}


function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_code_block;
