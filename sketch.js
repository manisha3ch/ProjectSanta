// declare constants
var PLAY = 1;
var END = 0;

// declare variable
var gameState = PLAY;
var santa, santa_running;
var gift, imgGift, objSnowball, imgBackground, imgSnowball;
var grpGifts, grpSnowball, grpHouse, grpPanda, grpSnowman, grpStar, grpCBanner, grpBird, grpPanda;
var imgBird1, imgBird2
var surTime = 0;
var bg;
var can;
var score = 0;
var hit = 0;
var wishGranted = 0;
var flag = 2;
var imgPanda1, imgPanda2, imgPanda3;
var imgHouse, imgBanner;
var imgSantaStop;
var soundJingleBell;
var soundSnowAval;
var soundPanda;
var soundHappy;
var house, snowman, cBanner, panda, star, snowball, bird;

// preload function - load images, animation, sounds
function preload() {

  imgBackground = loadImage("winter-forest-C.jpg");
  
  imgSnowball = loadImage("snowball11.png");
  imgStar = loadImage("Starburst.png");
  soundSnowAval = loadSound("snowaval.wav");
  
  imgSanta = loadAnimation("tile1.png", "tile2.png", "tile3.png", "tile4.png", "tile5.png");
  imgSantaStop = loadAnimation("tile1.png");
  
  imgSnowman = loadImage("snowman11.png");

  imgPanda1 = loadImage('p1.png');
  imgPanda2 = loadImage('p2.png');
  imgPanda3 = loadImage('p3.png');
  soundPanda = loadSound("Two Tone Doorbell.wav");

  imgBird1 = loadImage('bird1.png');
  imgBird2 = loadImage('birdflip.png');
  soundBird = loadSound("Parots Talking.wav");
  
  imgHouse = loadImage('house.png');
  imgCBanner = loadImage("Christmas-Party.png");
  soundHappy = loadSound("sms-alert-1.wav");


  soundJingleBell = loadSound("jnglbell.wav");
}

// setup function
function setup() {
  
  can = createCanvas(600, 300);
  //console.log("This is message");
  bg = createSprite(300, 150, 1200, 200);
  bg.addImage(imgBackground);
  bg.scale = 1;
  bg.velocityX = -4;
  bg.x = bg.width / 2;

  santa = createSprite(150, 270, 10, 10);
  santa.addAnimation("santa", imgSanta);
  santa.addAnimation("santa_stop", imgSantaStop);
  santa.scale = 1.5;
  santa.setCollider("rectangle", 10, -10, 1, santa.height)
  //santa.debug = true;


  ground = createSprite(300, 300, 600, 30);
  ground.visible = false;

  grpPanda = new Group();
  grpSnowman = new Group();
  grpHouse = new Group();
  grpSnowball = new Group();
  grpStar = new Group();
  grpCBanner = new Group();
  grpBird = new Group();

  soundJingleBell.play();
}

// draw function
function draw() {

  background(0);

  if (gameState === PLAY) {
    bg.velocityX = -4;
    surTime = surTime + Math.round(frameRate() / 60);
    showPanda();
    birdFly();
    obsSnowball();
    showBanner();
    showEatingPanda();
    showStars();

    if (flag === 1) {
      wishGranted += 2;
      flag = 0;
    }
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    if (keyDown("space") && santa.y >= 180) {
      santa.velocityY = -12;
    }
    santa.velocityY = santa.velocityY + 0.8;
    
    //console.log("END state" + score);
    if (score === 1) {
      gameState = END;
    }
    
  } else if (gameState === END) {
    
    bg.velocityX = 0;
    if (grpHouse.contains(house)) {
      //console.log("inside hh" + grpHouse.length)
      //console.log("\ninside house" + grpHouse.get(0))
      grpHouse.setVelocityXEach(0);
      grpHouse.setLifetimeEach(-1);
    }
    
    if (grpSnowman.contains(snowman)) {
      //console.log("inside sm" + grpSnowman.length)
      //console.log("\ninside snowman" + grpSnowman.get(0))
      for (var i = 0; i < grpSnowman.length; i++) {
        grpSnowman.get(i).velocityX = 0;
        grpSnowman.setLifetimeEach(-1);
      }
    }
    
    if (grpSnowball.contains(snowball)) {
      //console.log("inside snowBall")
      for (var k = 0; k < grpSnowball.length; k++) {
        grpSnowball.get(k).velocityX = 0;
        grpSnowball.setLifetimeEach(-1);
      }
    }
    
    if (grpPanda.contains(panda)) {
      //console.log("inside panda" + grpPanda.length)
     //console.log("\ninside panda" + grpPanda.get(0))
      for (var n = 0; n < grpPanda.length; n++) {
        grpPanda.get(n).velocityX = 0;
        grpPanda.setLifetimeEach(-1);
      }
    }
    
    if (grpBird.contains(bird)) {
      // console.log("inside panda" + grpBird.length)
      //console.log("\ninside panda" + grpBird.get(0))
      for (var p = 0; p < grpBird.length; p++) {
        grpBird.get(p).velocityX = 0;
        grpBird.setLifetimeEach(-1);
      }
    }
    
    if (grpStar.contains(star)) {
      // console.log("inside star" + grpStar.length)
      // console.log("\ninside star" + grpStar.get(0))
      grpStar.get(0);
      for (var j = 0; j < grpStar.length; j++) {
        grpStar.get(j).velocityX = 0;
        grpStar.setLifetimeEach(-1);
      }
    }
    
    if (grpCBanner.contains(cBanner)) {
      //console.log("inside panda" + grpCBanner.length)
      // console.log("\ninside b" + grpCBanner.get(0))
      for (var m = 0; m < grpCBanner.length; m++) {
        grpCBanner.get(m).velocityX = 0;
        grpCBanner.setLifetimeEach(-1);
      }
    }
    santa.changeAnimation("santa_stop", imgSantaStop);
    santa.veloictyY = 0;
  }

  //console.log(bg.x);

  santa.collide(ground);

  drawSprites();
  
  // display the various text in game
  displayItems();
}

