var env = process.env.NODE_ENV || 'development';
console.log('**** env ****', env);

if (env === 'development') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/blog';
  process.env.PORT = 3000;
} else if (env === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/testblog';
  process.env.PORT = 3000;
}
