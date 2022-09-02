import { GetServerSideProps, NextPage } from 'next'
import FolderContainer from '../components/folder/Container'
import { openDirectory } from '../libs/folders'
import { Folder } from '../types'

interface Props {
    files: Folder[]
}

const FilePath: NextPage<Props> = ({ files }) => {
    return (
        <FolderContainer files={files} />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const filepath = context.query.path as string[];
        const files: Folder[] = await openDirectory(`storage/${filepath.join("/")}`);
        return {
            props: {
                files
            }
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }
}

export default FilePath
