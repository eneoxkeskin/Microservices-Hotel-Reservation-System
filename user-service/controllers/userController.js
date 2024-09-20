
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import redisClient from '../config/redisClient.js'; 

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const cacheUserProfile = async (userId, userProfile) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  await redisClient.set(userId, JSON.stringify(userProfile), { EX: 3600 }); 
};


const getUserProfileFromCache = async (userId) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  const data = await redisClient.get(userId);
  return data ? JSON.parse(data) : null;
};


export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id, user.role);

  res.cookie('token', token, { httpOnly: true });

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    token,
  });
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id, user.role);
    res.cookie('token', token, { httpOnly: true });


    const userProfile = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    await cacheUserProfile(user._id.toString(), userProfile);

    res.json({ ...userProfile, token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;


    let userProfile = await getUserProfileFromCache(userId);

    if (!userProfile) {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }

      userProfile = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };


      await cacheUserProfile(user._id.toString(), userProfile);
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server hatası' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
