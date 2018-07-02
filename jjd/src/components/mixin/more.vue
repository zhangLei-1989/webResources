<template>
  <div class="more">
    <span class="dot-1"></span>
    <span class="dot-2"></span>
    <span></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="scss"
       scoped>
  @import '../../scss/const';

  .more {
    text-align: center;
    padding: 10px 0;
  }

  span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 3px;
    background-color: $BORDER_COLOR;
    border-radius: 100%;
    animation: bounce 1.6s infinite ease-in-out;
    animation-fill-mode: both;
    @at-root {
      @keyframes bounce {
        0%, 80%, to {
          transform: scale(0)
        }

        40% {
          transform: scale(1)
        }
      }
    }
  }

  .dot {
    &-1 {
      animation-delay: -.32s
    }
    &-2 {
      animation-delay: -.16s
    }
  }
</style>
