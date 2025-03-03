import {v2 as cloudniary} from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

cloudniary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export default cloudniary;