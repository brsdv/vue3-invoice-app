<template>
    <div>
        <h2>{{ invoice.docId }}</h2>
    </div>
</template>

<script>
export default {
    name: 'invoice',
    props: {
        invoice: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="sass" scoped>
    
</style>
