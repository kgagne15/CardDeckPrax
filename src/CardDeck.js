import React, { useEffect, useState } from "react";
import axios from "axios";

const CardDeck = () => {
    const [deck, setDeck] = useState(null)
    const [card, setCard] = useState(null)
    const [remaining, setRemaining] = useState(null)
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/");
            setDeck(deckResult.data.deck_id)
        }
        fetchDeck();
    }, [])

    async function draw() {
        if (remaining === 0) {
            alert("Error: No cards remaining!")
        } else {
            const cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`)
            setCard(cardRes.data.cards[0].image)
            setRemaining(cardRes.data.remaining)
        }
    }

    return (
        <>
        <div>{deck ? <button onClick={draw}>Draw a card</button> : <i>Loading...</i>}</div>
        <img src={card}></img>
        </>
    )
}

export default CardDeck; 