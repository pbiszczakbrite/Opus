({
    doInit: function (component, event, helper) {
        var action = component.get("c.findByParent");
        if (component.get("v.recordId") == null) {
            component.set("v.isRecordPage", false);
        } else {
            component.set("v.isRecordPage", true);
        }
        action.setParams({parentId: component.get("v.recordId") || '00161000007OqT2AAK'});
        action.setCallback(this, function (a) {
            component.set("v.accounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    onAccountSelected: function (component, event, helper) {
        var account = event.getParam("account");
        var target = event.getParam("target");
        if (target === "address") {
            component.set("v.selectedAccount", account);
        } else {
            var evt = $A.get("e.force:navigateToSObject");
            if (evt) {
                evt.setParams({"recordId": account.Id});
                evt.fire();
            }
        }
    }

})