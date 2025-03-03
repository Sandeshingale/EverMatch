import cloudniary from "../config/cloudnary.js";
import User from "../models/User.js";

export const updateProfile =async (req,res) => {

    try{
        const{image , ...otherData}=req.body;
        let updateData = otherData;

        if(image){
            if(image.startWith("data:image")){
                try{
                    const uploadResponse = await cloudniary.uploader.upload(image)
                    updateData.image = uploadResponse.secure_url;
                }

                catch(error){
                    console.error("Error uploading image",uploadError);
                       return res.status(400).json({
                        success:false,
                        message:"Error uploading image",
                       }) 
                    }

            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id,updatedData,{new:true})
        res.status(200).json({
            success:true,
            user:updatedUser,
        })
    }
    catch(error){
        console.log("Error in updateProfile",error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })

    }
    
} 