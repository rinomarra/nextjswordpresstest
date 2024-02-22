import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { findMenuLocationById, findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT} from 'lib/menus';

import Section from 'components/Section';

import NavListItem from 'components/NavListItem';
import Oxygen from 'components/Oxygen';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const IigapNav = ({idMenu}) => {
  const formRef = useRef();


  

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const location = findMenuLocationById(menus, idMenu);
  const navigation = findMenuByLocation(menus, location);
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-0.5 w-8 my-1 transition ease transform duration-300`;
  const genericNav = 'z-40 fixed left-0 top-0 bg-white w-full h-screen transition ease transform duration-300';
  if(location == 'NEXT_MAIN_MENU') {
  return (
    <>
    <button
        className="flex flex-col h-12 w-12 justify-center items-center group z-50"
        onClick={() => {
          setIsOpen(!isOpen);
          document.querySelector('body').classList.toggle('locked');
        }}
    >
        <span
            className={`${genericHamburgerLine} ${
                isOpen
                    ? "rotate-45 translate-y-2 group-hover:opacity-100 bg-black"
                    : "group-hover:opacity-100 bg-white"
            }`}
        />
        <span className={`${genericHamburgerLine}
          ${isOpen
            ? "opacity-0 bg-black"
            : " group-hover:opacity-100 bg-white"
          }`}
        />
        <span
            className={`${genericHamburgerLine} ${
                isOpen
                    ? "-rotate-45 -translate-y-3 group-hover:opacity-100 bg-black"
                    : "group-hover:opacity-100 bg-white"
            }`}
        />
    </button>
    <nav id={ location.toLowerCase()} className={`${genericNav} ${isOpen ? "flex" : "collapse"}`}> 
        <div className='w-1/3'>
          
        </div>
        <div id="menu-modules" className='w-1/3 relative'>
        {navigation?.map((listItemFirst) => {
          
          return(
              <div id={"menu-"+listItemFirst.databaseId} className="invisible bg-red-50 menu-module absolute">
              <Oxygen key={listItemFirst.id} json={listItemFirst.menuModule} />
              </div>
          );
        })}
      </div>
      <div className='w-1/3'>
        <ul 
        // set style to justify-content: space-between
        style={{justifyContent: 'space-evenly'}}
        className="h-full flex flex-col p-28"
        >
        {navigation?.map((listItem) => {
            
            return(
                <NavListItem  key={listItem.id} item={listItem} />
            );
          })}
        </ul>
      </div>
    </nav>
    </>

  );
  }
  else{
    return (
      <ul 
      // set style to justify-content: space-between
      style={{justifyContent: 'space-evenly'}}
      className="h-full flex flex-col p-28"
      >
      {navigation?.map((listItem) => {
          
          return(
              <NavListItem  key={listItem.id} item={listItem} />
          );
        })}
      </ul>
    )
  }
};

export default IigapNav;
