/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Configurazione di yargs
const argv = yargs(hideBin(process.argv)).option('name', {
  alias: 'n',
  describe: 'Il nome del componente',
  type: 'string',
  demandOption: true, // Rende l'argomento obbligatorio
}).argv;

const componentName = argv.name;

// Controlla se il nome del componente è valido (es. non vuoto, formato valido)
if (!componentName.match(/^[A-Za-z0-9_]+$/)) {
  console.error('Errore: Il nome del componente deve essere alfanumerico.');
  process.exit(1);
}

// Crea la directory del componente se non esiste
const componentDir = path.join(__dirname, '..', 'src', 'components', componentName);
if (fs.existsSync(componentDir)) {
  console.error(`Errore: Un componente con il nome ${componentName} esiste già.`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// Template dei file JavaScript da modificare in base alle esigenze dei componenti
const jsContent = `import React from 'react';
import ClassName from 'models/classname';
import dynamicStyles from './${componentName}.module.scss';
import DynamicComponent from 'components/DynamicComponent';
import { toPascalCase } from '../utils/stringUtils';
import { styleGenerator } from '../../lib/util';

const ${componentName} = ({ child, className, tag = 'div', ...rest }) => {
  // Esempio di utilizzo di ClassName per combinare className prop con stili del modulo
  const classNames = new ClassName(dynamicStyles.container, className);

  const generatedStyle = styleGenerator ? styleGenerator(child.options) : {};

  // Utilizzo del tag dinamico per il componente
  const Tag = tag;

  return (
    <Tag className={classNames.toString()} style={generatedStyle} {...rest}>
      {/* Qui potresti utilizzare DynamicComponent e altre logiche specifiche del componente */}
    </Tag>
  );
};

export default ${componentName};
`;


const scssContent = `.container {
  /* Stili del componente */
}
`;

const indexContent = `import ${componentName} from './${componentName}';

export default ${componentName};
`;

// Scrive i file
fs.writeFileSync(path.join(componentDir, `${componentName}.js`), jsContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), scssContent);
fs.writeFileSync(path.join(componentDir, 'index.js'), indexContent);

console.log(`Componente ${componentName} creato con successo.`);
console.log(`Creazione del componente in: ${componentDir}`);
