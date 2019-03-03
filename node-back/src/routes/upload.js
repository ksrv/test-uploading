import Chunks from '../models/chunks';
import Files from '../models/files';
import fs from 'fs';
import path from 'path';
import HttpInternalServerError from '../errors/internal';
import { execSync } from 'child_process';

/**
 * 
 * @param {Object} req http request
 * @param {object} res http response
 * @param {Function} next callback
 */
export default async function (req, res, next) {
  try {
    let answer = {};
    const { chunk } = req.body;

    const uploadRoot = path.join( __dirname, '..', 'public', 'uploads');
    const chunkpath = path.join( uploadRoot, chunk.file_id );
    const chunkname = path.join( chunkpath, String(chunk.number) );

    // if (!fs.existsSync(uploadRoot)) {
    //   fs.mkdirSync(uploadRoot,{ recursive: true });
    // }

    if (!fs.existsSync(chunkpath)) {
      fs.mkdirSync(chunkpath, { recursive: true });
    }

    fs.writeFile(chunkname, chunk.content, 'base64');

    chunk.content = chunkname;
    const result = await Chunks.create(chunk);
    answer = { _id: result._id };


    if (chunk.last) {
      const chunks = await Chunks.findByChunk(chunk);
      const filename = path.join( uploadRoot, chunk.name );
      const files = chunks.map(chunk => path.join( chunkpath, String(chunk.number) ));
      const catCommand = `cat ${ files.join(' ') } > ${ filename }`;
      const rmCommand = `rm -rf ${ chunkpath }`;

      execSync(catCommand);
      execSync(rmCommand);

      const url = `http://localhost:3000/${ chunk.name }`;
      const { name, type, size } = chunk;
      const file = await Files.create({ name, type, size, url });

      await Chunks.removeChunks(chunks);
      answer = { file };
    }

    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
};