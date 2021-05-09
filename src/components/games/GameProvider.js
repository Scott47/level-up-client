import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [gameTypes, setTypes] = useState([])

    const levelUpToken = localStorage.getItem("lu_token")

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${levelUpToken}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                'Authorization': `Token ${levelUpToken}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getGameTypes = () => {
        return fetch("http://localhost:8000/gametypes", {
            headers: {
                "Authorization": `Token ${levelUpToken}`
            }
        })
            .then(r => r.json())
            .then(setTypes)
    }

    return (
        <GameContext.Provider value={{
            games,
            getGames,
            gameTypes,
            getGameTypes,
            createGame
        }} >
            { props.children}
        </GameContext.Provider>
    )
}