<template>
  <div>
    <group>
      <div class="box">
        <header>
          在“人民银行征信中心”获取个人征信报告的地址:
          <a href="https://ipcrs.pbccrc.org.cn"
             @click="go">https://ipcrs.pbccrc.org.cn</a>
          (建议使用电脑或手机浏览器打开)
        </header>
        <section>
          <h4>1、进入征信中心，注册登录</h4>
          <p>
            <img src="../../../static/01.jpg"
                 alt="01">
            <img src="../../../static/02.jpg"
                 alt="02">
          </p>
          <h4>2、登录成功，新手导航--点击【下一步】</h4>
          <p>
            <img src="../../../static/03.png"
                 alt="03">
          </p>
          <h4>3、选择“问题验证”，点击【下一步】</h4>
          <p>
            <img src="../../../static/04.png"
                 alt="04">
          </p>
          <h4>4、回答问题，点击【下一步】</h4>
          <p>
            <img src="../../../static/05.png"
                 alt="05">
          </p>
          <h4>5、选择信用报告--三项全部勾选，点击【下一步】</h4>
          <p>
            <img src="../../../static/06.png"
                 alt="06">
          </p>
          <h4>6、申请完成，等待“身份验证码”短信</h4>
        </section>
        <footer>
          <div class="warning">提示</div>
          <p>获得“身份验证码”后7日内，进行授权；超过7日，需重新登录征信中心，申请信用信息，获取新的“身份验证码”</p>
        </footer>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    methods: {
      go () {
        window.location.href = 'https://ipcrs.pbccrc.org.cn'
      }
    }
  }
</script>

<style scoped>
    .box {
        padding: 0 10px;
    }

    img {
        width: 100%;
    }

    h4 {
        font-weight: normal;
    }

    .warning {
        color: #DF4D3B;
    }

    a {
        color: #0255F2;
    }

</style>
