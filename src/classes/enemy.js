'use strict';
const enemyPrototype = {
  enemyTest(){
      return 'this is an enemy'
  }
}

export default function createEnemy({
    position, 
    velocity, 
    dimensions, 
    color, 
    type, 
    bulletPattern, 
    movementPattern, 
    isEnemy, 
    boundaries,
    reachedBoundary
  }){
  return Object.create(enemyPrototype, {
    position:{
      value: {
        x: position.x,
        y: position.y
      },
      writable:true
    },
    dimensions:{
      value: {
        w: dimensions.w,
        h: dimensions.h
      },
      writable:true
    },
    velocity:{
      value: velocity,
      writable:true
    },
    color: {
      value: color,
      writable:true
    },
    type:{
      value: type,
      writable:true
    },
    bulletPattern:{
      value: bulletPattern,
      writable:true
    },
    movementPattern:{
      value: movementPattern,
      writable:true
    },
    isEnemy:{
      value: isEnemy,
      writable:true
    },
    boundaries:{
      value: boundaries,
      writable: true
    },
    reachedBoundary:{
      value: reachedBoundary,
      writable: true
    }
  })
}
