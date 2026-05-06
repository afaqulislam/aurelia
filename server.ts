import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Products Data
  const products = [
    {
      id: 1,
      name: 'The Obsidian Silk Gown',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      description: 'A masterpiece of Italian silk, draping effortlessly to create a silhouette of timeless elegance.'
    },
    {
      id: 2,
      name: 'Champagne Gold Cashmere Wrap',
      price: 850,
      image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-sourced Mongolian cashmere in our signature champagne gold hue.'
    },
    {
      id: 3,
      name: 'Aurelia Signature Blazer',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=800&q=80',
      description: 'Structured perfection. Tailored with precision-cut wool and silk-lapel details.'
    },
    {
      id: 4,
      name: 'Nightshade Evening Clutch',
      price: 600,
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted leather with obsidian-toned hardware and velvet lining.'
    }
  ];

  // API Routes
  app.get('/api/products', (req, res) => {
    res.json(products);
  });

  app.post('/api/process-payment', (req, res) => {
    // Simulate payment delay
    setTimeout(() => {
      res.json({ status: 'Payment Successful', transactionId: Math.random().toString(36).substr(2, 9).toUpperCase() });
    }, 2000);
  });

  app.post('/api/contact-submit', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`Contact Submission: ${name} (${email}) - ${subject}: ${message}`);
    res.json({ status: 'Success', message: 'Your inquiry has been received by our concierge.' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AURELIA Server running on http://localhost:${PORT}`);
  });
}

startServer();
