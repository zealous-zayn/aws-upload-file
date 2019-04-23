const AWS = require('aws-sdk');
const response = require('./../libs/responseLib')
const multer = require('multer')
const storage = multer.memoryStorage()

let upload = multer({storage:storage}) // Create a Storage

let uploadFile = async (req, res)=>{
    let s3bucket = new AWS.S3({
        accessKeyId: "your_aws_access_keyid",
        secretAccessKey: "your_aws_secret_key",
      });
        let params = {
         Bucket: "your_s3_bucket_name", //Bucket Name
         Key: req.file.originalname,
         ACL: 'public-read',
         Body: req.file.buffer,
         ContentLength : req.file.size
        };
        await s3bucket.upload(params,(err, result)=>{
            if(err){
                let apiResponse = response.generate(true, "Failed to upload image", 500, err.message)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, "Image Uploaded Successfully", 200, result)
                res.send(apiResponse)
            }
        })
         
}

module.exports = {
    upload : upload,
    uploadFile : uploadFile
}
