<template>
  <div>
    <group :single="true"
           v-if="borrowerId && lenderId"
           class="no-last">
      <btn :cut="1"
           :btn-fn="getLoanAgreements"
           :text="'下载协议'"></btn>
    </group>
    <h2 class="title">今借到借款协议</h2>
    <!--<div v-if="id !== '0'">协议编号：{{id}}</div>-->
    <div>甲方（借款人）：{{borrower}}</div>
    <div>注册手机号：{{borrowerTel}}</div>
    <div>身份证号：{{borrowerId}}</div>
    <div>乙方（出借人）：{{lender}}</div>
    <div>注册手机号：{{lenderTel}}</div>
    <div>身份证号：{{lenderId}}</div>
    <div>丙方（居间服务商）：今借到平台（隶属于北京人人信科技有限公司）</div>
    <div>客服电话：010-52497911</div>
    <div>居间平台服务商（本合同丙方）为今借到平台（微信公众号&#8220;今借到&#8221;）的运营管理人，为借贷双方提供居间服务。</div>
    <div>甲乙双方均已在丙方平台注册，同意遵守丙方平台的各项行为准则，在充分阅读理解本文本情形下，本着诚信自愿原则签订本《借款协议》。本协议内容如下：</div>
    <section>
      <h3>一、借款主要内容</h3>
      <table>
        <tr>
          <td>借款金额</td>
          <td v-if="id !== '0'">{{money}}元</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>借款日期</td>
          <td>{{startDate}}</td>
        </tr>
        <tr>
          <td>还款日期</td>
          <td>{{endDate}}</td>
        </tr>
        <tr>
          <td>年化利率</td>
          <td v-if="id !== '0'">{{yearlyRate}}%</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>借款用途</td>
          <td>{{use}}</td>
        </tr>
        <tr>
          <td>还款总额</td>
          <td v-if="id !== '0'">{{totalMoney}}元</td>
          <td v-else></td>
        </tr>
      </table>
      <div>注：还款总额=借款金额*（1+借款时长/365*年化利率），其中借款时长为起借日期和还款日期间的天数；</div>
    </section>
    <section>
      <h3>二、协议的生效</h3>
      <div>
        甲乙双方都可以起草借条，起草完成后点击发送按钮，即代表承认借条中约定的借款金额、起借日期、还款日期、年化利率等信息。在确认人确认该借条之前，起草人有权利将该借条删除。
      </div>
      <div>
        确认人收到借条后，如果发觉借条载明信息有误，可以退回给起草人以重新编辑；如果确认无误，点击确认借条按钮即代表认可借条中约定信息，确认后本协议即时生效。
      </div>
    </section>
    <section>
      <h3>三、本息偿还方式</h3>
      <div>
        甲方必须按钮本协议的约定按时、足额偿还乙方的本金和利息。还款日不受法定假日或公休日的影响，还款日前必须还款，否则会对借款人的信用记录造成影响。
      </div>
      <div>
        甲方可以通过线上或者线下的方式予以还款，线上是指甲方通过今借到的账户系统将待还本息偿还到乙方的账户余额中，如果甲方采取此种还款方式，需多支付4&#8240;（千分之四）的服务费用，用于支付第三方支付公司的手续费。
      </div>
      <div>
        如果甲方通过支付宝、微信或现金等方式将待还本息偿还给了乙方，甲方需要在今借到平台上发起一个已还款提醒，乙方在收到该消息且核实已收到甲方的线下还款后，则可点击确认按钮以终结借条。如果乙方核实后发现没有收到甲方的线下还款，可以将该消息驳回或致电问询。
      </div>
      <div>甲方应还的本息总额计算公式为：待还本息=借款金额*（1+借款时长*年化利率/365），其中借款时长为起借日期和还款日期间的天数。甲方可多次还款直至待还本息全部还清，但甲方的提前还款并不减少待还本息。</div>
    </section>
    <section>
      <h3>四、违约</h3>
      <div>甲乙双方需保证其提供的信息和资料的真实性，不得提供虚假资料或隐瞒重要事实。提供虚假资料或者故意隐瞒重要事实的，构成违约，应承担违约责任；构成犯罪的，丙方将有权向相关国家机关报案，追究其刑事责任。
      </div>
      <div>如果甲方没有按照约定按时、足额偿还对乙方的本金和利息，则甲方构成违约责任。丙方作为信息中介，不承担对乙方未收回本息部分的代偿责任。。
      </div>
      <div>丙方拥有将甲方违约失信的相关信息在媒体披露的权利，并且丙方会将甲方违约信息录入今借到平台黑名单以供他人查阅。
      </div>
    </section>
    <section>
      <h3>五、其他</h3>
      <div>
        本协议经甲乙双方通过丙方今借到平台以网络在线点击确认的方式签订。各方委托今借到平台保管所有与本协议有关的书面文件或电子信息。
      </div>
      <div>
        各方均确认，本协议的签订、生效和履行以不违反法律为前提。如果本协议中的任何一条或多条违反适用的法律，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
      </div>
      <div>
        本协议中所使用的定义，除非另有规定，否则应适用今借到平台释义规则，今借到平台对本文定义享有最终解释权。
      </div>
    </section>
    <div><br>签订日期：{{crtDate}}<br><br><br></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import iou from 'api/iou'
  import download from 'api/download'
  import { alert } from 'tools/utils'

  export default{
    vuex: {
      getters: {},
      actions: {}
    },
    data () {
      return {
        id: '',
        borrower: '',
        borrowerTel: '',
        borrowerId: '',
        lender: '',
        lenderTel: '',
        lenderId: '',
        guarantee: '',
        guaranteeTel: '',
        guaranteeId: '',
        money: '',
        guarantorAmt: '',
        startDate: '',
        endDate: '',
        crtDate: '',
        payWay: '',
        yearlyRate: '',
        serviceFee: '',
        totalMoney: '',
        use: '',
        addText: '',
        picUrls: [],
        onLine: 0
      }
    },
    components: {},
    computed: {},
    methods: {
      getLoanAgreements () {
        const url = download.getLoanAgreementsUrl({
          iouId: this.id
        })
        alert(`<div>请复制下方链接，在浏览器中打开：</div><div style="text-align: left; width: 100%; -webkit-user-select: text;">${url}</div>`)
      },
      getIOU () {
        iou.getIOUDetail(this.id).then((json) => {
          this.use = json.c_memo // 借款目的
          this.borrower = json.c_borrower_name // 借款人姓名
          this.borrowerTel = json.c_borrower_tel // 借款人手机号
          this.borrowerId = json.c_borrower_id_card // 借款人身份证号
          this.lender = json.c_lender_name // 出借人姓名
          this.lenderTel = json.c_lender_tel // 出借人手机号
          this.lenderId = json.c_lender_id_card // 出借人身份证号
          if (json.c_guarantee_name) {
            this.guarantee = json.c_guarantee_name // 担保人姓名
            this.guaranteeTel = json.c_guarantee_tel // 担保人手机号
            this.guaranteeId = json.c_guarantee_id_card // 担保人身份证号
          }
          this.id = json.id // 借条id
          this.startDate = json.t_borrow_tm // 借款时间
          this.endDate = json.t_repay_tm // 预期还款时间
          this.crtDate = json.t_crt_tm // 签订时间
          this.money = json.n_amt // 还款金额
          this.totalMoney = json.n_total_amt // 还款金额
          this.yearlyRate = json.n_interest_rate // 年利率
          this.serviceFee = json.n_service_amt // 服务费用
          this.guarantorAmt = (json.n_guarantee_amt || 0).toFixed(2) // 担保费用
          this.payWay = this.getPayWay(json.n_repay_type) // 还款方式
          this.addText = json.c_memo // 补充说明
          this.picUrls = json.l_pic
          this.onLine = json.b_online
        })
      },
      getPayWay (e) {
        if (e === 1) {
          return '等额本息'
        }
        return '到期还本付息'
      },
      // 将输入的数字金额转换成对应的中文大写金额
      // num输入的数字金额，chn
      digitUppercase (num) {
        const fraction = ['角', '分']
        const digit = [
          '零', '壹', '贰', '叁', '肆',
          '伍', '陆', '柒', '捌', '玖'
        ]
        const unit = [
          ['元', '万', '亿'],
          ['', '拾', '佰', '仟']
        ]
        let s = ''
        for (let i = 0; i < fraction.length; i += 1) {
          s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] +
          fraction[i]).replace(/零./, '')
        }

        s = s || '整'
        let n = Math.floor(num)
        for (let i = 0; i < unit[0].length && n > 0; i += 1) {
          let p = ''
          for (let j = 0; j < unit[1].length && n > 0; j += 1) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '')
              .replace(/^$/, '零') + unit[0][i] + s
        }
        return s.replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      }
    },
    created () {
    },
    attached () {
    },
    route: {
      data ({ to: { params: { iouId } } }) {
        this.id = iouId
        if (this.id !== '0') {
          this.getIOU()
        }
        return false
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  @import "../../scss/const";

  .user {
    line-height: 25px;
    font-weight: 700;
  }

  div {
    font-size: $TIP_FONT_SIZE;
    line-height: 20px;
    padding: 0 5px;
    background-color: white;
    text-indent: 2em;
  }

  h3 {
    padding: 0 5px;
  }

  h4 {
    margin: 10px 0;
    padding-left: 5px;
  }

  .title {
    font-size: $LARGE_FONT_SIZE;
    text-align: center;
    padding: 10px 0;
    margin: 0;
  }

  table {
    width: 100%;
    padding: 0 10px 10px 10px;
    border-collapse: collapse;
    tr {
      td {
        text-align: center;
        min-width: 100px;
      }
    }
  }

  table, tr, td {
    border: 1px solid $BORDER_COLOR;
  }

  .no-last::after {
    display: none !important;
  }
</style>
