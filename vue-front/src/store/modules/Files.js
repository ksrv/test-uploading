import providers from '@/providers';



class Uploader {
  constructor (chunkSize, onChunkError, onChunkRead, onSuccess) {
    this.onChunkError = (typeof onChunkError === 'function') ? onChunkError : () => {};
    this.onChunkRead = (typeof onChunkRead === 'function') ? onChunkRead : () => {};
    this.onSuccess = (typeof onSuccess === 'function') ? onSuccess : () => {};

    this.chunkSize = isNaN(chunkSize) ?  200 * 1024 : chunkSize;

    this.file_id = null;
    this.size = 0;
    this.name = null;
    this.type = null;

    this.offset = 0;
    this.chunk = 0;
    this.offset = 0;
    this.start = 0;
    this.end = 0;
  }

  upload(file) {
    this.file_id = Math.random().toString(36).substring(4);
    this.file = file;
    this.size = file.size;
    this.name = file.name;
    this.type = file.type;
    this.number = 0;
    this.offset = 0;
    this.start = 0;
    this.end = 0;
    this.last = false;
    this.readBlock();
  }

  readBlock () {
    const reader = new FileReader();
    const calculatedEnd = this.offset + this.chunkSize;
    this.start = this.offset;
    if (calculatedEnd > this.size) {
      this.end = this.size;
      this.last = true;
    } else {
      this.end = calculatedEnd;
    }
    const blob = this.file.slice(this.start, this.end);
    reader.onload = this.onLoadHandler.bind(this);
    reader.readAsDataURL(blob);
  }

  async onLoadHandler (event) {
    const { error, result } = event.target;
    const { file_id, size, name, type, start, end, number, last } = this;
    const message = { file_id, size, name, type, start, end, last, number };

    if (error) {
      return this.onChunkError({ ...message, error, progress: 0 });
    }

    const content = result.split(';base64,')[1];
    const progress = Math.ceil(this.chunkSize / this.size * this.number * 100);
    this.offset = this.end;
    
    this.onChunkRead({ ...message, content, progress });

    if (last) {
      return this.onSuccess();
    }

    this.number++;

    this.readBlock();
  }

}



const namespaced = true;


const state = () => ({
  chunk_size: 100 * 1024,
  files: [],
});


const getters = {
};


const mutations = {
  SET_PROGRESS (state, progress) {
    state.progress = progress;
  }
};


const actions = {
  /**
   * Ошибка чтения чанка
   */
  async chunkReadError ({ commit }, chunk) {
    try {
      const result = await providers.files.upload(chunk);
      commit('SET_PROGRESS', chunk.progress);
    } finally {
      console.log('chunkReadError', chunk);
    }
  },

  async chunkReadSuccess ({ commit }, chunk) {
    try {
      const result = await providers.files.upload(chunk);
      commit('SET_PROGRESS', chunk.progress);
    } finally {
      console.log('chunkReadError', chunk);
    }
  },

  fileUploadSuccess ({ commit }) {
    console.log('fileUploadSuccess');
  },

  /**
   * Загрузка файлов чанками
   */
  async upload({ dispatch, state }, files) {
    const chunkSize = state.chunk_size;
    const onChunkError = async chunk => dispatch('chunkReadError', chunk);
    const onChunkRead = async chunk => dispatch('chunkReadSuccess', chunk);
    const onFileUpload = async () => dispatch('fileUploadSuccess');
    const uploader = new Uploader(chunkSize, onChunkError, onChunkRead, onFileUpload);

    try {
      for (let i = 0; i < files.length; i++) {
        uploader.upload(files[i]);
      }
    } finally {
    }
  },
};


export default {
  namespaced, state, getters, mutations, actions,
};
