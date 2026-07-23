import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log("========================================");
  console.log("🚀 AI Trading Platform API Started");
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`📅 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("========================================");
});