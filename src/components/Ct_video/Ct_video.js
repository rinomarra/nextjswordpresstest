import ClassName from 'models/classname';

import styles from './Ct_video.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';
const Ct_video = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  console.log('Child VIDEO', child);
  sectionClassName.addIf(className, className);
  const generatedStyle = styleGenerator(child.options.original);
  let i = 0;
  if (!child.children) {
    return (
      <div
        key={child.options.selector}
        style={generatedStyle}
        id={child.options.selector}
        className={'ct-div-block ' + className}
        {...rest}
      >
        {child.options.original.video_background && (
          <video autoPlay muted loop id={child.options.selector}>
            <source src={child.options.original.video_background} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  return (
    <div style={generatedStyle} id={child.options.selector} className={'ct-div-block ' + className} {...rest}>
      {child.options.original.video_background && (
        <video autoPlay muted loop id={child.options.selector}>
          <source src={child.options.original.video_background} type="video/mp4" />
        </video>
      )}
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

export default Ct_video;
