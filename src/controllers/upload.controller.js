import fs from "fs";
import multer from "multer";
import { RequestResponse } from "../utils/common";
import _ from "lodash";
class UploadController {
  create = async (req, res, next) => {
    try {
      var storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, "../../media");
        },
        filename: function(req, file, cb) {
          cb(null, Date.now() + "-" + file.originalname);
        }
      });
      var upload = multer({ storage: storage }).single("file");
      upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        return res.json(new RequestResponse({
          statusCode: 200,
          data: {
            filePath: '/' + req.file.path,
            fileName: req.file.filename,
            size: req.file.size
          }
        }));
      });
      const file = req.body.formData; req.file
      // console.log("form data:", req.body);
      // const file = formData.file
      // if (_.isEmpty(file)) {
      //   return res.json(
      //     new RequestResponse({
      //       success: false,
      //       statusCode: 422,
      //       error: "File Upload is not valid",
      //       data: {
      //         filePath: "",
      //         fileName: ""
      //       }
      //     })
      //   );
      // }

      // if (file) {
      //   let item = file

      //   let tempPath = item.path
      //   let fileName = this.cleanFileName(item.filename)
      //   let targetPath = path.join(__dirname, '../../media/', fileName)
      //   // console.log({
      //   //   fileName,
      //   //   tempPath,
      //   //   targetPath,
      //   //   path: F.path.temp(),
      //   //   filePath: F.config['directory-temp'] + fileName,
      //   //   item
      //   // })
      //   fs.rename(tempPath, targetPath, function (err, rs) {
      //     if (err) throw new Error(err)
      //     return res.json(new RequestResponse({
      //       statusCode: 200,
      //       data: {
      //         filePath: path.join('/media/', fileName),
      //         fileName: item.filename,
      //         type: item.type,
      //         size: item.length
      //       }
      //     }))
      //   })
      // }
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error: error
        })
      );
    }
  };

  cleanFileName = fileName => {
    let ext = fileName.split(".").pop();
    let name = fileName.substr(0, fileName.lastIndexOf("." + ext));
    name = name.replace(/[^a-zA-Z0-9\-]/g, "");
    return [name, ext].join(".");
  };
}

export default UploadController;
