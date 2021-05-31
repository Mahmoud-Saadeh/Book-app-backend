'use strict';

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT;

const bookSchema = mongoose.Schema({
  bookName: String,
  describtion: String,
  image: String,
});

const Book = mongoose.model('book', bookSchema);

const userSchema = mongoose.Schema({
  email: String,
  books: [bookSchema],
});

const User = mongoose.model('user', userSchema);

function createUser() {
  const mahmoud = new User({
    email: 'mahmoud.saadeh998@gmail.com',
    books: [
      {
        bookName: 'Reinforcement Concrete',
        describtion: 'talk about designing structural concrete',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/81Wj1JQ+mKL.jpg',
      },
      {
        bookName: 'Crime and Punishment',
        describtion:
          'Crime and Punishment focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money.',
        image:
          'https://kbimages1-a.akamaihd.net/b1c96137-0ddf-4ee4-8f46-73bdfa9b8621/1200/1200/False/crime-and-punishment-by-fyodor-dostoevsky-1.jpg',
      },
      {
        bookName: 'Demons',
        describtion:
          'Demons is an allegory of the potentially catastrophic consequences of the political and moral nihilism that were becoming prevalent in Russia in the 1860s. A fictional town descends into chaos as it becomes the focal point of an attempted revolution, orchestrated by master conspirator Pyotr Verkhovensky.',
        image:
          'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1524586008l/5695.jpg',
      },
    ],
  });
  const alaa = new User({
    email: 'alaaabuissa95@gmail.com',
    books: [
      {
        bookName: 'MongoDB Basics',
        describtion: 'MongoDB Basics, from The Definitive Guide to MongoDB, 2E, shows you how a document-oriented database system differs from a relational database, and how to install and get started using it. You will also learn MongoDB design basics, including geospatial indexing, how to navigate, view, and query your database, and how to use GridFS with a bit of Python.',
        image: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484208960.jpg',
      },
      {
        bookName: 'HTML and CSS : Design and Build Websites'
        ,
        describtion:
          'A full-color introduction to the basics of HTML and CSS from the publishers of Wrox! Every day, more and more people want to learn some HTML and CSS.',
        image:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/1180/9781118008188.jpg',
      },
      {
        bookName: 'JavaScript and JQuery : Interactive Front-End Web Development',
        describtion:
          'Learn JavaScript and jQuery a nicer way This full-color book adopts a visual approach to teaching JavaScript & jQuery, showing you how to make web pages more interactive and interfaces more intuitive through the use of inspiring code examples, infographics, and photography..',
        image:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/1185/9781118531648.jpg',
      },
    ],
  });
  alaa.save();
  mahmoud.save();
}
// createUser();

app.get('/books', (req, res) => {
  const email = req.query.userEmail;

  User.find({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data[0].books);
    }
  });
});

app.listen(PORT, () => console.log(`listening on hi ${PORT}`));
