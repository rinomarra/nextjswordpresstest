/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import ClassName from 'models/classname';
import styles from './Ct_image.module.scss';
//import DynamicComponent from 'components/DynamicComponent';
//import { toPascalCase } from '../utils/stringUtils';
import { styleGenerator } from '../../lib/util';

const Ct_image = ({
  child,
  className = '',

  lazy = true,
  objectFit = 'cover',
  objectPosition = 'center center',
  ...rest
}) => {
  // Esempio di utilizzo di ClassName per combinare className prop con stili del modulo

  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  sectionClassName.addIf(className, className);

  const generatedStyle = styleGenerator(child.options.original);
  //Options come da originale
  const options = child.options.original;

  // const imgStyle = {
  //   objectFit,
  //   objectPosition,
  //   width: width ? `${width}px` : 'auto', // Assumi che width e height siano forniti in pixel
  //   height: height ? `${height}px` : 'auto',
  // };
  useEffect(() => {
    // console.log('child', child);
  }, []);
  if (options.src) {
    // console.log('CASO 1 IMG');
    return (
      <div>
        <img
          id={child.options.selector}
          src={options.src}
          // alt={alt}
          style={generatedStyle}
          className={className}
          // style={imgStyle}
          width={options.width}
          height={options.height}
          loading={lazy ? 'lazy' : 'eager'}
          {...rest}
        />
      </div>
    );
  }
  if (options.image_type == 1 || (options.image_type == 2 && !options.attachment_id)) {
    const src = options.attachment_url;
    const alt = options.alt;
    // console.log('CASO 2 IMG');
    return (
      <div>
        <img
          id={child.options.selector}
          src={src}
          alt={alt}
          className={className}
          width={options.width}
          height={options.height}
          style={generatedStyle}
          // style={imgStyle}
          loading={lazy ? 'lazy' : 'eager'}
          {...rest}
        />
      </div>
    );
  } else {
    const attachment_id = options.attachment_id;
    if (attachment_id > 0) {
      const src = options.attachment_url;
      const alt = options.alt;
      let attachment_size = options.attachment_size ? options.attachment_size : 'thumbnail';

      return (
        <div>
          <img
            id={child.options.selector}
            src={src}
            alt={alt}
            className={className}
            // style={imgStyle}
            width={options.width}
            style={generatedStyle}
            height={options.height}
            loading={lazy ? 'lazy' : 'eager'}
            {...rest}
          />
        </div>
      );
    }
  }
};
function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}
export default Ct_image;
