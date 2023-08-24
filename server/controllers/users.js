import mongoose from "mongoose";
import User from '../models/auth.js'
 
export const getallusers = async(req, res) =>{
    try {
        const alluser = await User.find();
        const alluserdetail = []
        alluser.forEach(users =>{
            alluserdetail.push({_id: users._id, name: users.name, about: users.about , tags: users.tags , joinedon: users.joinedon})
        })
        res.status(200).json(alluserdetail)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const updateprofile = async(req, res)=>{
    const {id:_id}= req.params;
    const {name, about ,tags}= req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    try {
        const updatedprofile= await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new: true})
        res.status(200).json(updatedprofile)
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}