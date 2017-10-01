<template>
  <div id="app">
    <headBox :seller="seller"></headBox>
    <ul class="tab border-1px">
      <router-link class="tab-item" to='/goods' tag='li'>商品</router-link>
      <router-link class="tab-item" to='/ratings'  tag='li'>评论</router-link>
      <router-link class="tab-item" to='/seller'  tag='li'>商家</router-link>
    </ul>
    <router-view :seller="seller"></router-view>
    <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import headBox from './components/headBox/headBox';
  import shopcart from './components/shopcart/shopcart';
  export default {
    name: 'app',
    data () {
      return {
        seller: {},
        foodsList: []
      };
    },
    components: {
      headBox,
      shopcart
    },
    created () {
      this.$http.get('/api/seller').then(res => {
        let data = res.data;
        if (!data.errno) {
          this.seller = data.data;
        }
      }).catch(err => err);
    }
  };
</script>
<style scoped>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7,17,27,.1);
    content: '';
    width: 100%;
  }
  .tab-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .router-link-active{
    color: rgb(240,20,20);
  }
</style>
