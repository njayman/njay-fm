import { Dirent } from "node:fs";
import * as fs from "node:fs/promises";
import { Folder } from "../types";

export const determineBuffertype = (dirent: Dirent): string => {
    if (dirent.isDirectory()) {
        return "directory";
    } else if (dirent.isFile()) {
        return "file";
    } else if (dirent.isSymbolicLink()) {
        return "symlink";
    } else if (dirent.isBlockDevice()) {
        return "block";
    }
    return "unknown";
};

export const openDirectory = async (baseDir: string = 'storage'): Promise<Folder[]> => {
    console.log(baseDir);
    try {
        const fd = await fs.opendir(baseDir);
        const folder: Folder[] = [];
        let idx = 0;
        for await (const dirent of fd) {
            folder.push({
                id: idx,
                name: dirent.name,
                type: determineBuffertype(dirent),
            });
            idx++
        }
        return folder;
    } catch (error) {
        throw error;
    }
};
