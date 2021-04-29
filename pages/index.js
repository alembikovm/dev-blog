import Head from "next/head";
import { Typography } from "antd";
import { useEffect, useState } from "react";

import {
  isAndroid,
  isIOS,
  isMacOs,
  isWindows,
  isWinPhone,
} from "react-device-detect";

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
  const [isCriOs, setIsCriOs] = useState(false);
  const [isAndroidDesktopEmulator, setIsAndroidDesktopEmulator] = useState(false);

  useEffect(() => {
    setIsCriOs(/CriOS/i.test(navigator.userAgent));
    setIsAndroidDesktopEmulator(/X11; Linux x86_64/i.test(navigator.userAgent));
  }, []);

  return (
    <h1>
      {isIOS || isAndroid || isWinPhone || isCriOs || isAndroidDesktopEmulator ? "Mobile" : "PC"}
    </h1>
  );

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
