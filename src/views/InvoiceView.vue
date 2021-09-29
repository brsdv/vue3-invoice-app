<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
            <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
        </router-link>

        <!-- Header -->
        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div :class="classObject">
                    <span>{{ statusInvoice }}</span>
                </div>
            </div>
            <div class="right flex">
                <button
                    class="dark-purple"
                    @click="toogleEditInvoice(currentInvoice.docId)"
                >Edit</button>
                <button
                    class="red"
                    @click="deleteInvoice(currentInvoice.docId)"
                >Delete</button>
                <button
                    v-if="currentInvoice.invoicePending"
                    class="green"
                    @click="updateStatusToPaid(currentInvoice.docId)"
                >Mark as Paid</button>
                <button
                    v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
                    class="orange"
                    @click="updateStatusToPending(currentInvoice.docId)"
                >Mark as Pending</button>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex flex-column">
                    <p><span>№</span>{{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>
                <div class="right flex flex-column">
                    <p>{{ currentInvoice.billerStreetAddress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                    <p>{{ currentInvoice.billerZipCode }}</p>
                    <p>{{ currentInvoice.billerCountry }}</p>
                </div>
            </div>
            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice.invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice.paymentDueDate }}</p>
                </div>
                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice.clientName }}</p>
                    <p>{{ currentInvoice.clientStreetAddress }}</p>
                    <p>{{ currentInvoice.clientCity }}</p>
                    <p>{{ currentInvoice.clientZipCode }}</p>
                    <p>{{ currentInvoice.clientCountry }}</p>
                </div>
                <div class="send-to flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div
                        class="item flex"
                        v-for="(item, index) in currentInvoice.invoiceItemList"
                        :key="index"
                    >
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>Amount Due</p>
                    <p>{{ currentInvoice.invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'invoiceView',
    data () {
        return {
            currentInvoice: null
        }
    },
    created () {
        this.getCurrentInvoice()
    },
    methods: {
        ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
        getCurrentInvoice () {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId)
            this.currentInvoice = this.currentInvoiceArray[0]
        },
        toogleEditInvoice () {
            this.TOGGLE_INVOICE()
            this.TOGGLE_EDIT_INVOICE()
        }
    },
    computed: {
        ...mapState(['currentInvoiceArray']),
        classObject () {
            const arrClass = [
                'status-button flex',
                {
                    'paid': this.currentInvoice.invoicePaid,
                    'draft': this.currentInvoice.invoiceDraft,
                    'pending': this.currentInvoice.invoicePending
                }
            ]

            return arrClass
        },
        statusInvoice () {
            let status = ''

            if (this.currentInvoice.invoicePaid) status = 'Paid'
            if (this.currentInvoice.invoiceDraft) status = 'Draft'
            if (this.currentInvoice.invoicePending) status = 'Pending'

            return status
        }
    }
}
</script>

<style lang="scss" scoped>
.invoice-view {
    .nav-link {
        align-items: center;
        font-size: 12px;
        color: #fff;
        margin-bottom: 32px;

        img {
            width: 7px;
            height: 10px;
            margin-right: 16px;
        }
    }

    .header,
    .invoice-details {
        background-color: #1e2139;
        border-radius: 20px;
    }

    .header {
        align-items: center;
        font-size: 12px;
        padding: 24px 32px;

        .left {
            align-items: center;

            span {
                color: #dfe3fa;
                margin-right: 16px;
            }
        }

        .right {
            flex: 1;
            justify-content: flex-end;

            button {
                color: #fff;
            }
        }
    }

    .invoice-details {
        padding: 48px;
        margin-top: 24px;

        .top {
            .left,
            .right {
                flex: 1;
                color: #dfe3fa;
            }

            .left {
                font-size: 12px;

                p {
                    &:first-child {
                        font-size: 24px;
                        text-transform: uppercase;
                        color: #fff;
                        margin-bottom: 8px;
                    }

                    &:last-child {
                        font-size: 16px;
                    }

                    span {
                        color: #888eb0;
                    }
                }
            }

            .right {
                align-items: flex-end;
                font-size: 12px;
            }
        }

        .middle {
            gap: 16px;
            color: #dfe3fa;
            margin-top: 50px;

            h4 {
                font-size: 12px;
                font-weight: 400;
                margin-bottom: 12px;
            }

            p {
                font-size: 16px;
            }

            .bill,
            .payment {
                flex: 1;
            }

            .payment {
                h4:last-of-type {
                    margin-top: 32px;
                }

                p {
                    font-weight: 600;
                }
            }

            .bill {
                p {
                    font-size: 12px;

                    &:nth-child(2) {
                        font-size: 16px;
                    }

                    &:nth-child(3) {
                        margin-top: auto;
                    }
                }
            }

            .send-to {
                flex: 2;
            }
        }

        .bottom {
            margin-top: 50px;

            .billing-items {
                background-color: #252945;
                border-radius: 20px 20px 0 0;
                padding: 32px;

                .heading {
                    font-size: 12px;
                    color: #dfe3fa;
                    margin-bottom: 32px;

                    p {
                        flex: 1;
                        text-align: right;

                        &:first-child {
                            flex: 3;
                            text-align: left;
                        }
                    }
                }

                .item {
                    font-size: 13px;
                    color: #fff;
                    margin-bottom: 32px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    p {
                        flex: 1;
                        text-align: right;

                        &:first-child {
                            flex: 3;
                            text-align: left;
                        }
                    }
                }
            }

            .total {
                align-items: center;
                color: #fff;
                background-color: rgba(12, 14, 22, 0.7);
                border-radius: 0 0 20px 20px;
                padding: 32px;

                p {
                    flex: 1;
                    font-size: 12px;

                    &:last-child {
                        font-size: 28px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>
