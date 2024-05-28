<template>
  <div class="container">
    <canvas id="secondCanvas" ref="secondCanvas" width="800" height="800"></canvas>
  </div>
  
</template>

<script>

import createEnemy from '../classes/secondEnemy'

export default {
  name: 'centerEnemyBullets',
  data() {
    return {
      canvas: null,
      ctx: null,
      enemy: null,
      bullets:[],
      center: {
        x: 0,
        y: 0
      },
      frameRate: 60,
      frameCounter: 0,
    }
  },
  created() {
    
  },
  mounted() {
    this.setupCanvas()
    this.gameLoop()
  },
  methods: {
    setupCanvas(){
      let enemySquareDimensions = 15
      this.canvas = this.$refs['secondCanvas']
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = 900
      this.canvas.height = 900
      this.ctx.beginPath()
      this.enemy = createEnemy({
        position: {
          x: this.canvas.width/2 - enemySquareDimensions/2,
          y: this.canvas.height/2 - enemySquareDimensions/2
        },
        dimensions: {
          w:enemySquareDimensions,
          h:enemySquareDimensions
        },
        color: 'black',
        hurtbox: {
          x: this.canvas.width/2 - enemySquareDimensions/6,
          y: this.canvas.height/2 - enemySquareDimensions/6
        }
      })
      this.drawEnemy()

      this.center = {
        x: this.canvas.width/2,
        y: this.canvas.height/2
      }
      this.ctx.moveTo(this.canvas.width/2,0)
      this.ctx.lineTo(this.canvas.width/2,this.canvas.height)
      this.ctx.moveTo(0,this.canvas.height/2)
      this.ctx.lineTo(this.canvas.width,this.canvas.height/2)
      this.ctx.stroke()

      let angle = 0
      let radius = 45

      for (let i = 0; i < 24; i++) {

        let newAngle = ( angle +1 ) % 360

        let rad = newAngle * Math.PI / 180
        let bulletX = this.center.x + radius * Math.cos(rad)
        let bulletY = this.center.y - radius * Math.sin(rad)

        this.ctx.fillStyle = this.enemy.color,
        this.ctx.fillRect( bulletX,bulletY, 5, 5)

        //console.log(bulletX, bulletY);
        angle += 15

      }
    },

    drawEnemy(drawHurtbox = false){
      this.ctx.fillStyle = this.enemy.color,
      this.ctx.fillRect( this.enemy.position.x,this.enemy.position.y, this.enemy.dimensions.w, this.enemy.dimensions.h)
      if(drawHurtbox){
        this.ctx.fillStyle = 'red',
        this.ctx.fillRect( this.enemy.hurtbox.x,this.enemy.hurtbox.y, this.enemy.dimensions.w/3, this.enemy.dimensions.h/3)
      }
    },
    gameLoop(){
      this.frameCounter++
      if(this.frameCounter % 7 == 0) console.log(this.frameCounter);

      if(this.frameCounter > this.frameRate){
        this.frameCounter = 0
      }
      //console.log('frame: ', this.frameCounter);
      if(false){
        window.requestAnimationFrame(this.gameLoop)
      }
    }
  },
}
</script>

<style>

#secondCanvas{
  border: 5px solid purple;
  background-color: whitesmoke;
}

</style>