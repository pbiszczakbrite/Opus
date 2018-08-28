({

    getAccount: function (component, event, helper) {
        var selectedAccount = event.getParam('selectedAccount');
        component.set('v.selectedAccount', selectedAccount);
    },
    getAccounts: function (component, event, helper) {
        var searchAccounts = event.getParam('searchAccounts');
        component.set('v.searchAccounts', searchAccounts);
        component.set('v.accountsColumns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'City', fieldName: 'BillingCity', type: 'Text'},
            {label: 'Country', fieldName: 'BillingCountry', type: 'text'},
            {label: 'Email', fieldName: 'Email__c', type: 'email'}
        ]);
    },

})