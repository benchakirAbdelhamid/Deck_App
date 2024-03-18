import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../api/createCard";
import toast, { Toaster } from "react-hot-toast";
import { getDeck } from "../api/getDeck";

interface DeckType {
  _id?: string;
  title?: string;
  cards?: any[] | undefined;
}

const Deck = () => {
  const [text, setText] = useState("");
  const [deck, setDeck] = useState<DeckType>({});
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
      id : {deck._id}
      <br />
      title : {deck.title}
      <br />
      cards
      {/* {JSON.stringify(deck.cards)} */}
      {deck.cards?.length as number  > 0
        ? deck.cards?.map((item, i) => <p key={i}>{item}</p>)
        : ""}
      {/* {deck.cards.map((item,i) =>( <p key={i}>{item}</p> ))} */}
    </div>
  );
};

export default Deck;
