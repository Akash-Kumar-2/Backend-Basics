
const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


////////////////////////////////////////////////  Middleware  ///////////////////////////////////////////////////////////////////////////////

app.use(express.json());

//we can also define middleware

app.use((req,res,next)=>{
    console.log('hello');
 next();
});

//serving static files through folder

app.use(express.static(`${__dirname}/public`));

//now we can use static files images or html without defining routes for them

// we have to use next() to move forward or res.send() to send data

//we can also manpulate req or res

app.use((req,res,next)=>{
   
    req.requestTime = new Date().toISOString();
  next();
});

// environment variable, config file once read can be used anywhere
if(process.env.NODE_ENV==='development'){
app.use(morgan('dev'));
}









// // Define route to fetch tours

////////////////////////////// Before Refactoring Code /////////////////////////////////////////////////////////////////// 


// app.get('/api/v1/tours', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         // when sending an array send length also to let user know total objects
//         result:tours.length,
//         data: {
//             tours
//         }
//     });
// });

// app.post('/api/v1/tours',(req,res)=>{
//     // console.log(req.body);
//     const newId = tours[tours.length-1].id + 1;
//     const newTour = Object.assign({id:newId},req.body);
//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
//         res.status(201).json({
//             status:'success',
//             data:{
//                 tour:newTour
//             }
//         })
//     })

//     // res.send('done');
// });

// app.get('/api/v1/tours/:id',(req,res)=>{
    
//     // convert id from string to int
//     const id = req.params.id * 1;  
    
//     if(id>tours.length){
//    return res.status(404).json({
// status:'fail',
// message:'Invalid Id'
// });}
//     const tour = tours.find(ele=>ele.id===id);

//     res.status(200).json({
//         status:'success',
//         data:{
//             tour
//         }
//     });

// });

// app.patch('/api/v1/tours/:id',(req,res)=>{
   
//     if(req.params.id*1>tours.length){
//         return res.status(404).json({
//      status:'fail',
//      message:'Invalid Id'
//      });}
    
//     res.status(200).json({
//         status:'success',
//         data:{
//             tour:'<updated....>'
//         }
//     });
// });
// app.delete('/api/v1/tours/:id',(req,res)=>{
   
//     if(req.params.id*1>tours.length){
//         return res.status(404).json({
//      status:'fail',
//      message:'Invalid Id'
//      });}
    
//     res.status(204).json({
//         status:'success',
//         data:null
//     });
// })

//////////////////////////////////////////////////////////////   After  Refactoring/////////////////////////////////////////////////////////



// const getAllTours=(req, res) => {
//     console.log(req.requestTime);    
//     res.status(200).json({
//             status: 'success',
//             requestTime:req.requestTime,
//             // when sending an array send length also to let user know total objects
//             result:tours.length,
//             data: {
//                 tours
//             }
//         });
//     };
// const getTour=(req,res)=>{
    
//         // convert id from string to int
//         const id = req.params.id * 1;  
        
//         if(id>tours.length){
//        return res.status(404).json({
//     status:'fail',
//     message:'Invalid Id'
//     });}
//         const tour = tours.find(ele=>ele.id===id);
    
//         res.status(200).json({
//             status:'success',
//             data:{
//                 tour
//             }
//         });
    
//     };
// const createTour=(req,res)=>{
//         // console.log(req.body);
//         const newId = tours[tours.length-1].id + 1;
//         const newTour = Object.assign({id:newId},req.body);
//         tours.push(newTour);
//         fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
//             res.status(201).json({
//                 status:'success',
//                 data:{
//                     tour:newTour
//                 }
//             })
//         })
    
//         // res.send('done');
//     };
    
// const updateTour=(req,res)=>{
   
//         if(req.params.id*1>tours.length){
//             return res.status(404).json({
//          status:'fail',
//          message:'Invalid Id'
//          });}
        
//         res.status(200).json({
//             status:'success',
//             data:{
//                 tour:'<updated....>'
//             }
//         });
//     };
// const deleteTour=(req,res)=>{
//         if(req.params.id*1>tours.length){
//             return res.status(404).json({
//          status:'fail',
//          message:'Invalid Id'
//          });}
        
//         res.status(204).json({
//             status:'success',
//             data:null
//         });
//     }; 

//   const getAllUsers = (req,res)=>{
//     res.status(500).json({
//         status:'error',
//         message:'Route not defined yet '
//     })
//   }


//   const createUser = (req,res)=>{
//     res.status(500).json({
//         status:'error',
//         message:'Route not defined yet '
//     })
//   }
  
//   const getUser = (req,res)=>{
//     res.status(500).json({
//         status:'error',
//         message:'Route not defined yet '
//     })
//   }
  
//   const updateUser = (req,res)=>{
//     res.status(500).json({
//         status:'error',
//         message:'Route not defined yet '
//     })
//   }

  
//   const deleteUser = (req,res)=>{
//     res.status(500).json({
//         status:'error',
//         message:'Route not defined yet '
//     })
//   }

    //we can do this

    
    // app.get('/api/v1/tours',getAllTours);
    // app.post('/api/v1/tours',createTour);
    // app.get('/api/v1/tours/:id',getTour);
    // app.patch('/api/v1/tours/:id',updateTour);
    // app.delete('/api/v1/tours/:id',deleteTour);

    //or we can do 

    // app.route('/api/v1/tours').get(getAllTours).post(createTour);
    // app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
    // app.route('/api/v1/users').get(getAllUsers).post(createUser);
    // app.route('/api/v1/users').get(getUser).patch(updateUser).delete(deleteUser);




//////////////////////////////////////////////////////////    Router Mounter  /////////////////////////////////////////////////////////////////////

// const tourRouter = express.Router();
// const userRouter = express.Router();



//  tourRouter.route('/').get(getAllTours).post(createTour);
//  tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
//  userRouter.route('/').get(getAllUsers).post(createUser);
//  userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


//shifted above code in userRoutes.js and tourRoutes.js


 app.use('/api/v1/tours',tourRouter);
 app.use('/api/v1/users',userRouter); 





//   moving port to server.js

// // Set up server to listen on port 3000
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}`);
// });

module.exports = app;