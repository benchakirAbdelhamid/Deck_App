import { API_URL } from "./config";

export async function deleteDeck(deckId : string){
    const deletedItem = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "DELETE",
      })
      return deletedItem.json()
}
