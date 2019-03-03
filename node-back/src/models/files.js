import mongoose from 'mongoose';
import validate from 'mongoose-validator';


const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 100],
    message: 'Название файла в нашем суперприложении должно быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];


const descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Название файла в нашем суперприложении должно быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];


const typeValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 100],
    message: 'Тип файла должен быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];


const urlValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 100],
    message: 'URL файла должен быть длиной от{ARGS[0]} до {ARGS[1]} символов',
  }) 
];


export const FilesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Файл должен иметь название' ],
    index: true,
    trim: true,
    validate: nameValidator
  },

  description: {
    type: String,
    trim: true,
    validate: descriptionValidator,
  },

  type: {
    type: String,
    required: true,
    trim: true,
    validate: typeValidator,
  },

  size: {
    type: Number,
    // max: [ 10 * 1024 * 1024, 'Слишком большой файл' ]
  },

  url: {
    type: String,
    required: true,
    trim: true,
    validate: urlValidator,
  },
});


const Files = mongoose.model('files', FilesSchema);


export default Files;



