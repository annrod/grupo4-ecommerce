// @desc Register a new user
// @route POST /api/users
// @access Public

import asyncHandler from 'express-async-handler'
import generateToken from '../common/generateToken.js';
import User from '../models/userModel.js';

export const registerUser = asyncHandler(async(req,res)=>{
    const { name,email,password,isAdmin } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exixts');
    }
    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    });
    if (user){
        res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        //isAdmin:true,
        token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc Auth user & get token
// @route POST /api/users/login
// @access Public


export const authUser = asyncHandler(async(req,res)=>{
    const { name,email,password } = req.body;
    const user= await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id),
        });
        
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Delete user 
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req,res)=>{
    //usar findById

    const user = await User.findById(req.params.id);
 
      if (!user) {
            res.status(404);
            throw new Error('User not found');          
        }
  
      user.remove();
      res.status(200).json({ success: true, data: {name: user.name,email: user.email} , error: 'User removed'});
     // throw new Error('User removed');
});

