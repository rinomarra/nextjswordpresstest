import { getApolloClient } from 'lib/apollo-client';
import { getTopLevelPages } from 'lib/pages';
import { QUERY_ALL_MENUS } from 'data/menus';
import { QUERY_MENU_BY_ID } from 'data/menus';

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'DEFAULT_NAVIGATION';

/**
 * getAllMenus
 */

export async function getAllMenus() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.data.menus.edges.map(mapMenuData);

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  return {
    menus,
  };
}

export async function findMenuById( menuId ) {
  const apolloClient = getApolloClient();

  // Assicurati che menuId sia un intero
  const menuIdInt = parseInt(menuId, 10);
  if (isNaN(menuIdInt)) {
    throw new Error("menuId deve essere un numero intero.");
  }

  const data = await apolloClient.query({
    query: QUERY_MENU_BY_ID,
    //  variables: { menuId },
    variables: { menuId: menuIdInt },
  });

  const menus = data?.data.menus.edges.map(mapMenuData);

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  return {
    menus,
  };
}


/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
  const { node } = menu;
  const data = { ...node };

  data.menuItems = data.menuItems.edges.map(({ node }) => {
    return { ...node };
  });

  return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages) {
  return pages.map(({ id, uri, title }) => {
    return {
      label: title,
      path: uri,
      id,
    };
  });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages({ locations, pages }) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  };
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};

/**
 * findMenuByLocation
 */

export function findMenuByLocation(menus, location) {
  if (typeof location !== 'string') {
    throw new Error('Failed to find menu by location - location is not a string.');
  }

  const menu = menus.find(({ locations }) => {
    return locations.map((loc) => loc.toUpperCase()).includes(location.toUpperCase());
  });

  return menu && parseHierarchicalMenu(menu.menuItems);
}

/**
 * findMenuItemById
 */

export function findMenuItemById(id) {
  if (!Array.isArray(menu)) {
    throw new Error('Failed to find menu item by id - menu is not an array.');
  }

  const menuItem = menu.find((item) => {
    return item.id === id;
  });

  return menuItem;
}