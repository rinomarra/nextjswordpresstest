import ClassName from 'models/classname';

import styles from './Ct_section.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';
import React, { useState, useEffect } from 'react';

const Ct_section = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);

  const generatedStyle = styleGenerator(child.options.original);
  console.log('Child SECTION', child);
  let tag;
  if (child.options.original.tag != undefined) {
    tag = child.options.original.tag;
  } else {
    tag = 'section';
  }

  return (
    <section key={child.selector} style={generatedStyle} id={child.options.selector} className={className} {...rest}>
      {child.options.original.video_background && (
        <video autoPlay muted loop id={child.options.selector}>
          <source src={child.options.original.video_background} type="video/mp4" />
        </video>
      )}

      <div className="ct-section-inner-wrap">
        {child.options.ct_content}

        {/* if child isnt empty */}
        {child.children &&
          child.children.map((subchild, i) => {
            const name = toPascalCase(subchild.name);
            // console.log('Subchild section', subchild);
            // console.log('subchild option', subchild.options);
            // console.log('subchild selector', subchild.options.selector);
            {
              name;
            }
            return <DynamicComponent key={subchild.options.selector + '' + i} name={name} child={subchild} />;
          })}
      </div>
    </section>
  );
};

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_section;
