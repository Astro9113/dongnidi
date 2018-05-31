<template>
	<div>
		my home page
	</div>
</template>

<script>
import api from '@/api/api'
import util from '@/utils/util'
import { Indicator } from 'mint-ui'
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
  name: 'My',

  data () {
    return {
      searchWord: '',
      searchHotWords: null,
      autoCompleteList: [],
      searchResult: [],
      searchHistory: []
    }
  },
  computed: {
    back () {
      return this.$store.state.backPath.secPath
    }
  },
  created () {
    this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
    api.getHotWords().then(response => {
      this.searchHotWords = response.data.searchHotWords
      // 只取前15个热词
      this.searchHotWords.length = 15
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    'searchWord': function () {
      if (!this.searchWord) {
        this.autoCompleteList = []
        this.searchResult = []
        this.searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory')
					: []
      }
    }
  },
  methods: {
    autoComplete () {
      api.autoComplete(this.searchWord).then(response => {
        this.autoCompleteList = response.data.keywords
      }).catch(err => {
        console.log(err)
      })
    },
    /**
		 * 模糊搜索
		 * todo 问题： 点击热词或者搜索历史进行搜索时，自动填充输入框值后，会触发自动补全，自动补全是异步的，搜索结果也是异步的
		 * 当自动补全请求慢于搜索结果返回时，页面上会出现自动补全的列表
		 * fixed 使用input事件触发自动补全 不要监听searchWorld的变化，触发自动补全
		 */
    fuzzySearch (el) {
      Indicator.open()
      this.searchWord = el.target.innerText || this.searchWord
      // 设置搜索历史
      let searchHistory = util.getLocalStroageData('searchHistory') ? util.getLocalStroageData('searchHistory') : []
      util.setLocalStroageData('searchHistory', [this.searchWord, ...searchHistory])
      this.$store.commit(SET_BACK_POSITION, '搜索')
      api.fuzzySearch(this.searchWord).then(response => {
        this.searchResult = response.data.books
        this.autoCompleteList = []
        Indicator.close()
      }).catch(err => {
        console.log(err)
      })
    },
    clearSearchHistory () {
      util.setLocalStroageData('searchHistory', [])
      this.searchHistory = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
