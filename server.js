const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Minimal CORS - only what we need
app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit payload size

// Disable unnecessary Express features
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Health check - minimal response
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ============================================
// SHOPIFY TOKEN EXCHANGE
// ============================================
app.post('/api/shopify/token', async (req, res) => {
  const { store, client_id, client_secret } = req.body;

  if (!store || !client_id || !client_secret) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch(`https://${store}.myshopify.com/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id,
        client_secret,
        grant_type: 'client_credentials'
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Return ONLY what's needed - minimize response size
    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// EBAY TOKEN EXCHANGE
// ============================================
app.post('/api/ebay/token', async (req, res) => {
  const { client_id, client_secret, refresh_token } = req.body;

  if (!client_id || !client_secret) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const tokenUrl = 'https://api.ebay.com/identity/v1/oauth2/token';
    
    const requestBody = new URLSearchParams(
      refresh_token 
        ? { grant_type: 'refresh_token', refresh_token } 
        : { grant_type: 'client_credentials', scope: 'https://api.ebay.com/oauth/api_scope' }
    );

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      },
      body: requestBody
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Minimal response
    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PROXY ENDPOINTS (Minimal - only when needed)
// ============================================

// Shopify orders
app.post('/api/shopify/orders', async (req, res) => {
  const { store, access_token, order_name } = req.body;

  try {
    const response = await fetch(
      `https://${store}.myshopify.com/admin/api/2024-01/orders.json?name=%23${order_name}&status=any&fields=id,name,created_at,total_price,subtotal_price,total_tax,currency,shipping_address,customer,line_items,shipping_lines,fulfillments`,
      {
        headers: {
          'X-Shopify-Access-Token': access_token,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// eBay orders
app.post('/api/ebay/orders', async (req, res) => {
  const { access_token, order_id } = req.body;

  try {
    const response = await fetch(
      `https://api.ebay.com/sell/fulfillment/v1/order/${order_id}`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`ServTec Server running on port ${PORT}`);
});

module.exports = app;
