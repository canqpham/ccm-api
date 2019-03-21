import initExpress from './inits/express.init';
import initMongodb from './inits/mongodb.init';


// Run app
const runApp = async (res) => {
  try {
    // Init app
    await initMongodb();
    await initExpress();
  } catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
  }
};
runApp();
