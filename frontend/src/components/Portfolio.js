import React, { useEffect, useState } from 'react';
import { fetchPortfolio } from '../utils/api';
import './Portfolio.css';

const Portfolio = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPortfolioItems = async () => {
            try {
                const data = await fetchPortfolio();
                setPortfolioItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPortfolioItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="portfolio">
            <h2>My Portfolio</h2>
            <div className="portfolio-items">
                {portfolioItems.map(item => (
                    <div key={item._id} className="portfolio-item">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><strong>Technologies:</strong> {item.technologies.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;