// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "node:fs/promises";
import * as f from "node:fs"
import * as path from 'node:path';
import * as mime from 'mime-types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const filepath = JSON.parse(req.body).file;
        const stat = await fs.stat(`storage/${filepath}`);
        const ct = mime.contentType(path.extname(`storage/${filepath}`)) as string;
        res.writeHead(200, {
            'Content-Type': ct,
            'Content-Length': stat.size
        })
        console.log(mime.contentType(path.extname(`storage/${filepath}`)));
        const readStream = f.createReadStream(`storage/${filepath}`)
        readStream.pipe(res);
        //res.status(200).json({ name: 'John Doe' })
    } catch (error: any) {
        res.status(500).send(error.message || 'An error occured')
    }
}
