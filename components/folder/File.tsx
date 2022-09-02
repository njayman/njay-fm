import { FC } from "react";
import { Folder } from "../../types";
import styles from "../../styles/Folder.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    file: Folder;
}

const File: FC<Props> = ({ file }) => {
    const { asPath } = useRouter();

    const downloadFile = () => {
        try {
            fetch("/api/download", {
                method: "POST",
                body: JSON.stringify({
                    file: `${asPath === "/" ? "" : `${asPath}/`}${file.name}`,
                }),
            }).then((res) => res.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                ;

        } catch (error: any) {
            alert(error.message);
        }
    };

    if (file.type === "directory") {
        /* console.log(`${asPath === "/" ? "" : `${asPath}/`}${file.name}`) */

        return (
            <Link href={`${asPath === "/" ? "" : `${asPath}/`}${file.name}`}>
                <a className={styles.file}>
                    {file.name} | {file.type} <br />
                </a>
            </Link>
        );
    }
    return (
        <div onClick={downloadFile}>
            {file.name} | {file.type} <br />
        </div>
    );
};

export default File;
