const { Op } = require("sequelize");
const db = require("../config/connected");
const Client = db.client;

var getClient = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try { 
    const client = await Client.findAll({
      where: { userId: req.session.userId },
    });
    if (client.length === 0) return res.status(200).send([]); // ✅ Fixes unnecessary 404
    res.send(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

var addClient = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const existingClient = await Client.findOne({
      where: { email: req.body.email },
    });
    if (existingClient) {
      return res
        .status(400)
        .json({ error: "Client with this email already exists" });
    }
    const clientData = { ...req.body, userId: req.session.userId };
    const data = await Client.create(clientData);
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

var updateClient = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, userId: req.session.userId },
    });
    if (!client) {
      return res
        .status(404)
        .json({ error: "Client not found or unauthorized" });
    }
    const updatedClient = await client.update(req.body);
    res.status(200).send(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

var deleteClient = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, userId: req.session.userId },
    });
    if (!client) {
      return res
        .status(404)
        .json({ error: "Client not found or unauthorized" });
    }
    await client.destroy();
    res.send({ message: "Client deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

var searchClients = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in first" });
  }
  try {
    const { search } = req.query;
    const clients = await Client.findAll({
      where: {
        userId: req.session.userId, // ✅ Only search within the logged-in user's clients
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { job: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    res.send(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getClient,
  addClient,
  updateClient,
  deleteClient,
  searchClients,
};
