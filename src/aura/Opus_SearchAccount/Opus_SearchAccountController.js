({

    handleSearchForAccounts : function(component, event, helper) {
        var searchAccount = component.get('v.searchAccount');
        var action = component.get('c.searchForAccounts');

        var allValid = component.find('accountInput').reduce(function (validSoFar, inputCmp) {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if(!allValid) {
            return;
        }

        action.setParams({searchAccount: searchAccount});

        action.setCallback(this, function(response) {
            var state = response.getState();
            var accounts = null;
            if (state === 'SUCCESS') {
                accounts = response.getReturnValue();
            }
            $A.get('e.c:Opus_SearchForAccounts').setParams({'searchAccounts': accounts}).fire();
        });
        $A.enqueueAction(action);
    },
    handleClearAccounts : function(component, event, helper) {
        $A.util.removeClass(component.find('slds-input'), "slds-has-error"); // remove red border
        $A.util.addClass(component.find('slds-input'), "hide-error-message");
        component.set("v.searchAccount",{ 'sobjectType': 'Account',
            'Name': '',
            'City': '',
            'Country': '',
            'EmailAsText__c': ''});

        component.set("v.isVisible", false);
        component.set("v.isVisible", true);

        $A.get('e.c:Opus_SearchForAccounts').setParams({'searchAccounts':null}).fire();
        $A.get('e.c:Opus_DisplaySelectedAccount').setParams({'selectedAccount': null}).fire();

    }
})