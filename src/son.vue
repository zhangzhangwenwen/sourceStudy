

<script>
export default {
    data () {
        return {
            innner: '',
        }
    },
    render: (createElement) => {
      return createElement('div', '子组件')
    },
    created() {
        console.log('son,created')
    },
    mounted () {
        console.log('son,mounted')
    }
}
</script>