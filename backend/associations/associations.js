import User from "../model/User.js";
import Resume from "../model/Resume.js";
import Analysis from "../model/Analysis.js";

User.hasMany(Resume)
Resume.hasOne(Analysis)

export { User, Resume, Analysis }