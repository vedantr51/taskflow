const Task = require('../models/Task');

const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const { search, status } = req.query;

        let query = { user: req.user._id };

        if (status && ['pending', 'completed'].includes(status)) {
            query.status = status;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        const { title, description, status } = req.body;

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};
