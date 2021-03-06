import { createStore } from 'vuex'
import { db } from '../firebase/firebaseInit';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export default createStore({
    state: {
        invoiceData: [],
        invoiceModal: null,
        modalActive: null,
        invoicesLoaded: null,
        currentInvoiceArray: null,
        editInvoice: null
    },
    mutations: {
        TOGGLE_INVOICE (state) {
            state.invoiceModal = !state.invoiceModal
        },
        TOGGLE_MODAL (state) {
            state.modalActive = !state.modalActive
        },
        SET_INVOICE_DATA (state, payload) {
            state.invoiceData.push(payload)
            // console.log(state.invoiceData)
        },
        INVOICES_LOADED (state) {
            state.invoicesLoaded = true
        },
        SET_CURRENT_INVOICE (state, payload) {
            state.currentInvoiceArray = state.invoiceData.filter(item => {
                return item.invoiceId === payload
            })
            // console.log(state.currentInvoiceArray[0])
        },
        TOGGLE_EDIT_INVOICE (state) {
            state.editInvoice = !state.editInvoice
        },
        DELETE_INVOICE (state, payload) {
            state.invoiceData = state.invoiceData.filter(item => {
                return item.docId !== payload
            })
        },
        UPDATE_STATUS_TO_PAID (state, payload) {
            state.invoiceData.forEach(item => {
                if (item.docId === payload) {
                    item.invoicePaid = true
                    item.invoicePending = false
                }
            })
        },
        UPDATE_STATUS_TO_PENDING (state, payload) {
            state.invoiceData.forEach(item => {
                if (item.docId === payload) {
                    item.invoicePaid = false
                    item.invoicePending = true
                    item.invoiceDraft = false
                }
            })
        }
    },
    actions: {
        async GET_INVOICES ({ commit, state }) {
            const querySnapshot = await getDocs(collection(db, 'invoices'))

            querySnapshot.forEach((doc) => {
                if (!state.invoiceData.some(item => item.docId === doc.id)) {
                    const data = {
                        docId: doc.id,
                        invoiceId: doc.data().invoiceId,
                        billerStreetAddress: doc.data().billerStreetAddress,
                        billerCity: doc.data().billerCity,
                        billerZipCode: doc.data().billerZipCode,
                        billerCountry: doc.data().billerCountry,
                        clientName: doc.data().clientName,
                        clientEmail: doc.data().clientEmail,
                        clientStreetAddress: doc.data().clientStreetAddress,
                        clientCity: doc.data().clientCity,
                        clientZipCode: doc.data().clientZipCode,
                        clientCountry: doc.data().clientCountry,
                        invoiceDateUnix: doc.data().invoiceDateUnix,
                        invoiceDate: doc.data().invoiceDate,
                        paymentTerms: doc.data().paymentTerms,
                        paymentDueDateUnix: doc.data().paymentDueDateUnix,
                        paymentDueDate: doc.data().paymentDueDate,
                        productDescription: doc.data().productDescription,
                        invoiceItemList: doc.data().invoiceItemList,
                        invoiceTotal: doc.data().invoiceTotal,
                        invoicePending: doc.data().invoicePending,
                        invoiceDraft: doc.data().invoiceDraft,
                        invoicePaid: doc.data().invoicePaid,
                    }
                    commit('SET_INVOICE_DATA', data)
                }
            })
            
            commit('INVOICES_LOADED')
        },
        async UPDATE_INVOICE ({ commit, dispatch }, { docId, routeId }) {
            commit('DELETE_INVOICE', docId)
            await dispatch('GET_INVOICES')

            commit('TOGGLE_INVOICE')
            commit('TOGGLE_EDIT_INVOICE')
            commit('SET_CURRENT_INVOICE', routeId)
        },
        async DELETE_INVOICE ({ commit }, docId) {
            await deleteDoc(doc(db, "invoices", docId))
            commit('DELETE_INVOICE', docId)
        },
        async UPDATE_STATUS_TO_PAID ({ commit }, docId) {
            const docIdRef = doc(db, "invoices", docId);

            await updateDoc(docIdRef, {
                invoicePaid: true,
                invoicePending: false
            })

            commit('UPDATE_STATUS_TO_PAID', docId)
        },
        async UPDATE_STATUS_TO_PENDING ({ commit }, docId) {
            const docIdRef = doc(db, "invoices", docId);

            await updateDoc(docIdRef, {
                invoicePaid: false,
                invoicePending: true,
                invoiceDraft: false
            })

            commit('UPDATE_STATUS_TO_PENDING', docId)
        }
    },
    modules: {
    }
})
