// Dummy user roles
const USERS = {
    admin: 'admin-token',
    student: 'student-token',
  };
  
  // Authentication middleware with role-based access
  const roleAuthMiddleware = (role) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token || token !== USERS[role]) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }
  
    next();
  };
  
  module.exports = { roleAuthMiddleware };
  