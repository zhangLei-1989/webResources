<template>
  <div class="basic-card"
       v-link="link">
    <ele :dashed="true">
      <div class="user">
        <div class="user-icon"
             v-if="userIcon"
             :style="{backgroundImage: 'url(' + userIcon + ')'}"></div>
        <div class="user-icon"
             v-else>{{name.slice(0, 1)}}
        </div>
        <div class="user-name">{{name}}</div>
        <div class="real"
             v-if="real"></div>
      </div>
      <div class="status">{{typeText}}</div>
    </ele>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import ele from '../mixin/ele'

  export default{
    props: [
      'link',
      'typeText',
      'name',
      'userIcon',
      'real'
    ],
    components: {
      ele
    }
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/function';

  .basic-card {
    @extend %card-shadow;
    color: $MAIN_TEXT_COLOR;
  }

  .status {
    color: $TIP_COLOR;
    font-size: $TIP_FONT_SIZE;
  }

  .user {
    display: flex;
    align-items: center;
    position: relative;
    &-icon {
      @include user-icon(40px);
      margin-right: 10px;
    }
    &-name {
      color: $MAIN_COLOR;
    }
  }

  .real {
    @include real('../../../static/real.png');
    left: 30px;
  }
</style>
