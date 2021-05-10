import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GameContext } from "../games/GameProvider"
import { EventContext } from "./EventProvider"

export const EventForm = () => {

    const { createEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        date: new Date(),
        time: new Date(),
        description: ""
    })

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    const handleControlledInputChange = (event) => {
        event.preventDefault()
        const newEvent = { ...currentEvent }
        let selectedValue = event.target.value
        newEvent[event.target.id] = selectedValue
        setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" id="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select htmlFor="game" id="gameId"onChange={handleControlledInputChange}>
                        <option value="0" id="gameId">Please select a game...</option>
                           { games.map(game => 
                                <option key={game.id} value={game.id} 
                                >{game.title}</option>
                            )}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const event = {
                        gameId: +currentEvent.gameId,
                        time: currentEvent.time,
                        date: currentEvent.date,
                        description: currentEvent.description
                    }
                    // Send POST request to levelup API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}