const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', {name: String});
const kitty = new Cat({name: "Zildjian"});
kitty.save().then(()=>{console.log('cat saved')})
.catch(()=>{
    console.log('something went wrong')
})
// const getData = async()=>{
//  const data =  await  kitty.find();
//  console.log(data)
// }

// getData();

// kitty.find((err, cats)=>{
//     console.log(cats)
// })


//One thing that i have noticed you can access methods like find findbyid findanddelete through  Cat and kitty
Cat.find({ 'isBig' : false }, {  isBig : 0, __v:0 } ,(err, cats) => console.log(cats) ).limit(2);
