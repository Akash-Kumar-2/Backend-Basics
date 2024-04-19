const fs = require('fs');


// Read tours data from JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


// param middleware
exports.checkID=(req,res,next,val)=>{
    console.log(`Tour id is ${val}`);
    if(req.params.id*1>tours.length){
        return res.status(404).json({
     status:'fail',
     message:'Invalid Id'
     });}
    next();
}


// chaining multiple middleware

exports.checkBody =(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'fail',
            message:'Missing name and price'
        })
    }
    next();
}



exports.getAllTours=(req, res) => {
    console.log(req.requestTime);    
    res.status(200).json({
            status: 'success',
            requestTime:req.requestTime,
            // when sending an array send length also to let user know total objects
            result:tours.length,
            data: {
                tours
            }
        });
    };
exports.getTour=(req,res)=>{
    
    //     // convert id from string to int
        const id = req.params.id * 1;  
        
    //     if(id>tours.length){
    //    return res.status(404).json({
    // status:'fail',
    // message:'Invalid Id'
    // });}
        const tour = tours.find(ele=>ele.id===id);
    
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    
    };
exports.createTour=(req,res)=>{
        // console.log(req.body);
        const newId = tours[tours.length-1].id + 1;
        const newTour = Object.assign({id:newId},req.body);
        tours.push(newTour);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
            res.status(201).json({
                status:'success',
                data:{
                    tour:newTour
                }
            })
        })
    
        // res.send('done');
    };
    
exports.updateTour=(req,res)=>{
   
      
        
        res.status(200).json({
            status:'success',
            data:{
                tour:'<updated....>'
            }
        });
    };
exports.deleteTour=(req,res)=>{
        // if(req.params.id*1>tours.length){
        //     return res.status(404).json({
        //  status:'fail',
        //  message:'Invalid Id'
        //  });}
        
        res.status(204).json({
            status:'success',
            data:null
        });
    }; 


