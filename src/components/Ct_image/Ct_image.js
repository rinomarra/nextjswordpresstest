/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import ClassName from 'models/classname';
import dynamicStyles from './Ct_image.module.scss';
//import DynamicComponent from 'components/DynamicComponent';
//import { toPascalCase } from '../utils/stringUtils';
//import { styleGenerator } from '../../lib/util';

const Ct_image = ({ child, className = '', alt, width, height, lazy = true, objectFit = 'cover', objectPosition = 'center center', ...rest }) => {
  // Esempio di utilizzo di ClassName per combinare className prop con stili del modulo

  const sectionClassName = new ClassName(dynamicStyles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);

  //const generatedStyle = styleGenerator(child.options.original);

  const imgStyle = {
    objectFit,
    objectPosition,
    width: width ? `${width}px` : 'auto', // Assumi che width e height siano forniti in pixel
    height: height ? `${height}px` : 'auto',
  };
  useEffect(() => {
    console.log('child', child);
  }, []);
  

  return (
    <img id={child.options.selector}
      src={child.options.original.attachment_url}
      alt={alt}
      className={`${dynamicStyles.image} ${className}`}
      style={imgStyle}
      loading={lazy ? 'lazy' : 'eager'}
      {...rest}
    />
  );
};

export default Ct_image;
