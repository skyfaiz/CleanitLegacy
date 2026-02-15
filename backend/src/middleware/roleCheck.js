// Role checking middleware
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

exports.isCleaner = (req, res, next) => {
  if (!req.user || req.user.role !== 'CLEANER') {
    return res.status(403).json({ error: 'Cleaner access required' });
  }
  next();
};

exports.isCitizen = (req, res, next) => {
  if (!req.user || req.user.role !== 'CITIZEN') {
    return res.status(403).json({ error: 'Citizen access required' });
  }
  next();
};

exports.isCleanerOrAdmin = (req, res, next) => {
  if (!req.user || !['CLEANER', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Cleaner or Admin access required' });
  }
  next();
};

exports.isCitizenOrAdmin = (req, res, next) => {
  if (!req.user || !['CITIZEN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Citizen or Admin access required' });
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};
