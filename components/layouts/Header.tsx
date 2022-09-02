import Head from "next/head";
import { FC } from "react";

interface Props {
    title?: string;
    description?: string;
}

const Header: FC<Props> = ({ title = "Njay-FM", description = "File manager project by njayman" }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
    </Head >
);

export default Header;
