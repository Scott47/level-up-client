import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"
import { EventList } from "./events/EventList"
import { GameProvider } from "./games/GameProvider"
import { EventProvider } from "./events/EventProvider"
import { GameForm } from "./games/GameForm"
import { EventForm } from "./events/EventForm"
import { Profile } from "./profile/Profile"
import { ProfileProvider } from "./profile/ProfileProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightblue"
        }}>
            <Route exact path='/'>Welcome to Level Up</Route>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}