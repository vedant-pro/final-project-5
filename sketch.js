var player, player_running,player_jump;
var ground,enemy
var score=0
var count=0
var gameState="start"
function preload(){
player_running = loadAnimation("images/Run_000.png","images/Run_001.png","images/Run_002.png","images/Run_003.png","images/Run_004.png","images/Run_005.png","images/Run_006.png","images/Run_007.png","images/Run_008.png","images/Run_009.png")
 backgroundImage = loadImage("images/background.jpg") 
 player_jump = loadAnimation("images/Jump_000.png","images/Jump_001.png","images/Jump_002.png","images/Jump_003.png","images/Jump_004.png")
idle_player=loadAnimation("images/Jump_000.png")
bulletImage=loadImage("images/Bullet-2.png")
alienImage=loadAnimation("images/skeleton-walking_0.png","images/skeleton-walking_1.png","images/skeleton-walking_2.png","images/skeleton-walking_3.png","images/skeleton-walking_4.png","images/skeleton-walking_5.png","images/skeleton-walking_6.png","images/skeleton-walking_7.png","images/skeleton-walking_8.png","images/skeleton-walking_9.png","images/skeleton-walking_10.png","images/skeleton-walking_11.png","images/skeleton-walking_12.png","images/skeleton-walking_13.png","images/skeleton-walking_14.png","images/skeleton-walking_15.png","images/skeleton-walking_16.png","images/skeleton-walking_17.png","images/skeleton-walking_18.png","images/skeleton-walking_19.png","images/skeleton-walking_20.png")
coinSImage=loadImage("images/Coin_0.png")
alien2Image=loadImage("images/ghost.png")
explosionAni=loadAnimation("images/EXPLOSIONS1.png","images/EXPLOSIONS2.png","images/EXPLOSIONS3.png","images/EXPLOSIONS4.png","images/EXPLOSIONS5.png","images/EXPLOSIONS6.png","images/EXPLOSIONS7.png")
backImg=loadImage("images/back.jpg")
back1Img=loadImage("images/back1.png")
back2Img=loadImage("images/back2.jpg")
walkSound=loadSound("sound/walk.mp3")
welcomeSound=loadSound("sound/welcome.flac")
coinSound=loadSound("sound/coin.ogg")
bulletSound=loadSound("sound/bullets.wav")
jumpSound=loadSound("sound/jump.mp3")
endI=loadImage("images/end.jpg")
}




function setup() {
 createCanvas(1000, 800); 
 
 background1= createSprite(500,350,width,height);
 background1.addImage(backgroundImage)
 background1.scale=0.22
 
 player = createSprite(100,645,20,50);
 player.addAnimation("Stay",idle_player);
 player.addAnimation("Running",player_running);
 player.addAnimation("jumping",player_jump);
 player.scale = 0.25; 

  ground=createSprite(500,710,width,10)
 ground.visible=false;

 alienSGroup=new Group()
 coinSGroup=new Group()
 alienS2Group=new Group()
 bulletGroup=new Group()
}


