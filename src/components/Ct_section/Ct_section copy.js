import ClassName from 'models/classname';


import DynamicComponent from 'components/DynamicComponent';

import React, { useState, useEffect } from 'react';

const Ct_section = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName();
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);


  let i = 0;
  const CustomTag = (child.options.original.tag != undefined) ? child.options.original.tag : 'section';

  return (
    
    <CustomTag key={child.selector} id={child.options.selector} className={'ct-section ' + className} {...rest}>
      {child.options.original.video_background && (
        <video autoPlay muted loop id={child.options.selector}>
          <source src={child.options.original.video_background} type="video/mp4" />
        </video>
      )}

      <div className="ct-section-inner-wrap">
        {child.options.ct_content}

        {/* if child isnt empty */}
        {child.children &&
          child.children.map((subchild) => {
            const name = toPascalCase(subchild.name);
            {
              name;
            }
            return (
              <DynamicComponent key={'section' + '-' + subchild.options.selector + i++} name={name} child={subchild} />
            );
          })}
      </div>
    </CustomTag>
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
