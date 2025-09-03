import User from "../model/User.js";
import Resume from "../model/resume.js";
import Analysis from "../model/Analysis.js";

User.hasMany(Resume, { foreignKey: 'userID' })
Resume.belongsTo(User, { foreignKey: 'userID' })

Resume.hasOne(Analysis, { foreignKey: 'resumeID' })
Analysis.belongsTo(Resume,{ foreignKey: 'resumeID' })

export { User, Resume, Analysis }