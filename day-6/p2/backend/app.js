import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import bodyParser from "body-parser";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLACES_FILE = path.join(__dirname, "data", "places.json");
const USER_PLACES_FILE = path.join(__dirname, "data", "user-places.json");
const IMAGES_DIR = path.join(__dirname, "images");

const app = express();

app.use(express.static(IMAGES_DIR));
app.use(bodyParser.json());

// CORS & Preflight Handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle browser CORS preflight immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// GET /places: Fetches all available global tourist places (with simulated 3s delay for testing async loading UI)
app.get("/places", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const fileContent = await fs.readFile(PLACES_FILE, "utf-8");
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch places.", error: error.message });
  }
});

// GET /user-places: Fetches the user's saved/favorite places
app.get("/user-places", async (req, res) => {
  try {
    const fileContent = await fs.readFile(USER_PLACES_FILE, "utf-8");
    const places = JSON.parse(fileContent);

    res.status(200).json({ places, userPlaces: places });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user places.", error: error.message });
  }
});

// PUT /user-places: Adds a place to the user's saved places by ID
app.put("/user-places", async (req, res) => {
  try {
    const placeId = req.body?.placeId;

    if (!placeId) {
      return res.status(400).json({ message: "Missing required 'placeId' in request body." });
    }

    const fileContent = await fs.readFile(PLACES_FILE, "utf-8");
    const placesData = JSON.parse(fileContent);

    const place = placesData.find((p) => p.id === placeId);

    if (!place) {
      return res.status(404).json({ message: `Place with ID '${placeId}' not found.` });
    }

    const userPlacesFileContent = await fs.readFile(USER_PLACES_FILE, "utf-8");
    const userPlacesData = JSON.parse(userPlacesFileContent);

    let updatedUserPlaces = [...userPlacesData];

    if (!userPlacesData.some((p) => p.id === place.id)) {
      updatedUserPlaces = [...userPlacesData, place];
    }

    await fs.writeFile(
      USER_PLACES_FILE,
      JSON.stringify(updatedUserPlaces, null, 2)
    );

    res.status(200).json({ userPlaces: updatedUserPlaces, places: updatedUserPlaces });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user places.", error: error.message });
  }
});

// DELETE /user-places/:id: Removes a place from user's saved list
app.delete("/user-places/:id", async (req, res) => {
  try {
    const placeId = req.params.id;

    const userPlacesFileContent = await fs.readFile(USER_PLACES_FILE, "utf-8");
    const userPlacesData = JSON.parse(userPlacesFileContent);

    const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

    let updatedUserPlaces = [...userPlacesData];

    if (placeIndex >= 0) {
      updatedUserPlaces.splice(placeIndex, 1);
    }

    await fs.writeFile(
      USER_PLACES_FILE,
      JSON.stringify(updatedUserPlaces, null, 2)
    );

    res.status(200).json({ userPlaces: updatedUserPlaces, places: updatedUserPlaces });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user place.", error: error.message });
  }
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: "404 - Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});
