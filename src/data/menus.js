import { gql } from '@apollo/client';

export const QUERY_ALL_MENUS = gql`
  query AllMenus {
    menus {
      edges {
        node {
          id
          menuItems {
            edges {
              node {
                cssClasses
                id
                parentId
                label
                title
                target
                path
              }
            }
          }
          name
          slug
          locations
        }
      }
    }
  }
`;

export const QUERY_MENU_BY_ID = gql`
query MenuById($menuId: Int!) {
  menus(where: {id: $menuId}) {
    edges {
      node {
        id
        menuItems {
          edges {
            node {
              cssClasses
              id
              parentId
              label
              title
              target
              path
            }
          }
        }
        name
        slug
        locations
      }
    }
  }
}
`;