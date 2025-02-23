const mongoose = require('mongoose')
console.log('Script is running');

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://lahnamin:${password}@cluster0.dywca.mongodb.net/`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
      
    const Person = mongoose.model('Person', personSchema)
    
    if(process.argv.length === 3){
        console.log("phonebook:")
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person)
            })
            mongoose.connection.close()
          })
    } else if(process.argv.length === 5){
        const name = process.argv[3]
        const number = process.argv[4]

        const person = new Person({
            name: name,
            number: number,
        });

        person.save().then(() => {
            console.log(`added ${name} number ${number} to phonebook`);
            mongoose.connection.close();
        });
    } else {
        console.log('Invalid number of arguments');
        mongoose.connection.close();
    }
}).catch(err => {
    console.log('Error connecting to the database:', err.message);
});