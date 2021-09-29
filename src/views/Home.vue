<template>
    <div class="home container">
        <!-- Header -->
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoices</h1>
                <span>There are {{ invoiceData.length }} total invoices</span>
            </div>
            <div class="right flex">
                <div class="filter flex" @click="toogleFilterMenu">
                    <span>
                        Filter by status
                        <span
                            v-if="filteredInvoice"
                            :class="classObject"
                        >{{ filteredInvoice }}</span>
                    </span>
                    <img src="@/assets/icon-arrow-down.svg" alt="" />
                    <ul
                        v-show="filterMenu"
                        class="filter-menu"
                        @click="filteredInvoices"
                    >
                        <li>All</li>
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                    </ul>
                </div>
                <div class="button flex" @click="newInvoice">
                    <div class="inner-button flex">
                        <img src="@/assets/icon-plus.svg" alt="" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>

        <!-- Invoices -->
        <div v-if="invoiceData.length">
            <invoice
                v-for="(invoice, index) in filteredData"
                :key="index"
                :invoice="invoice"
            />
        </div>
        <div v-else class="empty flex flex-column">
            <img src="@/assets/illustration-empty.svg" alt="" />
            <h3>There is nothing here</h3>
            <p>Create a new invoice by clicking the New Invoice button and get started</p>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Invoice from '../components/Invoice'

export default {
    name: 'Home',
    components: {
        Invoice
    },
    data () {
        return {
            filterMenu: null,
            filteredInvoice: null
        }
    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE']),
        newInvoice () {
            this.TOGGLE_INVOICE()
        },
        toogleFilterMenu () {
            this.filterMenu = !this.filterMenu
        },
        filteredInvoices (e) {
            if (e.target.innerText === 'All') {
                this.filteredInvoice = null
                return
            }
            this.filteredInvoice = e.target.innerText
        }
    },
    computed: {
        ...mapState(['invoiceData']),
        filteredData () {
            return this.invoiceData.filter(item => {
                if (this.filteredInvoice === 'Draft') {
                    return item.invoiceDraft === true
                }

                if (this.filteredInvoice === 'Pending') {
                    return item.invoicePending === true
                }

                if (this.filteredInvoice === 'Paid') {
                    return item.invoicePaid === true
                }

                return item
            })
        },
        classObject () {
            const arrClass = [
                {
                    'draft-text': this.filteredInvoice === 'Draft',
                    'pending-text': this.filteredInvoice === 'Pending',
                    'paid-text': this.filteredInvoice === 'Paid'
                }
            ]

            return arrClass
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    color: #fff;

    .header {
        margin-bottom: 65px;

        .left,
        .right {
            flex: 1;
        }

        .right {
            align-items: center;
            justify-content: flex-end;

            .button,
            .filter {
                align-items: center;

                span {
                    font-size: 12px;
                }
            }

            .filter {
                position: relative;
                cursor: pointer;
                margin-right: 40px;

                img {
                    width: 9px;
                    height: 5px;
                    margin-left: 12px;
                }

                &-menu {
                    position: absolute;
                    top: 25px;
                    width: 120px;
                    list-style: none;
                    background-color: #1e2139;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    li {
                        font-size: 12px;
                        cursor: pointer;
                        padding: 10px 20px;

                        &:hover {
                            color: #1e2139;
                            background-color: #fff;
                        }
                    }
                }
            }

            .button {
                background-color: #7c5dfa;
                border-radius: 40px;
                padding: 8px 10px;

                .inner-button {
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    border-radius: 50%;
                    padding: 8px;
                    margin-right: 8px;

                    img {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }

    .empty {
        align-items: center;
        margin-top: 160px;

        img {
            width: 214px;
            height: 200px;
        }

        h3 {
            font-size: 20px;
            margin-top: 40px;
        }

        p {
            max-width: 224px;
            font-size: 12px;
            font-weight: 300;
            text-align: center;
            margin-top: 16px;
        }
    }
}
</style>
