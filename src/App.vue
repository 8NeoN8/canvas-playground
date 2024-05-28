<template>
  <div class="container">
    <template v-if="false">
      <playerAndEnemiesCanvas></playerAndEnemiesCanvas>
    </template>
    <template v-if="true">
      <centerEnemyBullets></centerEnemyBullets>
    </template>
  </div>
  
</template>

<script>
import playerAndEnemiesCanvas from './components/firstCanvas.vue'
import centerEnemyBullets from './components/secondCanvas.vue'

export default{
  name: 'Home',
  components:{
    playerAndEnemiesCanvas,
    centerEnemyBullets
  },
  data() {
    return {
      
    }
  },
  computed:{
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {

  },
}
</script>

<style>

</style>
