import React from "react"

export function NavBar(){
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/circuits">Circuits</a></li>
        <li><a href="/clubs">Clubs</a></li>
        <li><a href="/sports">Sports</a></li>
        <li><a href="/locations">Locations</a></li>
      </ul>
      <a href="/logout">Logout</a>
    </nav>
  )
}

export function Home(){
  return(
    <>
      <NavBar />
      <main>
        <h1>Fighting events scheduler</h1>
        <p>home page</p>
        <a href="/login">Login</a>
      </main>
    </>
  )
}
