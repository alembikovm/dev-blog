import Head from "next/head";
import { Typography } from "antd";
import Layout from "../../components/layout.tsx";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.scss";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  const { Title, Text } = Typography;

  return (
    <Layout>
      <Typography>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <Title>{postData.title}</Title>
          <Text type="secondary">
            <Date dateString={postData.date} />
          </Text>
          <Text>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </Text>
        </article>
      </Typography>
    </Layout>
  );
}
