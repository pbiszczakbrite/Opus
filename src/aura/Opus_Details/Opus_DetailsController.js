({
    getAccount: function (component, event, helper) {

        var selectedAccount = event.getParam('selectedAccount');
        if (selectedAccount != null) {

            var selectedAccountOwner = selectedAccount.OwnerId;
            var searchForOwner = component.get('c.searchForOwner');
            searchForOwner.setParams({ownerId: selectedAccountOwner});
            searchForOwner.setCallback(this, function (response) {
                var state = response.getState();
                var owner = null;
                if (state === 'SUCCESS') {
                    owner = response.getReturnValue();
                    component.set('v.selectedAccountOwner', owner);
                }
            });
            $A.enqueueAction(searchForOwner);
        }


        component.set('v.selectedAccount', selectedAccount);
    }

})