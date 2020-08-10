<template> 
  <menu-detail :is-edit='false'></menu-detail>
</template>
<script>
  import MenuDetail from './category'
  export default {
    name: 'addMenu',
    components: { MenuDetail }
  }
</script>
<style>
</style>


