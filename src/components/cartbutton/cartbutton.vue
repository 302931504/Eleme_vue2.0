<template>
  <div class="button">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop="decrFood">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addFood($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addFood (ev) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', ev.target);
      },
      decrFood () {
        if (this.food.count === 0) {
          return;
        }
        this.food.count--;
      }
    }
  };  
</script>
<style scoped>
  .button{
    font-size: 0; 
  } 
  .cart-decrease, .cart-count, .cart-add{
    display: inline-block;
  } 
  .cart-decrease, .cart-add{
    line-height: 24px;
    font-size: 24px;
    padding: 6px;
    color: rgb(0,120,160);
  }
  .cart-count{
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s linear;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
    transform: translate3d(24px,0,0);
  }
</style>