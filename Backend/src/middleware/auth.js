import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
   }

   try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
   } catch (e) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
   }
};

export const requireAdmin = (req, res, next) => {
   if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
   }
   next();
};
