<template>
    <div v-if="invoicesLoaded">
        <div v-if="!mobile" class="app flex flex-column">
            <navigation />

            <div class="app-content flex flex-column">
                <modal v-if="modalActive" />
                <transition name="invoice">
                    <invoice-modal v-if="invoiceModal" />
                </transition>
                <router-view />
            </div>
        </div>
        <div v-else class="mobile-message flex flex-column">
            <h2>Sorry, this app is not supported on Mobile devices</h2>
            <p>To use this app, please use a computer or tablet</p>
        </div>
    </div>
    <div v-else>
        <loading class="app-loading" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navigation from './components/Navigation'
import InvoiceModal from './components/InvoiceModal'
import Modal from './components/Modal'
import Loading from './components/Loading'

export default {
    components: {
        Navigation,
        InvoiceModal,
        Modal,
        Loading
    },
    data () {
        return {
            mobile: null
        }
    },
    created () {
        this.GET_INVOICES()
        this.checkScreen()
        window.addEventListener('resize', this.checkScreen)
    },
    methods: {
        ...mapActions(['GET_INVOICES']),
        checkScreen () {
            const windowWidth = window.innerWidth

            if (windowWidth <= 750) {
                this.mobile = true
                return
            }

            this.mobile = false
        }
    },
    computed: {
        ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded'])
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.app {
    min-height: 100vh;
    background-color: #141625;

    @media (min-width: 900px) {
        flex-direction: row !important;
    }

    &-content {
        position: relative;
        flex: 1;
        padding: 0 20px;
    }

    &-loading {
        width: 100%;
        min-height: 100vh;
        background-color: #141625;
    }
}

.mobile-message {
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    color: #fff;
    background-color: #141625;

    p {
        margin-top: 16px;
    }
}

// animated invoice
.invoice-enter-active,
.invoice-leave-active {
    transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
    transform: translateX(-700px);
}

button,
.button {
    cursor: pointer;
    font-size: 12px;
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 16px 24px;
    margin-right: 8px;
}

.dark-purple {
    background-color: #252945;
}

.red {
    background-color: #ec5757;
}

.purple {
    background-color: #7c5dfa;
}

.green {
    background-color: #33d69f;
}

.orange {
    background-color: #ff8f00;
}

// utility classes
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.container {
    width: 100%;
    max-width: 850px;
    padding: 40px 10px;
    margin: 0 auto;

    @media (min-width: 900px) {
        padding-top: 72px;
    }
}

.nav-link {
    text-decoration: none;
    color: initial;
}

// Status Button Styling
.status-button {
    align-items: center;
    font-size: 12px;
    border-radius: 10px;
    padding: 8px 30px;
    margin-right: 30px;

    &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }
}

.paid {
    color: #33d69f;
    background-color: rgba(51, 214, 160, 0.1);

    &::before {
        background-color: #33d69f;
    }

    &-text {
        color: #33d69f;
    }
}

.pending {
    color: #ff8f00;
    background-color: rgba(255, 145, 0, 0.1);

    &::before {
        background-color: #ff8f00;
    }

    &-text {
        color: #ff8f00;
    }
}

.draft {
    color: #dfe3fa;
    background-color: rgba(223, 227, 250, 0.1);

    &::before {
        background-color: #dfe3fa;
    }

    &-text {
        color: #dfe3fa;
        opacity: 0.5;
    }
}
</style>
