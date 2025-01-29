import { Router } from 'express'
import movieService from '../services/movie-service.js';

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

export default castController;