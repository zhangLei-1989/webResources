<template>
  <div>
    <h2 class="title">保证担保合同</h2>
    <div v-if="id !== '0'">编号：{{id}}</div>
    <group>
      <table>
        <tr>
          <td>保证人：</td>
          <td v-if="id !== '0'">{{money}}元({{digitUppercase(money)}})</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>身份证号码：</td>
          <td>{{startDate}}</td>
        </tr>
        <tr>
          <td>住所：</td>
          <td>{{endDate}}</td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td v-if="id !== '0'">{{yearlyRate}}%</td>
          <td v-else></td>
        </tr>
      </table>
    </group>
    <group>
      <table>
        <tr>
          <td>债权人：</td>
          <td v-if="id !== '0'">{{money}}元({{digitUppercase(money)}})</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>身份证号码：</td>
          <td>{{startDate}}</td>
        </tr>
        <tr>
          <td>住所：</td>
          <td>{{endDate}}</td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td v-if="id !== '0'">{{yearlyRate}}%</td>
          <td v-else></td>
        </tr>
      </table>
    </group>
    <group>
      <table>
        <tr>
          <td>债务人（借款人）：</td>
          <td v-if="id !== '0'">{{money}}元({{digitUppercase(money)}})</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>身份证号码：</td>
          <td>{{startDate}}</td>
        </tr>
        <tr>
          <td>住所：</td>
          <td>{{endDate}}</td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td v-if="id !== '0'">{{yearlyRate}}%</td>
          <td v-else></td>
        </tr>
      </table>
    </group>
    <group>
      <table>
        <tr>
          <td>“今借到”平台运营管理人：</td>
          <td>北京人人信科技有限公司（下简称“人人信”）</td>
        </tr>
        <tr>
          <td>住所：</td>
          <td>{{endDate}}</td>
        </tr>
        <tr>
          <td>联系方式：</td>
          <td v-if="id !== '0'">{{yearlyRate}}%</td>
          <td v-else></td>
        </tr>
      </table>
    </group>
    <div>
      为担保本合同第一条所述“主合同”项下债务的履行，保证人愿意向债权人提供保证，债权人、保证人、借款人经平等协商订立本合同。除本合同另有约定外，本合同的词语解释依据主合同确定，具体条款如下：
    </div>
    <h3>一、合同属性</h3>
    <div>1、本合同为下述条款所称的主合同的从合同，除非主合同当事人双方债权债务关系自然终止之外，本合同具有其独立性，因主合同借款人过错导致主合同无效、或因保证人过错导致本合同无效的，均不免除保证人的保证责任；
    </div>
    <div>2、本合同之主合同为债权人<span>{{}}</span>（主合同之出借人，下称债权人）与债务人(主合同之借款人，下称债务人）于<span>{{}}</span>签订的<span v-if="id !== '0'">编号为{{id}}的</span>《借款协议》。
    </div>
    <section>
      <h3>二、主债权范围</h3>
      <div>
        主合同项下发生的债权构成本合同之主债权，包括但不限于：1、应向出借人支付的借款本金、利息、罚息、违约金、赔偿金、实现债权的费用（包括但不限于诉讼费用、律师费用、公证费用、执行费用等）以及因债务人违约而给本合同债权人造成的损失和其他所有应付费用。2、应向人人信支付的服务费、交易手续费、线上还款手续费、逾期管理费、违约金、赔偿金、实现债权的费用（包括但不限于诉讼费用、律师费用、公证费用、执行费用等）以及因债务人违约而给今借到平台运营商造成的损失和其他所有应付费用。
      </div>
    </section>
    <section>
      <h3>三、保证方式</h3>
      <div>
        本合同的保证方式为下列第A项：
      </div>
      <div>
        A、连带责任保证；
      </div>
      <div>
        B、一般责任保证；
      </div>
    </section>
    <section>
      <h3>四、保证期间</h3>
      <div>
        本合同的保证期间为借款成功之日，至借款人清偿完毕借款协议项下的包括但不限于本合同第二条约定范围内的所有应付款项。
      </div>
    </section>
    <section>
      <h3>五、保证责任的发生</h3>
      <div>
        凡借款人出现以下情形，债权人及人人信可要求保证人承担保证责任：
      </div>
      <div>
        1、借款人未按照约定向债权人偿本付息的；
      </div>
      <div>
        2、主债务在本合同之外同时存在其他担保人提供的物保或其他保证人提供保证的，债权人有任意选择承担担保责任的对象，本合同保证人不得以先向其他担保人主张权利为由进行抗辩。
      </div>
      <div>
        3、本合同不受保证人财力变化的影响；不受借款人与任何单位签订任何协议或文件的影响；不因借款人无力清偿借款的影响；不因借款人放弃权利不履行义务或违约而有所改变。本合同不因主合同无效而无效，除非主合同无效系债权人的过错所致。
      </div>
    </section>
    <section>
      <h3>六、承担担保责任的方式</h3>
      <div>
        1、借款人未按借款协议的约定按时、足额偿还借款本金和利息时，今借到平台会向担保人推送消息，告知借款逾期的事实同时限期担保人代替还款。担保人未能按通知要求代替还款，会对其信用记录造成影响。还款日不受法定假日或公休日的影响，还款日前必须还款。
      </div>
      <div>
        2、担保人在此不可撤销地授权：如其未能承担担保责任按要求代替还款，人人信指定的第三方支付机构可随时将担保人支付账户的资金划转至出借人支付账户（经丙方转付），前述划转金额以本协议项下的主债权金额为限。出借人与借款人一致同意，自本协议生效之日起，出借人不得免除本协议项下担保人的部分或全部责任。
      </div>
    </section>
    <section>
      <h3>七、保证债务的诉讼时效</h3>
      <div>
        1、连带责任保证情形下，若主债权未受清偿，债权人在本合同约定的保证期间内要求保证人承担保证责任的，从债权人要求保证人承担保证责任之日起，保证债务开始起算并适用诉讼时效；
      </div>
      <div>
        2、一般责任保证情形下，若主债权未受清偿，债权人在本合同约定的保证期间内对借款人提起诉讼或仲裁的，从该诉讼或仲裁发生法律效力之日起，保证债务开始起算并适用诉讼时效；
      </div>
    </section>
    <section>
      <h3>八、保证责任的范围限制及加重</h3>
      <div>
        1、主合同双方解除主合同或同意主合同提前到期的，保证人对于主合同项下已发生的债权总额承担保证责任；
      </div>
      <div>
        2、主合同双方协议变更主合同的，除涉及币种、利率、金额、期限或其他变更导致增加主债权金额或延展主合同履行期限的之外，无需征得保证人同意，保证人应对变更后的主合同承担保证责任；
      </div>
      <div>
        3、在前款需征得保证人同意的情形下，若未征得保证人书面同意，或保证人拒绝的，保证人对增加部分的主债权不承担保证责任，延展主合同履行期限的，则保证期间视为原定期间。
      </div>
    </section>
    <section>
      <h3>九、保证人声明及承诺</h3>
      <div>
        1、保证人依法具备签订和履行本合同所需的完全民事行为能力及权利能力；
      </div>
      <div>
        2、保证人完全了解主合同的内容，签署和履行本合同系基于保证人的真实意思表示；
      </div>
      <div>
        3、保证人向债权人提供的所有文件和资料都是准确、真实、完整及有效的；
      </div>
      <div>
        4、保证人接受债权人对保证人财务状况的监督和检查，并给予协助和配合；
      </div>
      <div>
        5、保证人未向债权人隐瞒截止本合同签订日已经承担的重大负债；
      </div>
      <div>
        6、若发生可能影响保证人财务状况和履约能力的情况，包括但不限于涉入重大诉讼或仲裁案件，保证人应当及时通知债权人。
      </div>
    </section>
    <section>
      <h3>十、保证人的违约情形</h3>
      <div>
        凡出现以下情况之一的，即构成保证人在本合同项下的违约：
      </div>
      <div>
        1、保证人未按本合同的约定及时履行保证责任；
      </div>
      <div>
        2、保证人在本合同中所作的声明不真实或违反其他在本合同所做的承诺；
      </div>
      <div>
        3、保证人发生本合同第八条第6款所述事件，严重影响保证人财务状况和履约能力，但未能及时告知债权人；
      </div>
      <div>
        4、保证人违反本合同中关于当事人权利义务的其他约定；
      </div>
      <div>
        凡出现上述情况之一的，债权人有权视具体情形分别或同时采取以下措施；
      </div>
      <div>
        1、要求保证人限期纠正其违约行为，及时履行保证责任；
      </div>
      <div>
        2、终止或解除本合同，全部、部分终止或解除保证人与债权人之间的其他合同；
      </div>
      <div>
        3、因保证人不善意履行本合同，债权人要求保证人赔偿因其违约而给债权人造成的损失；
      </div>
      <div>
        4、债权人依保护自身债权而认为有必须采取的其他措施
      </div>
      <div>
        以上各项约定不影响出借人对担保人采取法律允许的任何催收措施及行动的权利与救济。出借人有权根据法律法规及本协议的约定向担保人进行催收。
      </div>
    </section>
    <section>
      <h3>十一、权利保留</h3>
      <div>
        一方若未行使本合同项下部分或全部权利，或未要求另一方履行、承担或全部义务、责任，并不构成该方对该权利的放弃或对该义务、责任的豁免。
      </div>
      <div>
        一方对另一方的任何宽容、展期或延缓行使本合同项下的权利，均不影响其根据本合同及法律法规而享有的任何权利，亦不视为其对该权利的放弃。
      </div>
    </section>
    <section>
      <h3>十二、费用</h3>
      <div>
        除保证人对借款人根据主合同产生的债务承担连带责任外，因本合同订立、履行及争议解决所发生的费用（包括但不限于律师费、执行费等）由保证人承担。
      </div>
    </section>
    <section>
      <h3>十三、合同变更与解除</h3>
      <div>
        1、本合同经各方书面同意可以修改、补充或解除。本合同的任何修改和补充均构成本合同不可分割的一部分；
      </div>
      <div>
        2、本合同的任何条款的无效均不影响其他条款的效力。
      </div>
    </section>
    <section>
      <h3>十四、法律适用、争议解决及司法管辖</h3>
      <div>
        1、本合同适用中华人民共和国法律。
      </div>
      <div>
        2、因履行本合同所发生的或与本合同有关的一切争议、纠纷，双双应协商解决。协商不成的，各方同意按主合同的约定执行。
      </div>
    </section>
    <section>
      <h3>十五、合同生效</h3>
      <div>
        本合同经各方通过丙方今借到平台以网络在线点击确认的方式签订，各方点击确认后本合同生效。各方委托今借到平台保管所有与本协议有关的书面文件或电子信息，且认可“今借到”平台在未来发生的相关纠纷中向有关裁判机构提交该等文件信息的权利和证明争议事实的效力。
      </div>
    </section>

    <div><br>签订日期：{{crtDate}}<br><br><br></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import iou from 'api/iou'

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
        lender: '',
        lenderTel: '',
        money: '',
        guarantorRate: '',
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
      getIOU () {
        iou.getIOUDetail(this.id).then((json) => {
          this.use = json.c_purpose // 借款目的
          this.borrower = json.c_borrower_name // 借款人姓名
          this.borrowerTel = json.c_borrower_tel // 借款人手机号
          this.lender = json.c_lender_name // 出借人姓名
          this.lenderTel = json.c_lender_tel // 出借人手机号
          this.id = json.id // 借条id
          this.startDate = json.t_borrow_tm // 借款时间
          this.endDate = json.t_repay_tm // 预期还款时间
          this.crtDate = json.t_crt_tm // 签订时间
          this.money = json.n_amt // 还款金额
          this.totalMoney = json.n_total_amt // 还款金额
          this.yearlyRate = json.n_interest_rate // 年利率
          this.serviceFee = json.n_service_amt // 服务费用
          this.guarantorRate = json.n_guarantee_amt // 担保费用
          this.payWay = json.n_repay_type // 还款方式
          this.addText = json.c_memo // 补充说明
          this.picUrls = json.l_pic
          this.onLine = json.b_online
        })
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

  .group:last-child::after, .group.last::after {
    height: 10px !important;
  }

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
      :first-child {
        text-align: left;
      }
      td {
        text-align: center;
        width: 100px;
      }
    }
  }

  table, tr, td {
    border: 1px solid $BORDER_COLOR;
  }
</style>
