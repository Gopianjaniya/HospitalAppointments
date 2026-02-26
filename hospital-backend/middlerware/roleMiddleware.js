export const isDoctor = (req, res, next) => {
  if (req.user && req.user.role === "doctor") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied. Doctors only." });
  }
};

export const isPatient = (req, res, next) => {
  if (req.user && req.user.role === "patient") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied. Patients only." });
  }
};
