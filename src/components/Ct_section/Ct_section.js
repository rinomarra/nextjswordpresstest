import ClassName from 'models/classname';

import styles from './Ct_section.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { styleGenerator } from '../../lib/util';

const Ct_section = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  className = child.options.classes ? child.options.classes.join(' ') : '';
  // sectionClassName.addIf(className, className);
  // const generatedStyle = styleGenerator(child.options.original);
  console.log('section_child', child);

  let videoClass = '';
  let videoHtml = '';

  if (child.options.video_background) {
    videoClass = 'oxy-video-background';
    videoHtml = (
      <div className="oxy-video-container">
        <video autoPlay loop playsInline muted>
          <source src={options.video_background} />
        </video>
        <div className="oxy-video-overlay"></div>
      </div>
    );
  }

  // check if child has children
  if (!child.children) {
    return (
      // <section key={child.selector} style={generatedStyle} id={child.options.selector} className={className} {...rest}>
      <section key={child.selector} id={child.options.selector} className={className} {...rest}>
        {child.options.ct_content}
      </section>
    );
  }

  return (
    // <section style={generatedStyle} id={child.options.selector} className={className} {...rest}>
    <section id={child.options.selector} className={className} {...rest}>
      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent key={subchild.selector} name={name} child={subchild} />;
      })}
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
