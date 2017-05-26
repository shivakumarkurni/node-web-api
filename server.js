var express=require("express")
var app=express();
var router=express.Router();
var mongoose=require("mongoose")
var Customer=require("./models/customer");
var bodyParser=require("body-parser");																												

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("successfully connected to database")
})
router.get("/",function(request,response){	
	response.json({name:"shivakumar"})
})

router.get("/customers",function(request,response){
       Customer.getCustomers(function(err,customerData){
       	if(err){
       		throw err;
       	}
       	response.json(customerData)
       })
})

router.post("/customer",function(request,response){
	var customerObj=request.body;
	Customer.createCustomer(customerObj,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.put("/customer/:id",function(request,response){

	var userId=request.params.id;
	var dataFromPostman=request.body;
	
	Customer.getCustomerById(userId,function(err,dataFromDB){
		if(err){
			throw err;
		}
		var bodyObj={
			name:dataFromPostman.name||dataFromDB.name,
			name:dataFromPostman.email||dataFromDB.email,
			name:dataFromPostman.mobile||dataFromDB.mobile,
		}
	
	Customer.editCustomer(userId,bodyObj,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
});
})

router.delete("/customer/:id",function(request,response){
	var userId=request.params.id;
	Customer.deleteCustomer(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get('/customer/:id',function(request,response){
	var userId=request.params.id;
	Customer.getCustomerById(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})
app.use("/api",router)

var PORT=process.env.PORT|| 1337;
app.listen(PORT,function(){

	console.log("server listening to port"+PORT)
})
