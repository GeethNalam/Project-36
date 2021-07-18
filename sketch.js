var dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
	dogImg = loadImage("dogImg.png")
  happyDogImg = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700,115);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,137);
}


function draw() {  
background(46,139,87);




 
drawSprites();
textSize(20);
  fill(225);
    text("Note: Press UP ARROW to Feed Drago milk", 50,50);
    text("Food Remaining:" + foodS, 150,150);

  fill(225,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }

  fedTime = dataBase.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
}
 
 
  

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }


database.ref('/').update({
  Food:x
 })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })

}