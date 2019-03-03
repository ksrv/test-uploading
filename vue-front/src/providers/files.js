import API from '@/services/api';
import { POST } from '@/services/api';
import log from '@/services/log';


const requestParams = {
  upload: () => ({
    url: '/',
    method: POST,
  }),
};


/**
 * Загрузка на сервер
 */
async function upload (chunk) {
  const name = 'Files.upload';
  try {
    const { url, method } = requestParams.upload();
    const { status, data } = await API[method](url, { chunk });
    log(name, null, { status, data });
    if (status != 201) throw `Bad status (${ status })`;
    return data;
  } catch (error) {
    console.error(name, error);
    throw error;
  }
}


export default {
  upload,
};
