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
	Customer.createCustomer(customerObj,function(err,customer){
		if(err){
			throw err;
		}
	})
})

app.use("/api",router)

var PORT=process.env.PORT|| 1337;
app.listen(PORT,function(){

	console.log("server listening to port"+PORT)
})