const bulletProto = {
  drawMe(){
    return this.velocity
  }
}

export default function createBullet({position, dimensions, velocity, color}){
  return Object.create(bulletProto,{
    position: {
      value: position,
      writable: true
    },
    dimensions: {
      value: dimensions,
      writable: true
    },
    velocity: {
      value: velocity,
      writable: true
    },
    color: {
      value: color,
      writable: true
    },
  })
}