<template>
    <router-link
        class="invoice flex"
        :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
    >
        <div class="left flex">
            <span class="tracking-number">№{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person">{{ invoice.clientName }}</span>
        </div>
        <div class="right flex">
            <span class="price">${{ invoice.invoiceTotal }}</span>
            <div :class="classObject">
                <span>{{ statusInvoice }}</span>
            </div>
            <div class="icon">
                <img src="@/assets/icon-arrow-right.svg" alt="" />
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'invoice',
    props: {
        invoice: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        classObject () {
            const arrClass = [
                'status-button flex',
                {
                    'paid': this.invoice.invoicePaid,
                    'draft': this.invoice.invoiceDraft,
                    'pending': this.invoice.invoicePending
                }
            ]

            return arrClass
        },
        statusInvoice () {
            let status = ''

            if (this.invoice.invoicePaid) status = 'Paid'
            if (this.invoice.invoiceDraft) status = 'Draft'
            if (this.invoice.invoicePending) status = 'Pending'

            return status
        }
    }
}
</script>

<style lang="scss" scoped>
.invoice {
    align-items: center;
    gap: 16px;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    background-color: #1e2139;
    border-radius: 20px;
    padding: 28px 32px;
    margin-bottom: 16px;

    span {
        font-size: 13px;
    }

    .left {
        flex-basis: 60%;
        align-items: center;
        gap: 16px;

        span {
            flex: 1;
        }

        .tracking-number {
            text-transform: uppercase;
        }
    }

    .right {
        flex-basis: 40%;
        align-items: center;
        gap: 16px;
        
        .price {
            flex: 1;
            font-size: 16px;
            font-weight: 600;
        }
    }
}
</style>