function draw() {
background("black")
if(gameState==="start"){
  background(back2Img)
  textSize(70)
  //text("Welcome to ",300,200)
 // textSize(30)
 fill("white")
  textFont("chiller")
  text("Press Enter to Play",330,420)
 welcomeSound.play()
  if(keyDown(ENTER)&& gameState==="start"){
    gameState="level1"
  }
}
  //enemy()
  if(gameState==="level1"){
  welcomeSound.stop()
  if(keyWentDown("RIGHT_ARROW")){
  walkSound.loop()
  player.changeAnimation("Running")
 }
 if(keyDown("RIGHT_ARROW"))
 background1.x=background1.x-(3+count/4)
 if(keyWentUp("RIGHT_ARROW")){
  walkSound.stop()
  player.changeAnimation("Stay")
 }
 if(background1.x<250){
     background1.x=400
 }
 if(keyWentDown("UP_ARROW")){
     player.velocityY=-12;
     player.changeAnimation("jumping")
     jumpSound.play()
 }
 if(keyWentUp("UP_ARROW")){
    player.changeAnimation("Stay")
 }
player.velocityY+=0.8
 player.collide(ground)
  if(keyDown("space")){
    shootBullet()
    bulletSound.play()
  }
  if(coinSGroup.isTouching(player)){
    score++;
    coinSGroup.destroyEach()
    coinSound.play()
  }
  for (var i = 0; i < alienSGroup.length; i++) {
  if(alienSGroup.get(i).isTouching(player)&&count>0){
    count-=1
    alienSGroup.get(i).destroy()
  }
}
  for (var i = 0; i < alienSGroup.length; i++) 
  { 
  if (alienSGroup.get(i).isTouching(bulletGroup))  {
      alienSGroup.get(i).destroy();
    bulletGroup.destroyEach()
    count++
    //alienS.changeAnimation("Explosion")
  }
}
  if(count===5 && gameState==="level1"){
    gameState="mid"
  }
drawSprites();
fill("black")
textSize(20)
text("Coins "+ score,800,100)
text("Alien Killed "+count,200,100)
alien()
coin()
//alien2()
}
if(gameState==="mid"){
  background(back1Img)
  textSize(80)
  textFont("chiller")
  fill("white")
  text("press enter to go to level 2",250,240)
  if(keyDown(ENTER)&& gameState==="mid"){
    gameState="level2"
  }
}
if(gameState==="level2"){
  if(keyWentDown("RIGHT_ARROW")){
    walkSound.loop()
    player.changeAnimation("Running")
   }
   if(keyDown("RIGHT_ARROW"))
   background1.x=background1.x-(3+count/4)
   if(keyWentUp("RIGHT_ARROW")){
    walkSound.stop()
    player.changeAnimation("Stay")
   }
   if(background1.x<250){
       background1.x=400
   }
   if(keyWentDown("UP_ARROW")){
       player.velocityY=-12;
       player.changeAnimation("jumping")
   }
   if(keyWentUp("UP_ARROW")){
      player.changeAnimation("Stay")
   }
  player.velocityY+=0.8
   player.collide(ground)
    if(keyDown("space")){
      shootBullet()
      bulletSound.play()
    }
    if(coinSGroup.isTouching(player)){
      score++;
      coinSGroup.destroyEach()
      coinSound.play()
    }
    if(alienSGroup.isTouching(player)&&count>0){
      count-=1
    }
    for (var i = 0; i < alienSGroup.length; i++) 
    { 
    if (alienSGroup.get(i).isTouching(bulletGroup))  {
        alienSGroup.get(i).destroy();
      bulletGroup.destroyEach()
      count++
      //alienS.changeAnimation("Explosion")
    }
  }
  if(alienS2Group.isTouching(player) && count>0){
    count-=1
    alienS2Group.destroyEach()
  }
  for (var i = 0; i < alienS2Group.length; i++) 
    { 
    if (alienS2Group.get(i).isTouching(bulletGroup))  {
        alienS2Group.get(i).destroy();
      bulletGroup.destroyEach()
      count++
      //alienS.changeAnimation("Explosion")
    }
  }
    if(count===10 && gameState==="level2"){
      gameState="end"
    }
    alien()
  coin()
  alien2()
  edges=createEdgeSprites()
  alienS2Group.bounceOff(edges)
  drawSprites();
  fill("black")
  textSize(20)
  text("Coins "+ score,800,100)
  text("Alien Killed "+count,200,100)
  
}
if(gameState==="end"){
  textSize(70)
  textFont("chiller")
  text("you won",400,400)
  background(endI)
}
}
function shootBullet(){
    if(frameCount%20===0){
      bullet=createSprite(player.x,player.y,50,50)
      bullet.addImage(bulletImage)
      bullet.velocityX=3+count/2
      bullet.scale=0.1
     bullet.setLifetime=1000
      bulletGroup.add(bullet)
    }
      
  }
  function alien(){
    if(World.frameCount% 200===0){
      alienS=createSprite(1000,675,20,50)
      alienS.addAnimation("running",alienImage)
      alienS.addAnimation("Explosion",explosionAni)
      alienS.scale=0.1
      alienS.velocityX=(-3)-count/2
      alienS.setLifetime=500
      alienSGroup.add(alienS)
    }
  }
  function coin(){
    if(World.frameCount%300===0){
      coinS=createSprite(1000,random(200,600),50,50)
      coinS.addImage(coinSImage)
      coinS.scale=0.2
      coinS.velocityX=(-3)-count/2
      coinS.setLifetime=1000
      coinSGroup.add(coinS)
    }
  }
  function alien2(){
    if(World.frameCount% 200===0){
      alienS2=createSprite(random(600,1000),random(200,520),20,50)
      alienS2.addImage(alien2Image)
      alienS2.scale=0.2

      alienS2.velocityX=(-3)-count/2
      alienS2.velocityY=1
      alienS2.setLifetime=100
      alienS2Group.add(alienS2)
    }
  }