function showBanner() {
  if (grpHouse.isTouching(santa)||grpSnowman.isTouching(santa)) {
    soundHappy.play();
    wishGranted += 1;
    cBanner.visible = true;
  }
}

function showEatingPanda() {
  //console.log("INside banner");
  if (grpPanda.isTouching(santa)) {
    soundPanda.play();
    panda.changeImage("panda", imgPanda3);
    wishGranted += 1;
    panda.y = 205;
  }
}

function birdFly() {
  if (grpBird.isTouching(santa)) {
    soundBird.play();
    bird.changeImage("bird2", imgBird2);
    wishGranted += 1;
    bird.y = 40;
    bird.x = 240;
    bird.velocityY = 0
    bird.velocityX = 4;
  }
}

function showStars() {
  //console.log("INside banner");
  if (grpSnowball.isTouching(santa)) {
    soundSnowAval.play();
    santa.velocityY = 0;
    snowball.visible = false;
    star.visible = true;
    score += 1;
    //grpSnowball.destroyEach();
  }
}

function obsSnowball() {
  if (frameCount % 400 === 0) {
    snowball = createSprite(610, 265, 10, 10);
    snowball.addAnimation("snowball_roll", imgSnowball);
    snowball.scale = 0.5;
    snowball.velocityX = -6;
    //snowball.setCollider("circle", -125, 0, 70);
    snowball.setCollider("rectangle", -160, 0, 475, 100);
    snowball.liftime = 300;
    //snowball.debug = true;
    snowball.depth = santa.depth - 1;
    grpSnowball.add(snowball);

    star = createSprite(610, 265, 10, 10);
    star.addImage("snowball_roll", imgStar);
    star.visible = false;
    star.scale = 0.5;
    star.velocityX = -6;
    grpStar.add(star);
  }
}

function showPanda() {
  if (frameCount % 275 === 0) {
    var rand = Math.floor(random(1, 3));
      
     //console.log(rand);
    if (rand === 1) {
      panda = createSprite(610, 260, 10, 10);
      panda.addImage("panda_roll", imgPanda1);
      panda.addImage("panda_eat", imgPanda2);
      panda.addImage("panda", imgPanda3);
      panda.setCollider("rectangle", 0, 0, 2, panda.height * 9);
      panda.scale = 0.3;
      panda.velocityX = -4;
      panda.depth = santa.depth - 1;
      panda.lifetime = 300;
      //panda.debug = true;
      grpPanda.add(panda);

    } 
    else if (rand === 2) {
      bird = createSprite(605, 220, 10, 10);
      bird.addImage("bird1", imgBird1);
      bird.addImage("bird2", imgBird2);
      bird.setCollider("rectangle", 0, +100, 10, bird.height * 9);
      bird.scale = 0.3;
      bird.velocityX = -4;
      bird.depth = santa.depth - 1;
      bird.lifetime = 300;
      //bird.debug = true;
      grpBird.add(bird);
    } 
  }
  
  
  if (frameCount % 200 === 0) {
      house = createSprite(645, 215, 10, 10);
      house.addImage("house", imgHouse);
      house.scale = 0.2;
      house.velocityX = -4;
      house.setCollider("rectangle", 0, 0, 10, house.height * 3);
     
      snowman = createSprite(705, 225, 10, 10);
      snowman.addImage("snowman", imgSnowman);
      snowman.scale = 0.15;
      snowman.setCollider("rectangle",-250, 0, 10, snowman.height * 3);
      snowman.velocityX = -4;

      cBanner = createSprite(780, 245, 10, 10)
      cBanner.addImage("banner", imgCBanner);
      cBanner.scale = 0.5;
      cBanner.velocityX = -4;
      cBanner.visible = false;
       
      santa.depth = cBanner.depth + 1;
      //console.log(house.depth + "  "+snowman.depth+"  "+santa. depth);

      house.liftime = 300;
      snowman.lifetime = 300;
      cBanner.lifetime = 250;
      //house.debug = true;

      grpHouse.add(house)
      grpSnowman.add(snowman);
      grpCBanner.add(cBanner);
    }
}

function displayItems() {
  if (gameState === PLAY) {
    if (frameCount < 60) {
      textSize(30);
      strokeWeight(5);
      fill("Red")
      text("\t\t Help Santa Claus grant wishes...", 70, 170)
      textSize(20);
      strokeWeight(3);
      text("Press space key to make the Santa jump.", 140, 200);
      strokeWeight(1);
      fill("grey");
    }

    textSize(14);
    rect(535, 12, 58, 22);
    rect(430, 12, 100, 22);
    rect(535, 38, 58, 22);
    rect(430, 38, 100, 22);
    rect(535, 63, 58, 22);
    rect(430, 63, 100, 22);
    fill("White")
    text("Running Time:\t\t" + surTime, 437, 28);
    textSize(14);
    fill("Yellow")
    text("Wish Granted:\t\t " + wishGranted, 438, 54);
    textSize(14);
    fill("black")
    text("Hit:\t\t " + score, 507, 78);
  } else if (gameState === END) {
    textSize(30);
    strokeWeight(5);
    fill("Red")
    text("Merry Christmas \n \t Game Over. ", 200, 150);
  }
}