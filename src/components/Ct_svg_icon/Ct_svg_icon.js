import React from 'react';
import ClassName from 'models/classname';
import dynamicStyles from './Ct_svg_icon.module.scss';
import DynamicComponent from 'components/DynamicComponent';

import { styleGenerator } from '../../lib/util';

const Ct_svg_icon = ({ child, className, tag = 'div', ...rest }) => {
  const classNames = new ClassName(dynamicStyles.container, className);

  const generatedStyle = styleGenerator ? styleGenerator(child.options) : {};

  const Tag = tag;

  return <Tag className={classNames.toString()} style={generatedStyle} {...rest}></Tag>;
};
function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_svg_icon;
