import React, { useState } from "react"
// import .env

export const EventContext = React.createContext()
const levelUpToken = localStorage.getItem("lu_token")

export const EventProvider = (props) => {
    const [ events, setEvents ] = useState([])
    const base_url = process.env.BASE_URL

    const getEvents = () => {
        console.log(base_url)
        return fetch('http://localhost:8000/events', {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }
    const createEvent= (event) => {
        return fetch("http://localhost:8000/events", {
            method: "POST",
            headers: {
                'Authorization': `Token ${levelUpToken}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }
    const joinEvent = eventId => {
        return fetch(`http://localhost:8000/events/${eventId}/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(getEvents)
    }
    const leaveEvent = eventId => {
        return fetch(`http://localhost:8000/events/${eventId}/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={{ events,
                                        getEvents,
                                        createEvent,
                                        joinEvent,
                                        leaveEvent }} >
            { props.children }
        </EventContext.Provider>
    )
}