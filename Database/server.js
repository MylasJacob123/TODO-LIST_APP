const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 8000;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define the User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Define the Task model
class Task extends Model {}
Task.init({
  description: DataTypes.STRING,
  priority: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'task' });

// Define the association (one-to-many relationship)
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sync database
sequelize.sync({ force: true }) 
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database:", error);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Task });
  res.json(user);
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && user.password === req.body.password) {
      res.json({ message: 'Login successful', userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Task routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.update(req.body);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Add a new task under a specific user
app.post('/users/:userId/tasks', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      const task = await Task.create({ ...req.body, userId: user.id });
      res.json(task);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// Update a task under a specific user
app.put('/users/:userId/tasks/:taskId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const task = await Task.findOne({ where: { id: req.params.taskId, userId: user.id } });
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// Delete a task under a specific user
app.delete('/users/:userId/tasks/:taskId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const task = await Task.findOne({ where: { id: req.params.taskId, userId: user.id } });
    if (task) {
      await task.destroy();
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
