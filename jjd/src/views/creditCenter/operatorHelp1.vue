<template>
  <div>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div>
            <header>
              授权失败的常见原因？
            </header>
            <section>
              <p>1、全部173、大部分177、大部分170号码段，企业账号，携号转网用户，不能正常授权成功；</p>
              <p>2、电信（吉林、陕西、山西、湖南、浙江、重庆、广西、云南）这8个省份的号码必须实名制才可以；</p>
              <p>3、授权次数过多导致到达上限，需要等待或者更换手机号再次尝试；</p>
              <p>4、短信验证码超时没有输入，需要刷新当前页面或者返回上一页再次尝试。</p>
            </section>
          </div>
        </ele>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    methods: {
      goUrl (url) {
        if (url.indexOf('.') > -1) {
          window.location.href = `http://${url}`
        } else {
          window.location.href = `tel:${url}`
        }
      },
    },
  }
</script>

<style lang="scss"
       scoped>
  @import '../../scss/const';

  header {
    color: $MAIN_COLOR;
    margin: 1em 0 .5em;
  }

  p {
    margin: .2em 0 .5em;
    text-align: justify;
  }

  h4 {
    margin: .5em 0 .2em;
  }

  .can-go {
    text-decoration: underline;
    color: $MAIN_COLOR;
  }
</style>
