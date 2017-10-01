<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    created () {
      this.itemClasses;
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        let i = 0;
        while (i < integer) {
          result.push(CLS_ON);
          i++;
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      } 
    },
    methods: {
    }
  };
</script>
<style scoped>
  .star{
    font-size: 0;
  }
  .star-item{
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-item:last-child{
    margin-right: 0;
  }
  .star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
  }
  .star-48 .on{
    background: url('./star48_on@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-48 .half{
    background: url('./star48_half@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-48 .off{
    background: url('./star48_off@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: cover;
  }
  .star-36 .on{
    background: url('./star36_on@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-36 .half{
    background: url('./star36_half@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-36 .off{
    background: url('./star36_off@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: cover;
  }
  .star-24 .on{
    background: url('./star24_on@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-24 .half{
    background: url('./star24_half@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .star-24 .off{
    background: url('./star24_off@2x.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>