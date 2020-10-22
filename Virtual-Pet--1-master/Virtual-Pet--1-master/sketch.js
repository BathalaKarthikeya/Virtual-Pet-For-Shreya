//declare the variables.
var dog;
var dogImg;
var happyDogImg;
var database;
var foodS;
var foodStock;

function preload() {
  //load the images.
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  //use the database.
  database = firebase.database();
  //refer to "FOOD" in the database.
  foodStock = database.ref("Food");
  //create a listener to listen to all the changes in the database.
  foodStock.on("value", readStock);

  //create the dog sprite.
  dog = createSprite(400, 400, 20, 20);
  dog.scale = 0.2;
  dog.addImage(dogImg);
}


function draw() {
  background(46, 139, 87);
  //write text.
  textSize(20);
  fill(255);
  stroke("red");
  text("'I am hungry, Feed me quick!'", 50, 400);

  if (foodS !== undefined) {
    //write text.
    textSize(20);
    fill(255);
    stroke("red");
    text("Note: Press UP ARROW to feed DRAGO milk", 50, 50);
    text("Food Remaining: " + foodS, 150, 150);

    //if the up arrow goes down, the food stock should decrease by 1.
    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      //add the Image.
      dog.addImage(happyDogImg);
    }

    //if the up goes up, the dog image changes.
    if (keyWentUp(UP_ARROW)) {
      dog.addImage(dogImg);
    }
    drawSprites();
  }
}
//read the stock value (which is 30)and store the value in the variable foodS.
function readStock(data) {
  foodS = data.val();
}
//write stock.
function writeStock(x) {
  //if the food stock is greater than 0, it will decrease by 1. if it is lesser than or equal to 0, it will be 0.
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  //refer and update that food is x.
  database.ref("/").update({
    Food: x
  })
}


