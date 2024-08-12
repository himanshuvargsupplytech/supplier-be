

const multer=require('multer')







  

//here I user multer memory storage

const storage=multer.memoryStorage();


  const upload = multer({ storage: storage })


  module.exports={upload};


 

