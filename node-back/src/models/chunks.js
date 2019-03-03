import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import HttpUnprocessableEntityError from '../errors/unprocessable';

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 100],
    message: 'Название файла должно быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];

const typeValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 100],
    message: 'Тип файла должен быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];

export const ChunkSchema = new mongoose.Schema({
  file_id: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: [ true, 'Файл должен иметь название' ],
    index: true,
    trim: true,
    validate: nameValidator
  },

  size: {
    type: Number,
    required: true,
    // max: [ 70 * 1024 * 1024, 'Слишком большой файл' ]
  },

  type: {
    type: String,
    required: true,
    trim: true,
    validate: typeValidator,
  },

  start: {
    type: Number,
    required: true,
  },

  end: {
    type: Number,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  last: {
    type: Boolean,
  },

  content: {
    type: String
  },
});

ChunkSchema.statics.findByChunk = async function (chunk) {
  if (typeof chunk !== 'object') {
    throw 'Bad chunk';
  }
  if (typeof chunk.file_id !== 'string') {
    throw 'Bad chunk "file_id"';
  }

  const { file_id } = chunk;
  const select = { file_id };
  const fields = ['number', 'content'];
  const options = { sort: { start: 1 } };
  const query = this.find(select, fields, options);
  const chunks = await query.exec();

  // Не прилетели все чанки
  // if (chunks.length != chunk.chunk + 1) {
  //   throw new HttpUnprocessableEntityError();
  // }

  return chunks;
}


ChunkSchema.statics.removeChunks = async function (chunks) {
  const ids = Array.from(chunks).map(({ _id }) => _id);
  const select = { _id: { $in : ids } };
  const query = this.deleteMany(select);
  await query.exec();
}



const Chunks = mongoose.model('chunks', ChunkSchema);


export default Chunks;



