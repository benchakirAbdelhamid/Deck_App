import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../api/createCard";
import toast, { Toaster } from "react-hot-toast";
import { getDeck } from "../api/getDeck";

type TpDeck = {
  title: string;
  cards: string[];
  _id: string;
};

const Deck = () => {
  const [text, setText] = useState("");
  const [deck, setDeck] = useState<TpDeck[]>([]);
  let { deckId } = useParams();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    if (text.length <= 0) {
      toast.error("inpute is empty");
      return;
    }
    const card = await createCard(deckId!, text);
    if (card) {
      toast.success("created");
    }
    setText("");
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId!);
      setDeck(newDeck);
      // console.log("Deck====>", newDeck);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div>
      <Toaster />
      {JSON.stringify(deck)}
      Details Deck
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          value={text}
          id="card-text"
          type="text"
        />
        <button type="submit">Create Card</button>
      </form>
      <hr />
      Details :
      <br />
      {/* title : {deck.title} */}
    </div>
  );
};

export default Deck;
