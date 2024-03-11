import express from "express";
import { getDecksController } from "../controllers/getDecksController";
import { createDeckController } from "../controllers/createDeckController";
import { deleteDecksController } from "../controllers/deleteDeckController";
import { createCardForDeckController } from "../controllers/createCardForDeckController";
import { getDeckController } from "../controllers/getDeckController";
const router = express.Router()

router.get("/decks", getDecksController);

router.post("/decks", createDeckController);

router.delete("/decks/:deckId", deleteDecksController);

router.get("/decks/:deckId", getDeckController);
router.post("/decks/:deckId/cards", createCardForDeckController);


module.exports = router