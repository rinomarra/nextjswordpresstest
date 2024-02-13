import useSite from 'hooks/use-site';
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';
import Oxygen from 'components/Oxygen';
import styles from 'styles/pages/Home.module.scss';

export default function Home({ page }) {
  const { metadata = {} } = useSite();
  const { title, description, children} = metadata;
  const ctBuilderJson = page.ctBuilderJson;
  console.log(ctBuilderJson)
  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      {/* <Header>
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Header> */}


        
      <Oxygen key='home' json={ctBuilderJson} />

    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {


  let pageUri = `/`;

 

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      page
    },
  };


}