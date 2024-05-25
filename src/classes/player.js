'use strict';
const playerPrototype = {
  playerTest(){
      return 'test'
  }
}

export default function createPlayer({position, velocity, dimensions, color, boundaries}){
  return Object.create(playerPrototype, {
    position:{
      value: {
        x: position.x,
        y: position.y,
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
    boundaries:{
      value: boundaries,
      writable: true
    }
  })
}

