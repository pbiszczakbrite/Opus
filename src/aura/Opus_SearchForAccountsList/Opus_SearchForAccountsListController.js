({
    init: function (component, event, helper) {
        component.set('v.accountsColumns', null);
    },
    getAccounts: function (component, event, helper) {

        var searchAccounts = event.getParam('searchAccounts');
        if (searchAccounts && searchAccounts.length === 0) {
            searchAccounts = null;
            component.set('v.accountsColumns', null);
        }
        component.set('v.searchAccounts', searchAccounts);
        component.set('v.accountsColumns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'City', fieldName: 'BillingCity', type: 'Text'},
            {label: 'Country', fieldName: 'BillingCountry', type: 'text'},
            {label: 'Email', fieldName: 'Email__c', type: 'email'},
            {
                label: 'Action', type: 'button', initialWidth: 150, typeAttributes:
                    {label: 'Edit', title: 'Edit', name: 'edit_account', iconName: 'utility:edit', class: 'btn_next'}
            }
        ]);


    },
    getSelectedAccount: function (component, event) {


        var selectedRows = event.getParam('selectedRows');
        if (selectedRows.length === 0) {
            $A.get('e.c:Opus_DisplaySelectedAccount').setParams({'selectedAccount': null}).fire();
        } else {



            var selectedRow = selectedRows[0];
            if (selectedRows.length > 1) {
                selectedRows = [];
                component.set('v.selectedRows', selectedRows);
                selectedRow = null;
            }

            var currentId;

            if (selectedRow != null) {
                currentId = selectedRow.Id;
            }

            var action = component.get('c.getAccountById');
            action.setParams({accountId: currentId});
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var selectedAccount = response.getReturnValue();
                    $A.get('e.c:Opus_DisplaySelectedAccount').setParams({'selectedAccount': selectedAccount}).fire();
                } else {
                    $A.get('e.c:Opus_DisplaySelectedAccount').setParams({'selectedAccount': null}).fire();
                }
            });
            $A.enqueueAction(action);

        }

    },
    sendAccountToForm: function (component, event) {
        console.log('send ...');
        var sendAccount = $A.get('e.c:Opus_SendAccountToForm').setParams({'selectedAccount': null});
        sendAccount.fire();
    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit_account': {
                console.log('row =' + JSON.stringify(row));
                console.log('send...');
                $A.get('e.c:Opus_SendAccountToForm').setParams({'selectedAccount': row}).fire();
                break;
            }
        }
    }


})