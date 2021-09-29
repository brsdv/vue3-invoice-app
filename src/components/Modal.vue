<template>
    <div class="modal flex">
        <div class="modal-content">
            <p>Are you sure you want to exit? Your changes will not be save?</p>
            <div class="actions flex">
                <button class="purple" @click="closeModal">Return</button>
                <button class="red" @click="closeInvoice">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
    name: 'modal',
    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
        closeModal () {
            this.TOGGLE_MODAL()
        },
        closeInvoice () {
            this.TOGGLE_MODAL()
            this.TOGGLE_INVOICE()

            if (this.editInvoice) this.TOGGLE_EDIT_INVOICE()
        }
    },
    computed: {
        ...mapState(['editInvoice']),
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    z-index: 100;

    &-content {
        max-width: 450px;
        color: #fff;
        background-color: #252945;
        border-radius: 20px;
        padding: 48px 32px;

        p {
            text-align: center;
        }

        .actions {
            margin-top: 24px;

            button {
                flex: 1;
            }
        }
    }
}
</style>
