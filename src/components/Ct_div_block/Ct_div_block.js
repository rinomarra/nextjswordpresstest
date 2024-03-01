import ClassName from 'models/classname';
import gsap from 'gsap';
import React, { useEffect } from 'react';
//import styles from './Ct_div_block.module.scss';
import DynamicComponent from 'components/DynamicComponent';
//import { styleGenerator } from '../../lib/util';

const Ct_div_block = ({ child, className, ...rest }) => {
  useEffect(() => {
    // Assumi che 'className' o un'altra classe specifica identifichi l'elemento da animare
    // Ad esempio, anima tutti gli elementi con la classe '.animatable'
    gsap.fromTo(".animatable", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 1 });
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo una volta, al montaggio del componente

  //const sectionClassName = new ClassName(styles.section);
  const sectionClassName = new ClassName();
  // console.log('Child DIV Block', child);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);
  //const generatedStyle = styleGenerator(child.options.original);
  let i = 0;
  if (!child.children) {
    return (
      <div
        key={child.options.selector}
        //style={generatedStyle}
        id={child.options.selector}
        className={'ct-div-block ' + className}
        {...rest}
      >
        {child.options.ct_content}
      </div>
    );
  }

  return (
    //<div style={generatedStyle} id={child.options.selector} className={'ct-div-block ' + className} {...rest}>
    //div className="animatable">Questo è un contenuto dinamico da animare!</div>
    <div id={child.options.selector} className={'ct-div-block ' + className + ' animatable'} {...rest}>
      
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
