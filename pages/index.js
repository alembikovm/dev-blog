import Head from "next/head";
import { Typography } from "antd";
import { useEffect, useState } from "react";

import { isMacOs, isWindows, isWinPhone } from "react-device-detect";

import Layout, { siteTitle } from "../components/layout.tsx";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.scss";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [isCriOs, setisCriOs] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(false);
    setisCriOs(/CriOS/i.test(navigator.userAgent));
  }, []);
  if ((isMacOs && !isCriOs) || (isWindows && !isWinPhone) || isFetching) {
    return <h1>PC</h1>;
  } else {
    return <h1>Mobile</h1>;
  }

  // return (
  //   <Layout home>
  //     <Head>
  //       <title>{siteTitle}</title>
  //     </Head>

  //     <Typography>
  //       <section className={utilStyles.headingMd}>
  //         <Text>Hi, I'm Software Engineer. I solve problems.</Text>
  //       </section>

  //       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
  //         <Title level={2}>Blog</Title>
  //         <ul className={utilStyles.list}>
  //           {allPostsData.map(({ id, date, title }) => (
  //             <li className={utilStyles.listItem} key={id}>
  //               <Link href={`/posts/${id}`}>
  //                 <a>{title}</a>
  //               </Link>
  //               <br />
  //               <small className={utilStyles.lightText}>
  //                 <Date dateString={date} />
  //               </small>
  //             </li>
  //           ))}
  //         </ul>
  //       </section>
  //     </Typography>
  //   </Layout>
  // );
}
