
import { Request, Response } from "express";
import Deck from "../models/Deck";


export async function deleteDecksController(req: Request, res: Response) {
    const decksId = req.params.deckId
    const deck = await Deck.findByIdAndDelete(decksId)
    res.json(
      {
        message : 'successfully deleted the entry',
        deck
      }
    )
}
