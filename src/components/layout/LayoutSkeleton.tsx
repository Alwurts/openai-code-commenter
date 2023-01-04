import type { FC } from "react";
import React, { Fragment } from "react";
import type { LayoutProps } from "../../types/layout";
import Head from "next/head";

const LayoutBaseSkeleton: FC<LayoutProps> = ({
  children,
  title = "Auto-completer",
}) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </Fragment>
  );
};

export default LayoutBaseSkeleton;
