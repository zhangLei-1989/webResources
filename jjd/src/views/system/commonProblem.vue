<template>
  <div>
    <accordion :min="false"
               :text="'关于借款'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'如何在今借到借款?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div style="text-indent: 0em;">根据不同场景，我们为您提供了以下3种借款方式：</div>
          <div class="title">1、补借条</div>
          <div>对于已经发生的借款，点击首页下方【补借条】，选择您的出借人/借款人身份，输
               入借款金额、借款日期、还款日期、年化利率，注明借款用途及对方姓名，然后发送给对方，对方在3天内确认即可生成电子借条；
          </div>
          <div class="title">2、求借款</div>
          <div>
            对于尚未发生的借款，点击首页下方【求借款】，输入借款金额、还款方式、还款日期/分期次数、年化利率、服务费、是否需要担保人及担保费率，注明借款用途以及是否公开求借款，即可成功发布，您指定的平台好友即可在首页的【正在借款】里看到您的借款信息，筹款时间最长持续3天，此外，您还可以主动邀请平台外好
            友作担保/出借，以提⾼效率；
          </div>
          <div class="title">3、申请借款</div>
          <div>
            您还可以向专业放贷人⼠申请固定的出借，点击首页的【正在出借】，比较并选择您适合的出借，查看详情，点击【马上申请】，输入借款金额、还款日期/分期次数、借款用途，并完善出借人要求的信用资料，即可提交申请，出借人会在3天内做出反馈；
          </div>
        </div>
      </accordion>
      <accordion :text="'借款有什么限制?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div class="title">借款额度</div>
          <div>单笔金额不超过20万元，个人在平台的借款余额不超过20万元；</div>
          <div class="title">借款次数</div>
          <div>同一时间段内，只能发起一个求借款；可以申请多个出借，但是一个出借通过申请后，其它订单自动关闭；补借条不限制次数；</div>
          <div class="title">费用情况</div>
          <!--表格 todos-->
          <div>利息=借款金额*(0%-24%)，由发起方决定；</div>
          <div>担保费=担保金额*(0%-10%)，由发起方决定；</div>
          <div>服务费=借款金额*（0%/5%/10%/12%），最低服务费不超过借款金额的12%，由借款人承担，在款项到账后平台直接扣除；</div>
          <!--<div>-->
          <!--服务费计算规则:-->
          <!--<table>-->
          <!--<tr>-->
          <!--<td>芝麻分</td>-->
          <!--<td><600</td>-->
          <!--<td>600~650</td>-->
          <!--<td>651~700</td>-->
          <!--<td>701~750</td>-->
          <!--<td>>750</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td><7天</td>-->
          <!--<td>1%(30元起)</td>-->
          <!--<td>0.9%(28)</td>-->
          <!--<td>0.8%(26)</td>-->
          <!--<td>0.9%(24)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>7~14天</td>-->
          <!--<td>1.5%(60)</td>-->
          <!--<td>1.3%(56)</td>-->
          <!--<td>1.1%(52)</td>-->
          <!--<td>0.9%(48)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>15~30天</td>-->
          <!--<td>2%(100)</td>-->
          <!--<td>1.8%(90)</td>-->
          <!--<td>1.6%(80)</td>-->
          <!--<td>1.4%(70)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>31~90天</td>-->
          <!--<td>6%(100)</td>-->
          <!--<td>5.4%(90)</td>-->
          <!--<td>4.8%(80)</td>-->
          <!--<td>4.2%(70)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>91~180天</td>-->
          <!--<td>8%(100)</td>-->
          <!--<td>7.2%(90)</td>-->
          <!--<td>6.4%(80)</td>-->
          <!--<td>5.6%(70)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>>180天</td>-->
          <!--<td>12%(100)</td>-->
          <!--<td>11%(90)</td>-->
          <!--<td>10%(80)</td>-->
          <!--<td>9%(70)</td>-->
          <!--<td>0</td>-->
          <!--</tr>-->
          <!--</table>-->
          <!--</div>-->
          <div>手续费=借款金额*1%，由借款人承担，在款项到账后平台直接扣除；</div>
          <div class="title">借款时长</div>
          <div>借款时长最长为1年，分期次数有3/6/12三种选择；</div>
          <div class="title">还款方式</div>
          <div>求借款和去出借支持到期还本付息和等额本息两种，补借条仅支持到期还本付息；</div>
        </div>
      </accordion>
      <accordion :text="'如何提⾼借款速度？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、适当提高年化利率/担保费，彰显诚意；</div>
          <div>2、借款用途中提供有说服力的理由和证据；</div>
          <div>3、对于求借款，发送⼆维码，主动邀请平台外好友作担保/出借；</div>
          <div>4、完善自己的信用报告，提升信用值；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'关于出借'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'如何在今借到出借?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div style="text-indent: 0em;">根据不同场景，我们为您提供了以下3种出借方式：</div>
          <div class="title">1、去出借</div>
          <div>点击首页下方【去出借】-【添加出借】，输入借款金额范围、借款时 长范围、还款方式、年化利率、服务费率及最低额度，选择借款人必填的
               信用资料，添加补充说明，即可发布成功，您的好友可以在首页的【正在出借】里看到您的出借，此外，您还可以主动分享出借给平台外的客户；
          </div>
          <div class="title">2、求借款-借给TA</div>
          <div>点击首页的【正在借款】，比较并选择适合您的借款标的，查看详情，点击【借给TA】，选择担保人，输入借款金额，即可使用钱包余额/银行卡支付；</div>
          <div class="title">3、补借条</div>
          <div>对于已经发生的借款，点击首页下方【补借条】，选择您的出借人/借款人
               身份，输入借款金额、借款日期、还款日期、年化利率，注明借款用途及对方姓名，然后发送给对方，对方在3天内确认即可生成电子借条；
          </div>
        </div>
      </accordion>
      <accordion :text="'出借有什么限制？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div class="title">出借额度</div>
          <div>单笔金额不超过20万元；</div>
          <div class="title">出借次数</div>
          <div>无上限；</div>
          <div class="title">费用情况</div>
          <div>年化利率=借款金额*(0%-24%)，由发起方决定；</div>
          <div>服务费=借款金额*（0%/5%/10%/12%），最低服务费不超过借款金额的12%，由借款人承担，在款项到账后平台直接扣除；</div>
          <!--<div>表格todos+由借款人承担，在款项到账后平台直接扣除；</div>-->
          <div class="title">借款时长</div>
          <div>借款时长最长为1年，分期次数有3/6/12三种选择，补借条支持的最早借款时间为2000年1月1号；</div>
          <div class="title">还款方式</div>
          <div>求借款和去出借支持到期还本付息和等额本息两种，补借条仅支持到期还本付息；</div>
        </div>
      </accordion>
      <!--<accordion :text="'有什么方法可以帮助我获客？'"-->
      <!--:img-show="false"-->
      <!--:show-ele="false">-->
      <!--<div class="content">-->
      <!--<div>1、今借到为您提供了专业的宣传素材，包括个人名⽚、桌贴、店铺挂牌等，点击首页下方的【去出借】-【下载素材】，即可免费下载使 用；</div>-->
      <!--<div>2、您还可以分享产品到各类平台，规范清晰的产品格式可以帮助您建立良好的出借人形象，提⾼客户转化率；</div>-->
      <!--<div>3、完成信用认证，专业的信用报告可以帮助您快速获得客户的信任；</div>-->
      <!--</div>-->
      <!--</accordion>-->
      <accordion :text="'如何保证我的客户不流失？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、今借到用户只能看到好友的正在借款和出借，这就可以保证您的客户的借款信息不会被公开到全平台，导致客户流失；</div>
          <div>2、只需关注微信公众号，无需下载，用户操作简单；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'关于担保'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'如何在今借到作担保?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>点击首页的【正在借款】，比较并选择适合您的担保标的，查看详情，点击【作担保】，输入担保金额即可，出借人选择您作担保人后生成借条才算真正担保成功；</div>
        </div>
      </accordion>
      <accordion :text="'担保有什么限制？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div class="title">担保条件</div>
          <div>担保人待还金额为0时才可以作担保；</div>
          <div class="title">担保额度</div>
          <div>20万</div>
          <div class="title">担保次数</div>
          <div>无上限；</div>
          <div class="title">费用情况</div>
          <div>担保费=担保金额*（0%-10%），由借款 人决定，于出借人支付成功后直接转到担保人平台账户；</div>
        </div>
      </accordion>
      <accordion :text="'担保人有什么义务？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、扩散借款信息，帮找出借人；</div>
          <div>2、借款人逾期还款时，替借款人还款；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'电子合同'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'电子合同有法律效⼒吗？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>今借到的电子合同是受法律保护的，我国《合同法》及电子签名法》认可了电子合同的有效性。</div>
          <div>《合同法》第⼗条、⼗⼀条规定：“当事人订立合同，有
               书面形式、口头形式和其他形式。书面形式是指合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等可以有形地表现所载内容的形式。”根据《电子签名法》第四、五、六条的规定：“能够
               有形地表现所载内容，并可以随时调取查用的数据电文，视为符合法律、法规要求的书面形式。”
          </div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'充值&提现'"
               :img-show="false"
               :show-ele="fromToCash">
      <accordion :text="'如何充值，有手续费吗？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>点击首页的【钱包余额】-【充值】，输入金额，验证交易密码即可，充值金额即刻可用；</div>
          <div>充值手续费=2.5元/笔（500以上不收费）。</div>
        </div>
      </accordion>
      <accordion :text="'提现的规则是什么？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>在平台储备金范围内，支持所有人任何时间立即提现；</div>
          <div>储备金会及时调整增加额度，不过如果提现金额暴增也存在小概率的额度不足不能当日提现的可能，一旦发生这种情况请您耐心等待到第二个工作日中午12:00后正常提现。</div>
        </div>
      </accordion>
      <accordion :text="'提现手续费如何计算？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>注：由于平台的对账时间是第二个工作日的中午12点，对账之后才可以进行提现，所以各处提到的第二个工作日正常提现实际指的是第二个工作日的12点以后才算作正常提现，没有特别手续费。</div>
          <div>1、基础提现费：1元/笔</div>
          <div>2、特别提现费：早于第二个工作日中午12:00提现的部分，提前一天提现收取提现金额的2‰，提前两天收取提现金额的3‰，以此类推...</div>
        </div>
        <div class="content case">
          <div>案例：</div>
          <div>假如今天是星期四，小李借到1000块，如果小李明天(本周五)提现，免特别提现费只需要扣除基础手续费1元，如果今天就提现，需要扣除手续费1+1000*2‰=3元；</div>
          <div>
            假如今天是星期五，小李借到1000块，如果小李下周一中午12:00后提现，免特别提现费只需要扣除基础手续费1元，如果小李后天(本周日)提现，需要扣除手续费1+1000*2‰=3元，如果明天(本周六)提现，需要扣除手续费1+1000*3‰=4元，如果今天就提现，那么要扣除手续费1+1000*4‰=5元。
          </div>
        </div>
      </accordion>
      <accordion :text="'提现顺序是什么？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>无特别提现费的部分 > 有特别提现费的部分</div>
        </div>
      </accordion>
      <accordion :text="'手续费如何收取？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>由平台直接扣除，剩余金额转入您的收款银行账户</div>
        </div>
      </accordion>
      <accordion :text="'提现金额什么时候可以到收款银行账户？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>提现操作完成后，及时到账</div>
        </div>
      </accordion>
      <!--<accordion :text="'可提现金额为什么⼩于钱包余额？'" :img-show="false" :show-ele="false">-->
      <!--<div class="content">-->
      <!--<div>1、您有部分钱款还处于在途态，到账金额在第二个工作日的上午9点后可以提现（周五到账的金额下周一才可以提现）；</div>-->
      <!--<div>2、您的收款账户有限额要求；</div>-->
      <!--<div class="title">各类款项的可提现时长：</div>-->
      <!--<div>借款金额 T+1</div>-->
      <!--<div>出借人奖励 T+7</div>-->
      <!--<div>担保费 T+1</div>-->
      <!--<div>还款 T+1</div>-->
      <!--</div>-->
      <!--</accordion>-->
      <accordion :text="'银行卡有支付限额吗？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div></div>
          <table>
            <thead>
            <td>银行名称</td>
            <td>单笔充值限额<br>(万元)</td>
            <td>单日限额<br>(万元)</td>
            <td>单月限额<br>(万元)</td>
            </thead>
            <tr>
              <td>北京银行</td>
              <td>0.5</td>
              <td>0.5</td>
              <td>50</td>
            </tr>
            <!--招商银行暂时下线-->
            <tr>
              <td>招商银行</td>
              <td>5</td>
              <td>5</td>
              <td>10</td>
            </tr>
            <tr>
              <td>工商银行</td>
              <td>5</td>
              <td>11</td>
              <td>50</td>
            </tr>
            <tr>
              <td>光大银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>广发银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>建设银行</td>
              <td>5</td>
              <td>21.5</td>
              <td>21.5</td>
            </tr>
            <tr>
              <td>民生银行</td>
              <td>5</td>
              <td>41</td>
              <td>50</td>
            </tr>
            <tr>
              <td>农业银行</td>
              <td>5</td>
              <td>41</td>
              <td>50</td>
            </tr>
            <tr>
              <td>交通银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>平安银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>浦发银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>上海银行</td>
              <td>0.5</td>
              <td>5</td>
              <td>50</td>
            </tr>
            <tr>
              <td>兴业银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>华夏银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>邮储银行</td>
              <td>0.5</td>
              <td>0.5</td>
              <td>50</td>
            </tr>
            <tr>
              <td>中国银行</td>
              <td>5</td>
              <td>50</td>
              <td>50</td>
            </tr>
            <!--<tr>-->
            <!--<td>长江商业银行</td>-->
            <!--<td>200000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>武汉农商银行</td>-->
            <!--<td>200000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>黑龙江农信社</td>-->
            <!--<td>200000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>重庆农商行</td>-->
            <!--<td>200000</td>-->
            <!--<td>500000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>太仓农商行</td>-->
            <!--<td>50000</td>-->
            <!--<td>50000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>山东农信银行</td>-->
            <!--<td>200000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
            <tr>
              <td>中信银行</td>
              <td>2</td>
              <td>5</td>
              <td>50</td>
            </tr>
            <!--<tr>-->
            <!--<td>甘肃农信社</td>-->
            <!--<td>50000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>江南农商银行</td>-->
            <!--<td>100000</td>-->
            <!--<td>100000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>农博</td>-->
            <!--<td>200000</td>-->
            <!--<td>500000</td>-->
            <!--</tr>-->
            <!--<tr>-->
            <!--<td>吉林农信社</td>-->
            <!--<td>200000</td>-->
            <!--<td>1000000</td>-->
            <!--</tr>-->
          </table>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'收还款&逾期风险提示'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'如何还款，可以批量/部分/提前还款吗？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>点击首页上方的【待还金额】，选择要还款的账单，点击【马上还款】，进⾏支付即可；</div>
          <div>其中，补借条产生的账单，可以选择线上/线下还 款，求借款和去出借产生的账单只能通过线上还款；</div>
          <div>平台支持批量还款，但是批量还款必须全额支付，且只要有仅能线上还款的账单必须线上支付；</div>
          <div>平台支持单个账单部分还款，即⼀个账单可分多次还款；</div>
          <div>平台支持提前还款，但是利息仍按整期计算，不会减少；</div>
          <div>补借条线上还款收取还款手续费（还款金额*5‰）；</div>
        </div>
      </accordion>
      <accordion :text="'什么是线上/线下还款？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>线上指的是平台内通过钱包余额或绑定的银行卡支付；</div>
          <div>线下指的是在平台外通过现金/支付宝/微信/银行卡转账等途径支付；</div>
          <div>线下支付需要对方确认收到款才生效；</div>
        </div>
      </accordion>
      <accordion :text="'逾期后平台如何处理？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>平台仅对于通过今借到线上交易产生的借条，提供逾期催收服务：</div>
          <div class="title">逾期第1天</div>
          <div>
            开始推送微信消息提醒借款人和担保人还款，并上传⾄本平台逾期记录中⼼，所有注册用户可查，以待还本息为基数，每日按年化利率24%计收罚息，按((逾期本息+罚息)*0.1%/天)计收基础逾期管理费;
          </div>
          <div class="title">逾期第16天</div>
          <div>开始向借款人和担保人及其好友进⾏短信催收，开始计收特别逾期管理费((逾期本息+罚息+基础逾 期管理费)*5%);</div>
          <div class="title">逾期第30天</div>
          <div>特别逾期管理费率上调为10%，短信通知更多好友，将借款人上传⾄平台⿊名单的开放接口，并提供诉讼支持;</div>
        </div>
      </accordion>
      <accordion :text="'逾期风险短信的发送规则是什么？'" :img-show="false" :show-ele="false">
        <div class="content">
          <div class="title">逾期第16天</div>
          <div>开始向借款人的紧急联系人发送逾期风险提示短信。</div>
          <div class="title">逾期第20天</div>
          <div>向借款人手机通讯录中通话最频繁的前10位联系人发送逾期风险提示短信。</div>
          <div class="title">逾期第25天</div>
          <div>向借款人手机通讯录中通话最频繁的前20位联系人发送逾期风险提示短信。</div>
          <div class="title">逾期第30天</div>
          <div>向借款人手机通讯录中通话最频繁的前40位联系人发送逾期风险提示短信。</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'关于出借人奖励'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'服务费奖励规则'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <!--<table>-->
          <!--<thead>-->
          <!--<td>奖励标准梯度</td>-->
          <!--<td>本周成交总单数</td>-->
          <!--<td>本周收取服务费总额</td>-->
          <!--<td>奖励占本周收取服务费总额的比例</td>-->
          <!--</thead>-->
          <!--<tr>-->
          <!--<td>1</td>-->
          <!--<td>0 - 7</td>-->
          <!--<td>> 0</td>-->
          <!--<td>80%</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>2</td>-->
          <!--<td>> 7</td>-->
          <!--<td>5000元 - 2.5万元</td>-->
          <!--<td>85%</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>3</td>-->
          <!--<td>> 14</td>-->
          <!--<td>2.5万元 - 5万元</td>-->
          <!--<td>90%</td>-->
          <!--</tr>-->
          <!--<tr>-->
          <!--<td>4</td>-->
          <!--<td>>21</td>-->
          <!--<td>> 5万元</td>-->
          <!--<td>95%</td>-->
          <!--</tr>-->
          <!--</table>-->
          <!--<div>周一至周七为一个统计单位，奖励在统计结束后的7个工作日内发送至出借人在平台的账户中</div>-->
          <img :src="serviceFee"
               class="service-fee">
        </div>
      </accordion>
      <accordion :text="'逾期管理费奖励规则'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          一旦借款人全额还款，平台将收到的逾期管理费90%奖励给出借人。
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'信用认证'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'信用报告有什么作用？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、所有用户必须实名认证，保证电子合同的有效性；</div>
          <div>2、对于出借人而言，报告提供了详尽的个人信用信息，可以帮助风控，降低风险；</div>
          <div>3、对于借款人而言，信用报告可以帮助有效筛选优质出借人，完善自⼰的信用报告也可以大大提⾼借款效率；</div>
        </div>
      </accordion>
      <accordion :text="'信用报告都包含什么信息？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div class="title">信用报告目前包含三层信息：</div>
          <div>1、实名认证：绑卡；</div>
          <div>2、必填信息：基础信息(微信号、居住地址、紧急联系人)、授权运营商、授权京东；</div>
          <div>3、选填信息：学信网、央⾏征信报告、工作信息、收入证明、车产、房产；</div>
        </div>
      </accordion>
      <accordion :text="'如何保障用户隐私？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、信用报告里有关本人的身份证号、居住地址、好友姓名和联系方式等敏感信息，平台都做了脱敏处理，非本人不能看到完整信息；除非逾期，出借人可以看到借款人紧急联系人的完整手机号码；</div>
          <div>2、平台收集您的信息是出于遵守国家法律法规的规定以及向您提供服务及提升服务质量的，我们对您的个人信息承担保密义务，不会为满足第三方的营销⽽向其出售或出租您的任何信息；</div>
        </div>
      </accordion>
      <accordion :text="'信用认证的付费规则是什么？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1.信用认证费：9.90元/次，用于更新信用报告时，支付给第三方数据公司，一次认证有效期为30天，超过30天需重新认证，只有信用认证过后才可以正确使用求借款/补借条/申请借款/去借出等功能。</div>
          <div>2.若在认证过程中，支付没有成功，建议重新支付。如果上次已经扣款成功，平台会在第二个工作日将您多支付的款项存入您的账户余额中。</div>
          <div>3.若在有效期内，由于各种原因需要重新认证生成信用报告，则需要再次支付认证费用。</div>
          <div>4.为了不影响您对产品功能的使用，建议您的重要信息发生变化后尽快进行重新认证更新信用报告</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'诈骗&举报'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'何种情况可以举报?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>线下补借条时,出借人没有按照借条规定全额出借；</div>
        </div>
      </accordion>
      <accordion :text="'如何举报?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>通过首页的【待还金额】或点击首页左上角的菜单图标-【借入】，进入借条详情，点击屏幕下方【违规举报】，然后上传真实充足的证据以证明出借人确实没有全额出借，恶意违规即可，证据可以多次补充；
          </div>
        </div>
      </accordion>
      <accordion :text="'处理流程?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、上传真实充分的截图证据证明对方没有全额出借（如聊天文字截图、对方拉黑证据等）；</div>
          <div>2、平台推送消息给出借人，出借人有72小时反馈证据证明事实，如若超时未反馈，平台将按照出借人默认有违规操作进行处理；</div>
          <div>3、平台根据双方证据进行处理：</div>
          <div>
            a接受举报，借条置为有争议状态，借款人无需还款，不会产生逾期记录，出借人增加1条违规被举报记录，一旦被举报并受理3次，平台会拉黑该用户；
          </div>
          <div>
            b驳回举报，平台不做任何处理，双方可以继续补充证据；
          </div>
        </div>
      </accordion>
      <accordion :text="'有争议是什么意思?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>有争议仅表示本平台对该借条的成立条件持怀疑态度，这只是平台为了维护良好的秩序⽽采取的有效措施，如果您对处理结果有任何异议，仍然可以向平台或者法院申诉；</div>
          <div>有争议的借条不会产生逾期记录，不会对借款人的信用产生影响；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'手机号&验证码&交易密码'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'注册时收不到验证码怎么办?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、如果收不到短信验证码，可以尝试点击页面下方的【获取语音验证码】；</div>
          <div>2、如果语音验证码也收不到，请联系客服010-83036303，为您人工提供验证码；</div>
        </div>
      </accordion>
      <accordion :text="'换了手机号怎么办?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>点击首页左上角的菜单图标，进入【我的】，点击【设置】，可以更换手机号；</div>
        </div>
      </accordion>
      <accordion :text="'忘记交易密码怎么办?'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>点击首页左上角的菜单图标，进入【我的】，点击【设置】，可以修改交易密码；</div>
        </div>
      </accordion>
      <accordion :text="'换了微信怎么办？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>您可以在新的微信里面用之前的手机号重新注册⼀遍，会需要再绑⼀次卡，但是数据不会丢失；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'关于好友'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'如何确认平台好友关系？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>查看过对方的借款标的/借条详情/出借，就自动成为好友，可以点击首页左上角的菜单图标，进入【我的】，点击【好友】查看我的全部好友；</div>
        </div>
      </accordion>
    </accordion>
    <accordion :min="false"
               :text="'关于今济计划'"
               :img-show="false"
               :show-ele="false">
      <accordion :text="'什么是今济计划？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>今借到为践行“人人有情，人人有信”的企业理念，防止校园多头借贷的黑手再酿血腥悲剧、帮助深陷多头借贷的大学生，推出“今济计划”。<span>“今济计划”将会由今借到创始人马卫东先生出资100万元，社会各界阳光投资人出资共同设立“今济基金”。通过长期低息债权形式垫付还款、行业内共享“今济名单”进行限制性保护、并为“今济对象”们提供培训课程和工作机会等一系列方式，解救陷入多头借贷大学生们，使其重返校园正常学习生活。更多介绍详见今借到公众号历史文章</span><a @click="toJjjh">《今借到推出“今济计划”，解救深陷多头借贷的大学生！》</a>。</div>
        </div>
      </accordion>
      <accordion :text="'哪些人可以申请救助？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>1、在校大学生</div>
          <div>2、陷入多头借贷<span>（累计在5家及以上网贷平台借过款，详见申请通道）</span></div>
          <div>3、现不具备还款能力</div>
        </div>
      </accordion>
      <accordion :text="'大学生如何申请加入今济计划？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div>今济计划正式申请通道会在五一假期后的一周内开通，届时需要您完善详细的资料（银行卡、芝麻信用、学信、运营商、京东、紧急联系人、借贷信息等），入口会在今借到公众号内部。在此之前平台不会以微信、电话等方式向您索取任何资料，提醒您小心保管自己的信息。</div>
        </div>
      </accordion>
      <accordion :text="'今济计划如何实施？'"
                 :img-show="false"
                 :show-ele="false">
        <div class="content">
          <div class="title">1、今借到将协助明确合法的应还金额，并向各平台争取还款福利</div>
          <div>通过救助对象上传的详细借贷信息，帮助分析合法应还金额，并向各个网贷平台争取还款福利，尽可能降低还款压力。</div>
          <div class="title">2、今借到将救助对象加入“今济计划”名单，进行限制性保护</div>
          <div>将救助对象加入“今济计划”名单，联合行业内的网贷机构对名单进行限制性保护，在其还款完成前不允许发起新的借款。</div>
          <div class="title">3、今借到将为“今济计划”对象提供金融风险教育和职业生涯规划课程</div>
          <div>平台请专业人士进行金融风险教育和职业生涯规划的课程，帮助大学生提高风险识别能力，规划人生方向，提高还款能力。</div>
          <div class="title">4、“今济基金”以长期低息债权的形式垫付还款</div>
          <div>阳光投资人为每位匹配的救助对象垫付部分或全部欠款并生成一个相应的3年期年化收益12%的债权，到期后“今济计划”对象需要连本带息还给投资人。</div>
          <div class="title">5、“今济计划”将进一步提供更多的培训课程和工作机会</div>
          <div>“今济计划”对象要持续记录自己风控意识的增长以及接受正面引导的过程，以便大家进行监督和帮助。期间今借到会持续提供培训课程和工作机会帮助还款。</div>
        </div>
      </accordion>
    </accordion>
  </div>
</template>

<script type="text/ecmascript-6">
  import accordion from 'components/output/accordion'

  export default{
    data () {
      return {
        fromToCash: false,
        serviceFee: require('../../../static/service-fee.png')
      }
    },
    components: {
      accordion
    },
    methods: {
      toJjjh () {
        window.location.href = 'http://mp.weixin.qq.com/s/ZoiHAKYs_uDiWyK7W9HjMg'
      },
    },
    route: {
      data ({ to: { params: { from } } }) {
        if (from && from === 'cash') {
          this.fromToCash = true
          setTimeout(() => {
            document.body.scrollTop = 200
          }, 300)
        } else {
          this.fromToCash = false
        }
      }
    }
  }
</script>
<style lang="scss"
       rel="stylesheet/scss"
       scoped>
  @import '../../scss/fragment';

  .content {
    font-size: $TIP_FONT_SIZE;
    background-color: $Q_COLOR;
    padding: 10px;
    /*text-indent: 2em;*/
    span {
      font-weight: 500;
    }
  }

  .title {
    font-weight: 500;
    margin: 5px 0;
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

  .case {
    font-size: $MIN_FONT_SIZE;
    padding-top: 0;
  }

  .service-fee {
    width: 100%;
  }
</style>
