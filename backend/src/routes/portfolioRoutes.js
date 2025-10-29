const express = require('express');
const PortfolioController = require('../controllers/portfolioController');

const setPortfolioRoutes = (app) => {
    const router = express.Router();
    const portfolioController = new PortfolioController();

    router.get('/', portfolioController.getPortfolio);
    router.post('/', portfolioController.createPortfolio);
    router.put('/:id', portfolioController.updatePortfolio);
    router.delete('/:id', portfolioController.deletePortfolio);

    app.use('/api/portfolio', router);
};

module.exports = setPortfolioRoutes;