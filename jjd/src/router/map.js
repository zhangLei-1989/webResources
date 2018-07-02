/**
 * Created by hq5544 on 16/3/26.
 */
import borrowOrLend from './borrowOrLend'
import communication from './communication'
import creditCheck from './creditCheck'
import creditCenter from './creditCenter'
import inOut from './in&out'
import index from './index'
import IOU from './IOU'
import my from './my'
import product from './product'
import seekLoans from './seekLoans'
import settings from './settings'
import wallet from './wallet'
import system from './system'
import jjjh from './jjjh'
import newReport from './newReport'

const map = Object.assign(
  {},
  borrowOrLend,
  communication,
  creditCheck,
  creditCenter,
  inOut,
  index,
  IOU,
  my,
  product,
  seekLoans,
  settings,
  wallet,
  system,
  jjjh,
  newReport,
)

const alias = {
  '/': '/index/bid',
  '/index': '/index/bid'
}

const redirect = {
  '*': '/404'
}

export default {
  map,
  alias,
  redirect
}
