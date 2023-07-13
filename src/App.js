import React, { useState, useEffect } from "react";
import CardList from './components/CardList';
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";
import ErrorBoundry from "./components/ErrorBoundry";

function App () {
    const [robots, setRobots] = useState([]);
    const [ searchField, setSearchField] = useState('');

    useEffect ( () => {
        fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(users => {
                    setRobots(users)
                });
    },[])

    function onSearchChange(event) {
        setSearchField(event.target.value);
    }

    const filteredRobots = robots.filter( robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (!robots.length) {
        return <h2>Loading</h2>
    } else {
        return (
            <div className="tc">
                <h1 className="f1 pa5">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
                <Footer />
            </div>
        );
    }
};

export default App;