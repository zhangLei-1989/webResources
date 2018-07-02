/**
 * Created by hq5544 on 2017/4/27.
 */
const list = [
  {
    reason: '出借⼈没有及时反馈证据',
    result: '出借⼈已被平台拉⿊，不能继续借款或出借',
    advice: '出借⼈可以继续补充证据，证明没有裸条⾏为',
    code: 1,
  }, {
    reason: '借款⼈没有提供有⼒证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实有裸条⾏为',
    code: 2,
  }, {
    reason: '出借⼈提供了有⼒证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实有裸条⾏为',
    code: 3,
  }, {
    reason: '借款⼈提供了有⼒证据',
    result: '出借⼈已被平台拉⿊，不能继续借款或出借',
    advice: '出借⼈可以继续补充证据，证明没有裸条⾏为',
    code: 4,
  }, {
    reason: '借款⼈补充的证据⽆效',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实有裸条⾏为',
    code: 5,
  }, {
    reason: '借款⼈补充了有⼒证据',
    result: '出借⼈已被平台拉⿊，不能继续借款或出借',
    advice: '出借⼈可以继续补充证据，证明没有裸条⾏为',
    code: 6,
  }, {
    reason: '出借⼈补充了有⼒证据',
    result: '驳回举报，取消出借⼈拉⿊状态',
    advice: '借款⼈可以继续补充证据，证明确实有裸条⾏为',
    code: 7,
  }, {
    reason: '出借⼈补充的证据⽆效',
    result: '不做任何处理',
    advice: '出借⼈可以继续补充证据，证明没有裸条⾏为',
    code: 8,
  }, {
    reason: '出借⼈没有及时反馈证据',
    result: '确认借款⼈相关还款并消除相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明借款⼈没有真实还款',
    code: 9,
  }, {
    reason: '借款⼈没有提供有⼒证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实已还款',
    code: 10,
  }, {
    reason: '出借⼈提供了有⼒证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实已还款',
    code: 11,
  }, {
    reason: '借款⼈提供了有⼒证据',
    result: '确认借款⼈相关还款并消除相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明借款⼈没有真实还款',
    code: 12,
  }, {
    reason: '借款⼈补充的证据⽆效',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明确实已还款',
    code: 13,
  }, {
    reason: '借款⼈补充了有⼒证据',
    result: '确认借款⼈相关还款并消除相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明借款⼈没有真实还款',
    code: 14,
  }, {
    reason: '出借⼈补充了有⼒证据',
    result: '驳回举报，恢复借款⼈还款状态和逾期记录，取消出借⼈标记和相关限制',
    advice: '借款⼈可以继续补充证据，证明确实已还款',
    code: 15,
  }, {
    reason: '出借⼈补充的证据⽆效',
    result: '不做任何处理',
    advice: '出借⼈可以继续补充证据，证明借款⼈没有真实还款',
    code: 16,
  }, {
    reason: '出借⼈没有及时反馈证据',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明确实已出借',
    code: 17,
  }, {
    reason: '借款⼈没有提供相关证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明出借⼈确实没有出借',
    code: 18,
  }, {
    reason: '出借⼈没有提供有⼒证据',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明确实已出借',
    code: 19,
  }, {
    reason: '出借⼈提供了有⼒证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明出借⼈确实没有出借',
    code: 20,
  }, {
    reason: '借款⼈提供了有⼒证据',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明确实已出借',
    code: 21,
  }, {
    reason: '借款⼈补充了有⼒证据',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明确实已出借',
    code: 22,
  }, {
    reason: '借款⼈补充的证据⽆效',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈可以继续补充证据，证明出借⼈确实没有出借',
    code: 23,
  }, {
    reason: '出借⼈补充的证据⽆效',
    result: '不做任何处理',
    advice: '出借⼈可以继续补充证据，证明确实已出借',
    code: 24,
  }, {
    reason: '出借⼈补充了有⼒证据',
    result: '驳回举报，取消借条有争议状态，恢复借款⼈相关逾期记录，取消出借⼈标记和相关限制',
    advice: '借款⼈可以继续补充证据，证明出借⼈确实没有出借',
    code: 25,
  }, {
    reason: '借款⼈没有提供有⼒的还款证据',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈还清应还⾦额后上传还款凭证',
    code: 26
  }, {
    reason: '借款⼈没有还完应还的⾦额',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈还清应还⾦额后上传还款凭证',
    code: 27
  }, {
    reason: '出借⼈没有提供有⼒证据且借款⼈已还款',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明借款⼈确实没还清应还⾦额',
    code: 28
  }, {
    reason: '借款⼈没有还完应还的⾦额',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈还清应还⾦额后上传还款凭证',
    code: 27
  }, {
    reason: '借款⼈没有还完应还的⾦额',
    result: '驳回举报，不做任何处理',
    advice: '借款⼈还清应还⾦额后上传还款凭证',
    code: 29
  }, {
    reason: '借款⼈补充了有⼒证据',
    result: '该借条变为“有争议”⽆需还款，消除借款⼈相关逾期记录，出借⼈被标记1次，标记3次不能再使⽤补借条，还有可能被拉⿊',
    advice: '出借⼈可以继续补充证据，证明借款⼈确实没还清应还⾦额',
    code: 30
  }, {
    reason: '出借⼈补充的证据⽆效',
    result: '不做任何处理',
    advice: '出借⼈可以继续补充证据，证明借款⼈确实没还清应还⾦额',
    code: 31
  }, {
    reason: '出借⼈补充了有⼒证据',
    result: '驳回举报，取消借条有争议状态，恢复借款⼈相关逾期记录，取消出借⼈标记和相关限制',
    advice: '借款⼈可以继续补充证据，证明确实已还清应还⾦额',
    code: 32
  },
]

export default list
