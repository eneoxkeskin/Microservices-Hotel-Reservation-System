import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz, token yok' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Yetkisiz, token geçersiz' });
  }
};
