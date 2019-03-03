const { NODE_ENV, VUE_API_URL } = process.env;
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

console.log({ VUE_API_URL });

class Environment {
  // public
  get isDevelopment () {
    return NODE_ENV === DEVELOPMENT;
  }

  // public
  get isProduction () {
    return NODE_ENV === PRODUCTION;
  }

  // private
  get CurrentAPI () {
    // return VUE_API_URL;
    return 'http://localhost:3000';
  }
}

const Env = new Environment();

export default Env;
