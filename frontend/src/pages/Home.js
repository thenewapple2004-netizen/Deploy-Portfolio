import React from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to My Portfolio</h1>
                <p>Explore my projects and skills.</p>
                <nav>
                    <Link to="/portfolio">View Portfolio</Link>
                </nav>
            </header>
            <section className="home-introduction">
                <h2>About Me</h2>
                <p>
                    I am a passionate developer with experience in building web applications using the MERN stack.
                    My goal is to create responsive and user-friendly applications that provide value to users.
                </p>
            </section>
        </div>
    );
};

export default Home;