import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Define the list of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get item by ID
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

const app = express();
const port = 1245;

// Create Redis client and promisify its methods
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis client error:', err));

// Promisify Redis methods
const reserveStock = promisify(redisClient.set).bind(redisClient);
const getReservedStock = promisify(redisClient.get).bind(redisClient);

// Ensure Redis client connection before starting the server
redisClient.connect().then(() => {
  console.log('Connected to Redis');

  // List products endpoint
  app.get('/list_products', (req, res) => {
    const formattedProducts = listProducts.map(product => ({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock
    }));
    res.json(formattedProducts);
  });

  // Product detail endpoint
  app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    const product = getItemById(itemId);

    if (!product) {
      return res.json({ status: 'Product not found' });
    }

    const reservedStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = product.stock - (reservedStock || 0);

    res.json({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
      currentQuantity: currentQuantity
    });
  });

  // Reserve product endpoint
  app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    const product = getItemById(itemId);

    if (!product) {
      return res.json({ status: 'Product not found' });
    }

    const reservedStock = await getCurrentReservedStockById(itemId);
    const availableStock = product.stock - (reservedStock || 0);

    if (availableStock <= 0) {
      return res.json({
        status: 'Not enough stock available',
        itemId: itemId
      });
    }

    await reserveStock(`item.${itemId}`, (reservedStock || 0) + 1);
    res.json({
      status: 'Reservation confirmed',
      itemId: itemId
    });
  });

  // Helper functions
  async function getCurrentReservedStockById(itemId) {
    const stock = await getReservedStock(`item.${itemId}`);
    return stock ? parseInt(stock, 10) : 0;
  }

  // Start server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to Redis:', err);
});
