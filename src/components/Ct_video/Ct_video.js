import ClassName from 'models/classname';

// import styles from './Ct_video.module.scss';
import DynamicComponent from 'components/DynamicComponent';
// import { styleGenerator } from '../../lib/util';
const Ct_video = ({ child, className, ...rest }) => {
  const sectionClassName = new ClassName();
  className = child.options.classes ? child.options.classes.join(' ') : '';
  console.log('Child VIDEO', child);

  sectionClassName.addIf(className, className);
  // const generatedStyle = styleGenerator(child.options.original);
  let i = 0;
  function getYouTubeEmbedId(url) {
    // Match il pattern dell'ID del video da un URL di YouTube
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (match && match[1]) {
      // Restituisci l'ID del video
      return match[1];
    } else {
      // Se l'URL non corrisponde al pattern atteso, restituisci null o gestisci l'errore in modo appropriato
      return null;
    }
  }
  if (!child.children) {
    return (
      <div
        style={{
          paddingBottom: child.options.original['video-padding-bottom']
            ? child.options.original['video-padding-bottom']
            : null,
          position: 'relative',
          width: '100%',
          height: 0,
          paddingTop: '56.25%',
        }}
        key={child.options.selector}
        id={child.options.selector}
        className={' ' + className}
        {...rest}
      >
        {child.options.original.src && (
          // <video controls id={child.options.selector}>
          //   <source src={child.options.original.src} type="video/mp4" />
          // </video>
          <iframe
            frameBorder="0"
            src={`https://www.youtube.com/embed/${getYouTubeEmbedId(child.options.original.src)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          ></iframe>
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
