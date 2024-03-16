import app from '../app';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`E-Commerce App Server is running on http://localhost:${PORT}`);
});
