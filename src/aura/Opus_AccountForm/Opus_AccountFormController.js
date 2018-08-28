({
    getAccountAndShowModal: function (component, event, helper) {

        var selectedAccount = event.getParam('selectedAccount');
        if (selectedAccount !== null) {
            component.set('v.selectedAccount', selectedAccount);
        }

        helper.toggleClass(component, 'backdrop', 'slds-backdrop--');
        helper.toggleClass(component, 'modaldialog', 'slds-fade-in-');
    },

    clickSaveAccount: function (component, event, helper) {

        console.log('validate');
        var validItem = component.find('accountForm').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (validItem) {


            var action = component.get('c.saveAccount');
            var selectedAccount = component.get('v.selectedAccount');
            action.setParams({accountToSave: selectedAccount});
            action.setCallback(this, function (response) {
                var state = response.getState();

                if (state === "SUCCESS") {
                    var resultsToast = $A.get("e.force:showToast");
                    var message = 'Account saved';
                    resultsToast.setParams({
                        "type": "success",
                        "title": "Success",
                        "message": message
                    });
                    resultsToast.fire();
                }
            });
            $A.enqueueAction(action);

            $A.get('e.c:Opus_RefreshSearchForAccountsList').fire();
            component.set("v.selectedAccount", {
                'sobjectType': 'Account',
                'Name': '',
                'City': '',
                'Country': '',
                'EmailAsText__c': ''
            });

            helper.toggleClassInverse(component, 'backdrop', 'slds-backdrop--');
            helper.toggleClassInverse(component, 'modaldialog', 'slds-fade-in-');
        }
    },
    clickCloseButton: function (component, event, helper) {
        component.set("v.selectedAccount", {
            'sobjectType': 'Account',
            'Name': '',
            'City': '',
            'Country': '',
            'EmailAsText__c': ''
        });

        component.set("v.isFormVisible", false);
        component.set("v.isFormVisible", true);

        helper.toggleClassInverse(component, 'backdrop', 'slds-backdrop--');
        helper.toggleClassInverse(component, 'modaldialog', 'slds-fade-in-');
    }
})