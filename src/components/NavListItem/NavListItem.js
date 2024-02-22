// import ClassName from 'models/classname';
// import styles from './NavListItem.module.scss';
import Link from 'next/link';
import { gsap } from 'gsap';
const NavListItem = ({ className, item }) => {
  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} />;
  });

  const manageMouseEnter = (e) => {
    console.log(e.target);
    const targetId = e.target.getAttribute('data-module');
    gsap.to(`#${targetId}`, {visibility: 'visible', opacity:  1, duration:  0.3});
  };
  
  const manageMouseLeave = (e) => {

    // set all #menu-modules child to hidden
    gsap.to('.menu-module', {visibility: 'hidden', opacity:  0, duration:  0.3});
    const targetId = e.target.getAttribute('data-module');
    gsap.to(`#${targetId}`, {visibility: 'hidden', opacity:  0, duration:  0.3});
  };

  return (
    <li
      // on mouse enter, set the visibility of the target to visible
      onMouseEnter={manageMouseEnter}
      // on mouse leave, set the visibility of the target to hidden
      onMouseLeave={manageMouseLeave}
      data-module={'menu-'+item.databaseId}
      key={item.id}
    >
      {/* 
        Before rendering the Link component, we first check if `item.path` exists
        and if it does not include 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && !item.path.includes('http') && !item.target && (
        <Link href={item.path} title={item.title}>
          {item.label}
        </Link>
      )}
      {/* 
        Before rendering the `a` tag, we first check if `item.path` exists
        and if it includes 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
        </a>
      )}

      {nestedItems.length > 0 && <ul className={className}>{nestedItems}</ul>}
    </li>
  );
};

export default NavListItem;
