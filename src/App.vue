<template>
  <div class="container">

    <div @keypress.shift="framerate = 100" class="frame-counter" style="color:white;">framerate?: {{fps}}</div>
    <canvas id="first-canvas" ref="first-canvas" class="first-canvas" height="800" width="800"></canvas>

    <button v-if="!gameStart" class="play-button" @click="startGame()">Play</button>
  </div>
  
</template>

<script>
import createPlayer from './classes/player.js'
import createEnemy from './classes/enemy.js'
import level1 from './assets/levels/level1.json'

export default{
  name: 'Home',
  data() {
    return {
      gameStart: false,
      gameLevel: level1,
      cnv: null,
      ctx: null,
      player: {},
      enemies: [],
      bullets: [],
      framerate: 60,
      fps: null,
      controlsState:{
        isUpPressed:false,
        isDownPressed:false,
        isLeftPressed:false,
        isRightPressed:false,
      }
    }
  },
  computed:{
  },
  created() {
    
  },
  mounted() {
    this.cnv = this.$refs['first-canvas']
    this.ctx = this.cnv.getContext('2d')

    window.addEventListener('resize', (e) => {
      this.setCanvasDimensions()
    })

    this.setCanvasDimensions()
    
  },
  methods: {
    startGame(){
      this.gameStart = true
      this.gameSetup()
      this.gameLoop()
    },
    setCanvasDimensions(){

      if(window.innerWidth > 400 && window.innerHeight > 600){
        this.cnv.width = window.innerWidth - 100
        this.cnv.height = window.innerHeight - 100
      }
        
    },
    drawPlayerEnemy(entity, isPlayer = false){
      this.ctx.fillStyle = entity.color
      if(isPlayer){
        this.ctx.fillRect(entity.position.x, entity.position.y, entity.dimensions.w, entity.dimensions.h)
      }
      if(!isPlayer){
        this.ctx.fillRect(entity.position.x, entity.position.y, entity.dimensions.w, entity.dimensions.h)
      }
      this.ctx.stroke()
    },
    movePlayer(){
      //! MAKE IT SO THAT IF OPPOSITE DIRECTIONS ARE PRESSED THEY DONT JUST CONSTANTLY CHANGE THE VALUE OF THE COORDINATE, THAT SHOULD BE HAPPENING AS OF WRITING HIS COMMENT

      if (this.controlsState.isLeftPressed) {
        this.player.position.x -= this.player.velocity
        this.player.boundaries.right -= this.player.velocity
        this.player.boundaries.left -= this.player.velocity


        if (this.checkMapCollision(this.player.boundaries.left, 0, false)) {
          this.player.position.x = 0
          this.player.boundaries.right = this.player.dimensions.w
          this.player.boundaries.left = 0
        }
      }

      if (this.controlsState.isRightPressed){
        this.player.position.x += this.player.velocity
        this.player.boundaries.right += this.player.velocity
        this.player.boundaries.left += this.player.velocity

        if (this.checkMapCollision(this.player.boundaries.right, this.cnv.width, true)) {
          this.player.position.x = this.cnv.width - this.player.dimensions.w
          this.player.boundaries.right = this.cnv.width
          this.player.boundaries.left = this.cnv.width - this.player.dimensions.w
        }
      }

      if(this.controlsState.isUpPressed){
        this.player.position.y -= this.player.velocity
        this.player.boundaries.top -= this.player.velocity
        this.player.boundaries.bottom -= this.player.velocity

        if (this.checkMapCollision(this.player.boundaries.top, 0, false)) {
          this.player.position.y = 0
          this.player.boundaries.top = 0
          this.player.boundaries.bottom = this.player.dimensions.h
        }
      }

      if(this.controlsState.isDownPressed){

        this.player.position.y += this.player.velocity
        this.player.boundaries.top += this.player.velocity
        this.player.boundaries.bottom += this.player.velocity

        if (this.checkMapCollision(this.player.boundaries.bottom, this.cnv.height, true)) {
          this.player.position.y = this.cnv.height - this.player.dimensions.h
          this.player.boundaries.top = this.cnv.height - this.player.dimensions.h
          this.player.boundaries.bottom = this.cnv.height 
        }
      }
    },
    checkMapCollision(playerBoundary, collisionCoordinateTocheck, boundaryHasToBeLowerThanCollision){
      //console.log(`If ${playerBoundary} > to ${collisionCoordinateTocheck} \n and boundaryHasToBeLowerThanCollision is ${boundaryHasToBeLowerThanCollision}`);

      if(boundaryHasToBeLowerThanCollision && playerBoundary > collisionCoordinateTocheck){
        return true
      }
      if(!boundaryHasToBeLowerThanCollision && playerBoundary < collisionCoordinateTocheck){
        return true
      }
    },
    createControls(){
      window.addEventListener('keypress', (event) => {
        event.preventDefault()
        this.controlsLogic(event, true)
        if(event.key == ' ') this.player.velocity = 2
      })
      window.addEventListener('keyup', (event) => {
        event.preventDefault()
        this.controlsLogic(event, false)
        if(event.key == ' ') this.player.velocity = 5
      })

    },
    controlsLogic(keyEvent, isHolded){
      if(isHolded){
        switch (keyEvent.key.toLowerCase()) {
          case 'a':
            this.controlsState.isLeftPressed = true
            break;
          case 'd':
            this.controlsState.isRightPressed = true
            break;
          case 'w':
            this.controlsState.isUpPressed = true
            break;
          case 's':
            this.controlsState.isDownPressed = true
            break;
          default:
            break;
          }
      }

      if(!isHolded){
        switch (keyEvent.key.toLowerCase()) {
          case 'a':
            this.controlsState.isLeftPressed = false
            break;
          case 'd':
            this.controlsState.isRightPressed = false
            break;
          case 'w':
            this.controlsState.isUpPressed = false
            break;
          case 's':
            this.controlsState.isDownPressed = false
            break;
          default:
            break;
        }
      }
    },
    gameSetup(){
      let playerDimensions = {
        w: 30,
        h: 30
      }
      this.player = createPlayer({
        position: {
          x: this.cnv.width/2 - playerDimensions.w,
          y: this.cnv.height - playerDimensions.h - 20
        },
        velocity: 5,
        dimensions: playerDimensions,
        color:'lime',
        boundaries: {
          top: this.cnv.height - playerDimensions.h - 20,
          bottom: this.cnv.height - playerDimensions.h - 20 + playerDimensions.h,
          left: this.cnv.width/2 - playerDimensions.w,
          right: this.cnv.width/2 - playerDimensions.w + playerDimensions.w,
        }
      })

      console.log(this.player);

      for (let i = 0; i < this.gameLevel.enemyCount; i++) {
        let enemy = createEnemy({
          position: {
            x: this.cnv.width/2 - playerDimensions.w,
            y: 20
          },
          dimensions: playerDimensions,
          velocity: 5,
          color: 'red',
          type: this.gameLevel.enemies[i].enemyType,
          bulletPattern: this.gameLevel.enemies[i].bulletPattern,
          movementPattern: this.gameLevel.enemies[i].movementPattern,
          isEnemy: true,
          boundaries: {
            top: 20,
            bottom: 20 + playerDimensions.h,
            left: this.cnv.width/2 - playerDimensions.w,
            right: this.cnv.width/2 - playerDimensions.w + playerDimensions.w,
          }
        })
      console.log(enemy, 'enemy');

      this.drawPlayerEnemy(enemy)

      this.enemies.push(enemy)
        
    }

      this.drawPlayerEnemy(this.player, true)
      this.createControls()
    },
    gameLoop(){
      if(this.gameStart){
        console.log('frame');
        
        this.movePlayer()
        this.clearCanvas()
        this.drawPlayerEnemy(this.player, true)
        for (let i = 0; i < this.enemies.length; i++) {
          this.drawPlayerEnemy(this.enemies[i])
        }

        window.requestAnimationFrame(this.gameLoop)

        return
      }
    },
    clearCanvas(){
      this.ctx.beginPath()
      this.ctx.clearRect(0,0,this.cnv.width,this.cnv.height)
    },
    
  },
}
</script>

<style>

:root{
  font-size: 18px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
}

.first-canvas{
  border: 1px solid red;
}

#app{
  background-color: blue;
  width: 100vw;
  height: 100dvh;
  overflow: auto;
  
}

.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.play-button{
  position: absolute;
  margin: auto;
  
  font-size: 24px;
  font-family: Helvetica;
  font-weight: bold;
  padding: 1rem;
  color: white;
  background-color: red;
  border: 2px white;
  text-shadow: #FC0 1px 0 10px;
  width: fit-content;
  border-radius: 1rem;
  animation: pulsate 3s ease-in-out infinite;
}

.play-button:hover{
  animation: grow 0.1s ease-in-out forwards;
  background-color: rgb(201, 21, 21);
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes grow {
  from {
    transform:  scale(1);
  }
  to {
    transform: scale(1.3);
  }
}

</style>
