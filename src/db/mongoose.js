const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    //useCreateIndex:true    // Deprecated
})



// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required:true,
//         trim:true
//     },
//     completed: {
//         type: Boolean,
//         default:false
//     }
// })

//  const task = new Tasks({
//      description:'Cleansssssssssssszz balcony'
//  });
// task.save().then(()=> {
//       console.log(task);
//   }).catch((error)=>{
//       console.log('Error!', error);
//   })
