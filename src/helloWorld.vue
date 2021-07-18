<template>
    <div>{{ name }}</div>
</template>

<script>
export default {
    data () {
        return {
            name: '组件组件'
        }
    },
    props: [ 'message' ]
}


</script>