'use strict';

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
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
        bookName: 'Static',
        describtion: 'talk about designing structural concrete',
        image:
          'https://images-na.ssl-images-amazon.com/images/I/81Wj1JQ+mKL.jpg',
      },
      {
        bookName: 'Crime and Punishment2',
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

app.post('/books', postBook);

function postBook(req, res) {
  const { bookName, describtion, image, email } = req.body;

  User.find({ email: email }, (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    } else {
      data[0].books.push({
        bookName,
        describtion,
        image,
      });
      data[0].save();
      res.status(201).send(data[0].books);
    }
  });
}

app.delete('/books/:id', deletBook);

function deletBook(req, res) {
  const { email } = req.query;
  const id = req.params.id;
  // console.log(index);
  // console.log(email);

  User.find({ email: email }, (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    } else {
      const newBookStore = data[0].books.filter((book, index) => {
        return id != index;
      });
      data[0].books = newBookStore;
      data[0].save();
      res.status(201).send(data[0].books);
    }
  });
}

app.put('/books/:id', updateBook);

function updateBook(req, res) {
  const { bookName, describtion, image, email } = req.body;
  const id = req.params.id;
  // console.log(index);
  // console.log(email);

  User.find({ email: email }, (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    } else {
      data[0].books.splice(id, 1, {
        bookName,
        describtion,
        image,
      });
      data[0].save();
      res.status(201).send(data[0].books);
    }
  });
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
