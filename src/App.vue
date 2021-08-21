<template>
  <div id="app">
      <bar />
        <Menu ref="menu" @addedItem="addNEwItem" @dataChanged="updateData($event)"/>
        <orders :orders="orders"/>
        <BottomNav />
  </div>
</template>

<script>

import bar from './components/bar.vue'
import menu from './components/menu.vue'
import orders from './components/orders.vue'  
import BottomNav from './components/BottomNav.vue'
export default {
  name: 'App',
  components: {
      "bar":bar, 
      "Menu":menu,
      orders,
      BottomNav
  },
  data(){
    return {
      orders: []
    }
  },
  methods: {
    addNEwItem(item){
      this.orders.push(item);
      this.orders = [ ...new Set(this.orders)];
      console.log(this.orders)
    },
    updateData(orders){
      this.orders = orders;
    }
  },
  
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    padding: 0;
  }
</style>
