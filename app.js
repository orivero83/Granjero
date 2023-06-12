function initCanvas(){
    
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // nave
    var enemiespic1  = new Image(); // enemigo 1
    var enemiespic2 = new Image(); // enemigo 2
    var enemiespic3 = new Image(); // enemigo 3

    
   


    // backgroundImage y naveImage
    backgroundImage.src = "images/NewImg/Sand.jpg"; //Background picture
    naveImage.src       = "images/NewImg/campesino.png"; //Spaceship picture
    // Enemigos fotos
    enemiespic1.src     = "images/NewImg/vaca.png";
    enemiespic2.src     = "images/NewImg/CerdoUsar.png"; //Enemies picture
    enemiespic3.src     = "images/NewImg/perro.png";
    
    // width and height (canvas)
    var cW = ctx.canvas.width; // 700px 
    var cH = ctx.canvas.height;// 600px

    // template for naves
    var enemyTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }

    // To reduce a repetitive function or two I've made some slight changes to how you create enemies.
    var enemies = [
                   new enemyTemplate({id: " 1", x:100, y: -20, w: 50, h: 30 }),
                   new enemyTemplate({id: " 2", x:225, y: -20, w: 50, h: 30 }),
                   new enemyTemplate({id: " 3", x:350, y: -20, w: 80, h: 30 }),
                   new enemyTemplate({id: " 4", x:100,  y:-70,  w:80,  h: 30}),
                   new enemyTemplate({id: " 5", x:225,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: " 6", x:350,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: " 7", x:475,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: " 8", x:600,  y:-70,  w:80,  h: 30}),
                   new enemyTemplate({id: " 9", x:475,  y:-20,  w:50,  h: 30}),
                   new enemyTemplate({id: " 10",x:600,  y:-20, w: 50, h: 30}),

                   // Segundo grupo de enemigos
                   new enemyTemplate({ id: " 11", x: 100, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 12", x: 225, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 13", x: 350, y: -220, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: " 14", x: 100, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: " 15", x: 225, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 16", x: 350, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 17", x: 475, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 18", x: 600, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: " 19", x: 475, y: -200, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: " 20", x: 600, y: -200, w: 50, h: 30, image: enemiespic2 }),

                   // Tercer grupo de enemigos

                   new enemyTemplate({ id: " 21", x: 100, y: -420, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 22", x: 225, y: -420, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 23", x: 350, y: -420, w: 80, h: 50, image: enemiespic3 }),
                   new enemyTemplate({ id: " 24", x: 100, y: -470, w: 80, h: 50, image: enemiespic3 }),
                   new enemyTemplate({ id: " 25", x: 225, y: -470, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 26", x: 350, y: -470, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 27", x: 475, y: -470, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 28", x: 600, y: -470, w: 80, h: 50, image: enemiespic3 }),
                   new enemyTemplate({ id: " 29", x: 475, y: -400, w: 50, h: 30, image: enemiespic3 }),
                   new enemyTemplate({ id: " 30", x: 600, y: -400, w: 50, h: 30, image: enemiespic3 }),

                  ];

    // This allows for more enemies to be rendered without needing a function per set of enemies.
    // This also forces enemies to check if THEY are hitting the player 
    var renderEnemies = function (enemyList) {
        for (var i = 0; i < enemyList.length; i++) {
            console.log(enemyList[i]);
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .1, enemyList[i].w, enemyList[i].h);
            // Detects when ships hit lower level
            launcher.hitDetectLowerLevel(enemyList[i]);
        }
    }

    function Launcher(){
        // bullet location (ubicación de balas)
        this.y = 275, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="blue", // bullet color (color de bala)
        this.misiles = [];

         // If you wanted to use different fonts or messages for the player losing you can change it accordingly.
         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;
            }


            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10); // background image
            ctx.drawImage(naveImage,this.x,this.y, 100, 90); // we need to make sure spaceship is at the same location as the bullets

            for(var i=0; i < this.misiles.length; i++){
                var m = this.misiles[i];
                ctx.fillRect(m.x, m.y-=5, m.w, m.h); // bullet direction
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.misiles.splice(i,1); // splice that missile out of the misiles array
                }
            }
            // This happens if you win
            if (enemies.length === 0) {
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = 'Green';
                ctx.font = this.gameStatus.font;
                ctx.fillText('Ganaste!', cW * .5 - 80, 180);
                

            }
        }
        // Detectar impacto de bullet (bala)
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.misiles.splice(this.misiles[mi],1); // Remove the missile
                    enemies.splice(i, 1); // Remove the enemy that the missile hit
                    document.querySelector('.barra').innerHTML = "Enemigo Destruido "+ e.id+ " ";
                }
            }
        }
        // Ask player ship if an enemy has passed or has hit the player ship
        this.hitDetectLowerLevel = function(enemy){
            // If location of ship is greater than 500 then we know it passed lower level
            if(enemy.y > 320){
                this.gameStatus.over = true;
                this.gameStatus.message = 'El enemigo ha pasado!';
                
            }
            // Esto detecta un choque de la nave con enemigos
            //console.log(this);
            // this.y -> where is spaceship location
            if(enemy.id === 'enemy3'){
                //console.log(this.y);
                console.log(this.x);
            }
            // a) If enemy y is greater than this.y - 25 => then we know there's a collision
            // b) If enemy x is gless than this.x + 45 && enemy x > this.x - 45 then we know theres a collision
            if ((enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 45 && enemy.x > this.x - 45)) { // Checking if enemy is on the left or right of spaceship
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'Has muerto!'
                    
                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = this.gameStatus.fillStyle; // set color to text
                ctx.font = this.gameStatus.font;
                // To show text on canvas
                ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); // text x , y
            }
        }
    }
    
    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    var animateInterval = setInterval(animate, 6);
    
    var left_btn  = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn  = document.getElementById('fire_btn'); 

   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) // left arrow
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) // right arrow
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) // right arrow
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 13) // restart game / Tecla ENTER
         {
          location.reload();
         }
    });

    // This fires when clicking on space button from keyboard
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 200});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});
