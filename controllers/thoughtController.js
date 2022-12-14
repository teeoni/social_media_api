const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error));
    },
    getThoughtById(req, res) {
        Thought.findById(req.params.thoughtId)
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought found with that ID'})
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },
    postNewThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: thought._id }},
                    { new: true }
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'New thought created, but no user found by that ID'})
                    : res.json({ message: 'Thought created'})
            })
            .catch((error) => res.status(500).json(error));
    },
    updateThoughtById(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID'})
                    : res.json(thought)
            )
            .catch((error) => res.status(500).json(error));
    },
    deleteThoughtById(req, res) {
        Thought.findByIdAndDelete(
            req.params.thoughtId
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID'})
                    : res.json({ Alert: 'Thought deleted' })
            )
            .catch((error) => res.status(500).json(error));
    },
    postReactionByThoughtId(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought)
        )
        .catch((error) => res.status(500).json(error));
    },
    deleteReactionByThoughtId(req,res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID'})
                : res.json(thought)
        )
        .catch((error) => res.status(500).json(error));
    }
}