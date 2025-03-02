import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admins only.' });
    }
};