/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import ClassName from 'models/classname';
import dynamicStyles from './Ct_image.module.scss';
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

  const sectionClassName = new ClassName(dynamicStyles.section);
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
    console.log('child', child);
  }, []);
  if (options.src) {
    return (
      <img
        id={child.options.selector}
        src={options.src}
        // alt={alt}
        className={`${dynamicStyles.image} ${className}`}
        // style={imgStyle}
        // width={options.width}
        // height={options.height}
        loading={lazy ? 'lazy' : 'eager'}
        {...rest}
      />
    );
  }
  if (options.image_type == 1 || (options.image_type == 2 && !options.attachment_id)) {
    const src = options.attachment_url;
    const alt = options.alt;
    if (false) {
      //   if( class_exists( 'Oxygen_Gutenberg' ) ) {
      //     $image_src = Oxygen_Gutenberg::decorate_attribute($options, $image_src, 'image');
      //     $image_alt = Oxygen_Gutenberg::decorate_attribute($options, $image_alt, 'alt');
      // }
    }
    return (
      <img
        id={child.options.selector}
        src={src}
        alt={alt}
        className={`${dynamicStyles.image} ${className}`}
        width={options.width}
        height={options.height}
        // style={imgStyle}
        loading={lazy ? 'lazy' : 'eager'}
        {...rest}
      />
    );
  } else {
    const attachment_id = options.attachment_id;
    if (attachment_id > 0) {
      const src = options.attachment_url;
      const alt = options.alt;
      let attachment_size = options.attachment_size ? options.attachment_size : 'thumbnail';

      return (
        <img
          id={child.options.selector}
          src={src}
          alt={alt}
          className={`${dynamicStyles.image} ${className}`}
          // style={imgStyle}
          width={options.width}
          height={options.height}
          loading={lazy ? 'lazy' : 'eager'}
          {...rest}
        />
      );
    }
  }
};

export default Ct_image;
