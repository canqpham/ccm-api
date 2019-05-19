import fs from "fs";
import path from 'path';
class UploadController {

  getFiles= async (req, res, next) => {
    console.log(req.url)
    try {
      res.sendFile(path.join(__dirname, '../../media' + req.url));
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error: error
      }))
    }
  };

}

export default UploadController;
