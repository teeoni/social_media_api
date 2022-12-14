const router = require('express').Router();
const {
    getAllUsers,
    getUserByID,
    postNewUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')

// localhost:3001/api/users
router.route('/').get(getAllUsers).post(postNewUser);

// localhost:3001/api/users/userId
router.route('/:userId').get(getUserByID).put(updateUserById).delete(deleteUserById);

// localhost:3001/api/users/userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;