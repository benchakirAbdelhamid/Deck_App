import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../api/deleteDeck";
import { getDecks } from "../api/getDecks";
import { createDeck } from "../api/createDeck";
import toast, { Toaster } from "react-hot-toast";


type TDeck = {
  title: string;
  _id: string;
};

const Deck = () => {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (title.length <= 0) {
      toast.error("inpute is empty");
      return;
    }
    const deck = await createDeck(title);
    if (deck.message) {
      toast.success(deck.message);
    }
    setDecks([...decks, deck.createdDeck]);
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
      // console.log(newDecks)
    }
    fetchDecks();
  }, []);

  async function handleDeleteDeck(deckId: string) {
    const deletedItem = await deleteDeck(deckId);
    if (deletedItem.message) {
      toast.success(deletedItem.message);
      setDecks(decks.filter((deck) => deck._id !== deckId));
    }
    // console.log(deletedItem)
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck title</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          value={title}
          id="deck-title"
          type="text"
        />
        <button type="submit">Create</button>
      </form>

      <hr />

      <ul className="decks">
        {decks?.map((deck) => (
          <li key={deck._id}>
            <button
              className="btn-delete"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              x
            </button>
            <button className="btn-details">
              <Link to={`/decks/${deck._id}`}>details</Link>
            </button>
            {deck.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Deck;
