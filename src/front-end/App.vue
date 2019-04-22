<template>
  <div>
    <textarea cols="30" rows="10" v-model="inputText"></textarea>
    <button type="button" @click.prevent="onClick">解析</button>

    <div v-if="results.length">
      <h1>Result</h1>
      <result v-for="(result, index) in results" :result="result" :key="index"></result>
    </div>
  </div>
</template>
<script>
import result from './Result'

export default {
  components: {
    result
  },
  data() {
    return {
      inputText: '',
      results: []
    }
  },
  computed: {
    urls() {
      return this.inputText
        .replace(/\r\n/gm, '\n')
        .replace(/\r/gm, '\n')
        .split(/\n/)
        .filter(url => url)
    }
  },
  methods: {
    onClick() {
      fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({
          urls: this.urls
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.results = json
        })
    }
  }
}
</script>
