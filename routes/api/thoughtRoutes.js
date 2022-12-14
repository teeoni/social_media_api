const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    postNewThought,
    updateThoughtById,
    deleteThoughtById,
    postReactionByThoughtId,
    deleteReactionByThoughtId
} = require('../../controllers/thoughtController');

// localhost:PORT/api/thoughts
router.route('/').get(getAllThoughts).post(postNewThought);

// localhost:PORT/api/thoughts/thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

// localhost:3001/api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReactionByThoughtId);

// localhost:3001/api/thoughts/thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionByThoughtId);

module.exports = router;