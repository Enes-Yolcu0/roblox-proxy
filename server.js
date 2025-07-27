const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/getGamepasses/:userId", async (req, res) => {
  const userId = req.params.userId;
  const url = `https://games.roproxy.com/v1/users/${userId}/game-passes?count=100`;

  try {
    const response = await axios.get(url);
    const gamepasses = response.data.data?.map(gp => ({
      id: gp.id,
      name: gp.name,
      price: gp.price ?? 0,
      isForSale: gp.isForSale,
      productId: gp.productId
    })) ?? [];

    res.json({ userId, gamePasses: gamepasses });
  } catch (error) {
    console.error("❌ RoProxy hatası:", error.message);
    res.status(500).json({ error: "RoProxy erişim hatası" });
  }
});

app.get("/ping", (req, res) => {
  res.send("✅ Render sunucusu çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: ${PORT}`);
});
