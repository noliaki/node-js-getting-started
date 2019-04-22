<template>
  <div>
    <h2>{{ result.pageUrl }}</h2>
    <div>
      <div style="display:flex;" v-for="(meta, index) in result.meta" :key="'meta-' + index">
        <div v-for="(val, key) in meta" :key="key">{{ key }}: {{ val }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  }
}
</script>
