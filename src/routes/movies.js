const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('../sample.json');

console.log(movies);

router.get('/', (req, res) =>{
    res.json(movies);
});

router.post('/',(req,res) => {
    const { title, director, year, rating } = req.body;
    const id = movies.length + 1;

    if(title && director && year && rating){

        const newMovie = {...req.body,id};
        movies.push(newMovie);
        res.json(movies);

    }else{
        res.status(500).json({error: 'There was an error'});
    }
} );

router.delete('/:id', (req, res) => {

    const { id } = req.params; //Se utiliza para recuperar o acceder a los parámetros de nuestro objeto.
    _.each(movies, (movie, i) =>{ //_.each()recorre un arreglo utilizando underscore, voy a recorrer todas las peliculas obteniendo una pelicula por vez y su index
        if(movie.id == id){ //si se encuentra la pelicula solicitada entonces se elimina
            movies.splice(i, 1);
        }
    } );
    res.send(movies);
} );

router.put('/:id', (req, res) =>{

    const {id} = req.params;
    const { title, director, year, rating } = req.body;
    if(title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else{
        res.status(500).json({error: 'There was an error'});
    }

});



module.exports = router;