<template>
  <div>
    <group :first="true">
      <ele>
        <div class="box">
          <div class="no-data"></div>
          <div>您的好友还没有完善信用报告~</div>
        </div>
      </ele>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .desc {
    padding-top: 10px;
    p {
      font-size: $TIP_FONT_SIZE;
      color: $TIP_COLOR;
      margin-top: 5px;
    }
  }

  .box {
    padding: 20px 0;
    color: $TIP_COLOR;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-data {
      width: 100px;
      height: 100px;
      background: url("../../assets/noData.svg") center no-repeat {
        size: contain;
      }
    }
  }
</style>
