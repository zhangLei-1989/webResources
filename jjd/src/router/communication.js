/**
 * Created by hq5544 on 16/7/23.
 */
import friends from '../views/communication/friends'
import chooseFriends from '../views/communication/chooseFriends'
import setRemarks from '../views/communication/setRemarks'

export default {
  // 我的好友
  '/friends': {
    num: 4,
    name: 'friends',
    title: '我的好友',
    component: friends
  },
  // 我的好友
  '/chooseFriends/:lenderId': {
    num: 5,
    name: 'chooseFriends',
    title: '好友',
    component: chooseFriends
  },
  // 设置备注
  '/setRemarks/:userId/:memo': {
    num: 6,
    name: 'setRemarks',
    title: '设置备注',
    component: setRemarks
  }
}
