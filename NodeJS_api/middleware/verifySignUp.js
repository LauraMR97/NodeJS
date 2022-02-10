import '../config/db.config';


checkDuplicateUsernameOrEmail = (req, res, next) => {

};

checkRolesExisted = (req, res, next) => {

};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;