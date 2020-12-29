
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground,invisible;
var survivalTime=0;
var gameState;
var PLAY,END;
var end;

function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 end=loadAnimation("sprite_0.png");
 
}



function setup() {
 createCanvas(500,500); 

  PLAY=1;
  gameState=PLAY;
  END=0;
  
  FoodGroup=new Group()
  obstacleGroup= new Group();
  
  monkey= createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(250,405,1000,10);
  ground.x=ground.width/2;
  
  invisible=createSprite(250,407,1000,10);
  invisible.x=ground.width/2;
  invisible.visible=false;
}


function draw() {
 background("white");
  
 if(gameState===PLAY){
   
    if(ground.x<0){
      ground.x=ground.width/2;
    }
   
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    invisible.velocityX= -5;
   
    if(keyDown("SPACE") && monkey.isTouching(ground)){
     monkey.velocityY=-10;
    }
   
   score=Math.round(frameCount/3);
   survivalTime=Math.ceil(frameCount/frameRate());
   ground.velocityX= -(5+2*score/100);
   
   if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
   }
   
  Food();
  Obstacle();
   
   if(monkey.isTouching(obstacleGroup)){
     GameState=END;
   }
 }
  else if(GameState===END){
    ground.velocityX=0;
    invisible.velocityX=0;
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    
    obstacleGroup.setLifeTimeEach(-1);
    FoodGroup.setLifeTimeEach(-1);
    monkey.changeAnimation("monkey_running",end);
    
  }

  monkey.velocityY= monkey.velocityY+0.5;
  
  monkey.collide(invisible);
  
  
  stroke("black");
  textSize(20);
  text("score"+score,400,50);

  stroke("black");
  textSize(20);
  text("survival Time"+ survivalTime,100,50);
  
  drawSprites();
}

function Food(){
  
  if(frameRate%80===0){
    var banana=createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX= -(5+2*score/100);
    banana.y=Math.round(random(120,200));
    banana.scale=0.2;
    FoodGroup.add(banana);
    FoodGroup.setLifeTimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
} 
  
function Obstacle(){
  
  if(frameRate%300===0){
    var obstacle= createSprite(500,365,23,32); 
    obstacle.addImage(obstacleImage);
    obstacle.velocityX= -(5+2*score/100);
    obstacle.y=Math.round(random(120,200));
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifeTimeEach(100);
    obstacle.setCollider("circle",0,0,200);    
  }
}  