import Message from "../models/Message.js";
import { getIO ,getConnectedUsers} from "../socket/socket.server.js";
export const sendMessage = async(req,res)=>{
    try{
        const{content,receiverId}=req.body;

        const newMessage=await Message.create({
            sender:req.user.id,
            receiver:receiverId,
            content,
        })

        const io=getIO();
        const connectedUsers = getConnectedUsers()
        const receiverSocketId = connectedUsers.get(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",{
                message: newMessage
            })
        }
        res.status(201).json({
            success:true,
            message:newMessage,
        })

    }
    catch(error){

        console.log("Error in sendingMessage:",error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

export const getConversation = async(req,res)=>{
    const{userId}=req.params;
    try{
        const messages = await Message.find({
         $or  :[
            {sender:req.user_id,receiver:userId},
            {sender:userId,receiver:req.user_id}
         ]
        }).sort("createdAt");
        res.status(200).json({
            success:true,
            messages,
        })
    }
    catch(error){
        console.log("Errror in getConversation:",error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })

    }
}