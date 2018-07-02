<template>
  <div>
    <group>
      <div slot="tip_bottom"
           class="tip">
        <ele>
          <div>
            <header>
              如何获取服务密码？
            </header>
            <section>
              <h4>移动用户</h4>
              <p>
                方法一：手机拨打<span class="can-go"
                              @click="goUrl('10086')">10086</span>，转“人工服务”；<br>
                方法二：访问<span class="can-go"
                            @click="goUrl('www.10086.cn')">www.10086.cn</span>，登录，“忘记密码”查询；
              </p>
              <h4>联通用户</h4>
              <p>
                方法一：手机拨打<span class="can-go"
                              @click="goUrl('10010')">10010</span>，转“人工服务”；<br>
                方法二：访问<span class="can-go"
                            @click="goUrl('wap.10010.com')">wap.10010.com</span>，登录，“忘记密码”查询；
              </p>
              <h4>电信用户</h4>
              <p>
                方法一：手机拨打<span class="can-go"
                              @click="goUrl('10000')">10000</span>，转“人工服务”；<br>
                方法二：访问<span class="can-go"
                            @click="goUrl('www.189.cn')">www.189.cn</span>，登录，“忘记密码”查询。
              </p>
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
