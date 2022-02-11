const router = require("express").Router();
const Movie = require('../models/Movie')
const { uploader, cloudinary } = require('../config/cloudinary')


router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render("index", { movies });
    })
    .catch(err => next(err))
});

router.get("/movie/add", (req, res, next) => {
  res.render("movie-add");
});

router.post('/movies', uploader.single('poster'), (req, res, next) => {
  const { title, director } = req.body

  console.log(req.file)

  Movie.create({ title, director, imgPath: req.file.path, publicId: req.file.filename })
    .then(movie => {
      res.redirect('/')
    })
    .catch(err => next(err))
});

router.get("/movies/:id/delete", (req, res, next) => {
  // cloudinary.uploader.destroy(publicId)
  Movie.findByIdAndDelete(req.params.id)
    .then(deletedMovie => {
      // if we have an image attached to the movie
      // we also delete it on cloudinary
      if (deletedMovie.imgPath) {
        cloudinary.uploader.destroy(deletedMovie.publicId)
      }
      res.redirect("/");
    })
    .catch(err => next(err))
});

module.exports = router;
