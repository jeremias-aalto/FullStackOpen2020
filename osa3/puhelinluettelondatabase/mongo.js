const mongoose = require('mongoose')

if (process.argv.length!=3 && process.argv.length!=5) {
  console.log('give password, name and number as arguments!')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://FSO:${password}@fso2020-osa3.nvvun.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const note = new Person({
  name: name,
  number: number,
})

if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length===5) {
  note.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  mongoose.connection.close()
}



