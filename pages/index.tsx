import type { GetServerSideProps, NextPage } from "next";
import FolderContainer from "../components/folder/Container";
import Header from "../components/layouts/Header";
import { openDirectory } from "../libs/folders";
import styles from "../styles/Home.module.css";
import { Folder } from "../types";

interface Props {
    files: Folder[];
}

const Home: NextPage<Props> = ({ files }) => {
    return (
        <div className={styles.container}>
            <Header />
            <FolderContainer files={files} isRoot />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const files: Folder[] = await openDirectory("storage");
        return {
            props: {
                files,
            },
        };
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},

        }
    }
};

export default Home;
