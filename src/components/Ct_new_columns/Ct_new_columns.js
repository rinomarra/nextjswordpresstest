import React from 'react';
import ClassName from 'models/classname';
import styles from './Ct_new_columns.module.scss';
import DynamicComponent from 'components/DynamicComponent';
// import { toPascalCase } from '../utils/stringUtils';
// import { styleGenerator } from '../../lib/util';

const Ct_new_columns = ({ child, tag = 'div', ...rest }) => {
  // Esempio di utilizzo di ClassName per combinare className prop con stili del modulo
  const sectionClassName = new ClassName(styles.section);
  let className = child.options.classes ? child.options.classes.join(' ') : '';
  console.log('NEW_COLUM_child: ', child);
  const options = child.options.original;

  console.log('Spread di rest:', rest);

  // Esempio di generazione dinamica di stili, se necessario
  // const generatedStyle = styleGenerator ? styleGenerator(child.options) : {};

  // Utilizzo del tag dinamico per il componente
  const Tag = tag;

  return (
    <div
      id={child.options.selector}
      className={className}
      {...rest}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      {child.children.map((subchild) => {
        const name = toPascalCase(subchild.name);
        {
          name;
        }
        return <DynamicComponent key={subchild.subchild} name={name} child={subchild} />;
      })}
    </div>
  );
};

function ColumnSettings({ options, isActiveName, isEmptyComponent, iframeScope }) {
  return (
    <div style={{ display: isActiveName(options.tag) && !isEmptyComponent() ? 'block' : 'none' }}>
      <div className="oxygen-control-row">
        <div className="oxygen-control-wrapper">
          <label className="oxygen-control-label">Stack Columns Vertically</label>
          <div className="oxygen-control oxygen-special-property not-available-for-media not-available-for-classes">
            <div className="oxygen-select oxygen-select-box-wrapper">
              <div
                className="oxygen-select-box"
                // className={`oxygen-option-default ${iframeScope.isInherited(
                //   iframeScope.component.active.id,
                //   'stack-columns-vertically'
                // )}`}
              >
                <div className="oxygen-select-box-current">
                  {iframeScope.getMediaTitle(iframeScope.getOption('stack-columns-vertically'))}
                </div>
                <div className="oxygen-select-box-dropdown"></div>
              </div>
              <div className="oxygen-select-box-options">
                {iframeScope.sortedMediaList().map(
                  (name) =>
                    name !== 'default' && (
                      <div
                        className="oxygen-select-box-option"
                        key={name}
                        onClick={() => iframeScope.setOptionModel('stack-columns-vertically', name)}
                        // className={`oxygen-select-box-option-active ${
                        //   iframeScope.getOption('stack-columns-vertically') === name
                        // }`}
                      >
                        {iframeScope.getMediaTitle(name)}
                      </div>
                    )
                )}
                <div
                  className="oxygen-select-box-option"
                  onClick={() => iframeScope.setOptionModel('stack-columns-vertically', 'never')}
                  // className={`oxygen-select-box-option-active ${
                  //   iframeScope.getOption('stack-columns-vertically') === 'never'
                  // }`}
                >
                  Never
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repeat the similar structure for other settings */}

      {/* Include the toolbar views */}
      {/* {<ToolbarView />} */}
    </div>
  );
}
function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export default Ct_new_columns;
