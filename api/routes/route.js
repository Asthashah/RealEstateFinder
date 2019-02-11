const express=require('express');
const router=express.Router();
const Apartment=require('../models/apartment');
const multer=require('multer');
//const upload=multer({destination : 'assets/apartments'});
const formidable=require('formidable');
readChunk = require('read-chunk');
var fs = require('fs');

var storage=multer.diskStorage({

    destination :function(req,file,cb){
        cb(null,'views/src/assets/apartments')
    },
    filename: function(req,file,cb){

       cb(null, file.originalname);
    }
});

var upload=multer({storage:storage});

//using to rename image files



//retrieving data
router.get('/apartmentlist',(req,res,next)=>{
   Apartment.find(function(err,apartment){
       res.json(apartment);
   });
});

module.exports = router;


// adding apartment;
router.post('/apartmentlist',upload.any(),(req,res,next)=>{

    //defining the storage path
    
    /*var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var newDestination = 'views/src/assets/apartments/' + req.body.user_name;
            var stat = null;
            try {
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
            }       
            cb(null, newDestination);
        }
    });*/
    var userName=req.body.user_name;
    var address=req.body.address;
    var destination=userName+'_'+address;
 


   var ArrayofFiles=req.files;
   var filepaths=[];
   ArrayofFiles.forEach((eachFile) => {
      
    //   eachFile.filename=req.body.user_name +'_'+ req.body.address;
     //  eachFile.destination=eachFile.destination +'/'+req.body.user_name;
     //  eachFile.filename

       filepaths.push(eachFile.destination+'/'+destination+'/'+eachFile.filename);
   });

  
       


   
    let newApartment=new Apartment(
        {
            email:req.body.email,
            price:req.body.price,
            type:req.body.type,
            bed:req.body.bed,
            bath:req.body.bath,
            apartmentNumber:req.body.apartmentNumber,
            state:req.body.state,
            city:req.body.city,
            Street:req.body.street,
            imgsrc1:filepaths[0],
            imgsrc2:filepaths[1],
            imgsrc3:filepaths[2],
            imgsrc4:filepaths[3],
            address:req.body.apartmentNumber+req.body.Street,
            zip:req.body.zipcode,
            bath:req.body.bath,
            category:req.body.category
        }
    );

     newApartment.save((err,apartment)=>{

        if(err){
            console.log(err);
            res.json({msg:'Action failed!'});
           
        }

        else{
            res.send(req.files);
          //  res.json({msg:'apartment added!'});
          
           // res.end();
        }
    
    })

var destination=userName+'_'+address;
const path = require('path');
let destDir = path.join('views/src/assets/apartments/', destination);
fs.mkdirSync(destDir);

    ArrayofFiles.forEach((eachFile)=>{
     //
let filename = eachFile.originalname;
let src = path.join('views/src/assets/apartments/', filename);
//let destDir = path.join('views/src/assets/apartments/', destination);


fs.access(destDir, (err) => {
 // if(err)
   // fs.mkdirSync(destDir);

  copyFile(src, path.join(destDir, filename));
});
     
/*fs.rename('views/src/assets/apartments/'+eachFile.originalname, 'views/src/assets/apartments/'+userName, function (err) {
    if (err) {console.log(err)};
    console.log('Rename complete.');
  });*/

         }

    );
});


//uploading pics data

/*router.post('/upload',upload.any(),function(req,res,next){
    console.log(req.files);
    res.send(req.files);
});*/
// code to move file

//moves the $file to $dir2
//copy the $file to $dir2
function copyFile(src, dest) {

    let readStream = fs.createReadStream(src);
  
    readStream.once('error', (err) => {
      console.log(err);
    });
  
    readStream.once('end', () => {
      console.log('done copying');
    });
  
    readStream.pipe(fs.createWriteStream(dest));
  }
  
  // Listing apartments based on username
  router.get('/apartmentlist/:user_name',(req,res,next)=>{
    Apartment.findById(req.params.id,function(err,apartment){
        res.json(apartment);
    });
    // res.send('geting apartment list....');
 });

  
