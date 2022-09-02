import { FC } from "react";
import { Folder } from "../../types";
import styles from "../../styles/Folder.module.css";
import { useRouter } from "next/router";
import File from "./File";

interface Props {
    files: Folder[];
    isRoot?: boolean;
}

const FolderContainer: FC<Props> = ({ files, isRoot = false }) => {
    const router = useRouter();

    return (
        <div className={styles.folder_container}>
            {!isRoot && (
                <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
                    ..
                </div>
            )}
            {files.length === 0 ? (
                <h1>No files</h1>
            ) : (
                <>
                    {files.map((file) => (
                        <File file={file} key={file.id} />
                    ))}
                </>
            )}
        </div>
    );
};

export default FolderContainer;
