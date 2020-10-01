
 //creates the sprite objects
 var trex, trex_running,trexcollide;
 var backgroundimage,invisibleground;
 var obstacle1,obstacle2,obstacle3,obstacle4,obstaclegroup;
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
 var score;
 var gameOverimage,restart;

 function preload()
 {
   //loads the images in the program
   trex_running = loadAnimation("trex1.png", "trex2.png",   "trex3.png");
  
   backgroundimage = loadImage("background.PNG");
  
   obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
   obstacle3 = loadImage("obstacle3.png");
   obstacle4 = loadImage("obstacle4.png"); 
  
   gameOverimage = loadImage("restart.png");
  
   trexcollide = loadImage("trexcollide.png");
  
 }

 function setup() 
 {
  //creates the canvas
   createCanvas(windowWidth, windowHeight);

   //creates all the objects on canvas
   background = createSprite(300,100,10,10);
   background.addImage(backgroundimage);
   background.scale = 2;
 
  
   //create a trex sprite
   trex = createSprite(60,height-450,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexcollide);
  trex.scale = 0.5;
  
  invisibleground = createSprite(50,290,100,10);
  
  obstaclegroup = createGroup();
  
  //trex.debug = true;
  trex.setCollider("circle",0,0,100);
  
  restart = createSprite(width/2,height/2- 110);
  restart.addImage(gameOverimage);
  restart.scale = 0.1;
  
  score = 0;
  
 }

 function draw() 
 {
  
  trex.collide(invisibleground);
 
  if(gameState === PLAY) { 
      
    restart.visible = false;
     
    trex.changeAnimation("running", trex_running);
    
  if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-330) {
      
    trex.velocityY = -15;
    touches = [];
    }
      
      
  if (background.x < 0){
    
      background.x = background.width/2;
    
    }  
    
  score = score + Math.round(getFrameRate()/60);  
      
      background.velocityX =  -(6 + score/100) 
  //spawwn obstacles    
  spawnObstacles();   
    
  invisibleground.visible = false;
  
 
  
  trex.velocityY = trex.velocityY + 0.8
      
  if(obstaclegroup.isTouching(trex)){
 
        gameState = END;
          
    }
  }
  else if (gameState === END) {
      
      restart.visible = true;
     
      obstaclegroup.setLifetimeEach(-1); 
      
      background.velocityX = 0;
      trex.velocityY = 0 
      obstaclegroup.setVelocityXEach(0);
     
      if(mousePressedOver(restart)) {
        reset();
    }
      
     trex.changeAnimation("collide",trexcollide);
     
     if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
     
}
  
  drawSprites();
  
  fill(0);
  textSize(18);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
}
//creates the function to spawn clouds
function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,240,10,40);
    obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclegroup.add(obstacle);
 }
}

function reset(){
  
  gameState = PLAY;  
  
  obstaclegroup.destroyEach(); 
  
  
  
  restart.visible = false;
  
  
  
  score = 0;
  
}
