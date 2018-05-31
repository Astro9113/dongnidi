/*
 * @Author: zimplexing
 * @Date: 2017-06-24 19:24:32
 * @Last Modified by: zimplexing
 * @Last Modified time: 2017-07-02 12:48:13
 */

import _ from 'lodash'

const localStroage = window.localStorage

export default {

  staticPath: 'http://statics.zhuishushenqi.com',

    /**
     *
     * @param arr
     * @returns {Array}
     * 数组去重
     */
    unique: function(arr) {
        let result = [], hash = {};
        for (let i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    },

  /**
     * 获取localstroage的数据
     * @param {String} key 获取localstroage的item
     */
  getLocalStroageData (item) {
      const gettype=Object.prototype.toString;

      if (gettype.call(JSON.parse(localStroage.getItem(item))) === "[object Array]") {
          return _.isEmpty(this.unique(JSON.parse(localStroage.getItem(item)))) ? null : this.unique(JSON.parse(localStroage.getItem(item)))
      } else {
          return _.isEmpty(JSON.parse(localStroage.getItem(item))) ? null : JSON.parse(localStroage.getItem(item))
      }
  },

  /**
     * 设置localstroage的值
     * @param {String} item
     * @param {Object} obj
     */
  setLocalStroageData (item, obj) {
    localStroage.setItem(item, JSON.stringify(obj))
  }

}
