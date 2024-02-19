import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { findMenuLocationById, findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT} from 'lib/menus';

import Section from 'components/Section';

import NavListItem from 'components/NavListItem';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const IigapNav = ({idMenu}) => {
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const location = findMenuLocationById(menus, idMenu);
  const navigation = findMenuByLocation(menus, location);



  return (
    <nav>
        <ul>
          {navigation?.map((listItem) => {
            return <NavListItem key={listItem.id} item={listItem} />;
          })}
        </ul>
    </nav>
  );
};

export default IigapNav;
