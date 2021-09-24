<template>
    <header class="flex">
        <div class="branding flex">
            <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
        </div>
    </header>
</template>

<script>
export default {
    name: 'navigation',
}
</script>

<style scoped lang="scss">
header {
    flex-direction: row;
    background-color: #1e2139;
    z-index: 99;
    
    @media (min-width: 900px) {
        flex-direction: column;
        min-width: 90px;
        min-height: 100%;
        border-radius: 0 20px 20px 0;
    }

    .branding {
        justify-content: center;
        background-color: #7c5dfa;
        border-radius: 0 20px 20px 0;
        padding: 24px;

        @media (min-width: 900px) {
            width: 100%;
        }

        img {
            width: auto;
            height: 30px;
        }
    }
}
</style>
