import fs from "fs";

class UploadController {

  create = async (req, res, next) => {
    try {
      let files = req.files || []
  
      if (_.isEmpty(files)) {
        return res.json(new RequestResponse({
          success: false,
          statusCode: 422,
          error: 'File Upload is not valid',
          data: {
            filePath: '',
            fileName: ''
          }
        }))
      }
  
      if (files.length > 0) {
        let item = files[0]
  
        let tempPath = item.path
        let fileName = this.cleanFileName(item.filename)
        let targetPath = path.join(__dirname, '../../media/', fileName)
        // console.log({
        //   fileName,
        //   tempPath, 
        //   targetPath, 
        //   path: F.path.temp(),
        //   filePath: F.config['directory-temp'] + fileName,
        //   item 
        // })
        fs.rename(tempPath, targetPath, function (err, rs) {
          if (err) throw new Error(err)
          return res.json(new RequestResponse({
            statusCode: 200,
            data: {
              filePath: path.join('/media/', fileName),
              fileName: item.filename,
              type: item.type,
              size: item.length
            }
          }))
        })
      }
      
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error: error
      }))
    }
  };

  cleanFileName = (fileName) => {
    let ext = fileName.split('.').pop()
    let name = fileName.substr(0, fileName.lastIndexOf('.' + ext))
    name = name.replace(/[^a-zA-Z0-9\-]/g, '')
    return [name, ext].join('.')
  }

}

export default UploadController;
