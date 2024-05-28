const enemyProto = {
  drawMe(){
    return this.color
  }
}

export default function createEnemy({position, dimensions, color, hurtbox}){
  return Object.create(enemyProto,{
    position: {
      value: position,
      writable: true
    },
    dimensions: {
      value: dimensions,
      writable: true
    },
    color: {
      value: color,
      writable: true
    },
    hurtbox: {
      value: hurtbox,
      writable: true
    }
  })
}