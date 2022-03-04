// import React from 'react'
// import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NotFoundError } from '../pages/Errors/'
import Home from '../pages/Home'
import Game from "../pages/Sudoku/Game";

function AppRouting() {
    return (
        <header className="App-header">
            <Router>
                <Routes>
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/play" exact element={<Game />} />
                    <Route path="/" element={<Game />} />
                    <Route path="*" element={<NotFoundError />} />
                </Routes>
            </Router>
        </header>
    )
} export default AppRouting
