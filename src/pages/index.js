import useSite from 'hooks/use-site';
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebsiteJsonLd } from 'lib/json-ld';
import { Helmet } from 'react-helmet';
import Layout from 'components/Layout';
import Oxygen from 'components/Oxygen';
import { helmetSettingsFromMetadata } from 'lib/site';
import usePageMetadata from 'hooks/use-page-metadata';
export default function Home({ page }) {
  const { metadata: siteMetadata = {} } = useSite();
  const { title, metaTitle, description, slug, content, featuredImage, children, ctBuilderJson, css, masterCss } = page;
  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,

      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
    metadata.style = JSON.parse(css);
  }
  const helmetSettings = helmetSettingsFromMetadata(metadata);
  return (
    <Layout>
      <Helmet {...helmetSettings}>
        <style type="text/css">{JSON.parse(masterCss)}</style>
        <style type="text/css">{JSON.parse(css)}</style>

      </Helmet>
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