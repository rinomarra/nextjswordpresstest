import ClassName from 'models/classname';

import styles from './Ct_text_block.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import Ct_span from 'components/Ct_span';
const Ct_text_block = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);
  // console.log('Child TEXT Block', child);
  if (!child.options.classes) {
    className = '';
  } else {
    className = child.options.classes.join(' ');
  }

  sectionClassName.addIf(className, className);

  const renderContentWithSpans = (content) => {
    const elements = [];
    let currentIndex = 0;
    content.replace(/<span\s[^>]*>.*?<\/span>/g, (match, offset) => {
      const spanIdPlaceholder = match.match(/id="(.*?)"/)[1];
      const id = Number(spanIdPlaceholder.match(/\d+/)[0]);
      const text_child = child.children.find((subchild) => subchild.id === id);
      const name = toPascalCase(text_child.name);
      const text = text_child ? text_child.options.ct_content : '';
      if (offset > currentIndex) {
        elements.push(content.substring(currentIndex, offset));
      }
      if (text_child) {
        elements.push(<DynamicComponent name={name} key={spanIdPlaceholder} child={text_child} />);
      } else {
        elements.push(text);
      }
      currentIndex = offset + match.length;
    });
    if (currentIndex < content.length) {
      elements.push(content.substring(currentIndex));
    }

    return elements;
  };

  if (!child.children) {
    return (
      <p
        id={child.options.selector}
        className={'ct-text-block ' + className}
        {...rest}
        dangerouslySetInnerHTML={{ __html: child.options.ct_content }}
      ></p>
    );
  }

  return (
    <p
      id={child.options.selector}
      className={'ct-text-block ' + className}
      {...rest}
      // dangerouslySetInnerHTML={{ __html: renderContentWithSpans(child.options.ct_content) }}
    >
      {/* {child.options.ct_content} */}
      {renderContentWithSpans(child.options.ct_content)}
      {/* {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent name={name} child={subchild} key={subchild.options.selector} />;
      })} */}
    </p>
  );
};

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_text_block;
