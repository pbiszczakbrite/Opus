({
    doInit : function(component, event, helper) {

        // Prepare the action to load opportunity record
        var action = component.get("c.getOpportunity");
        action.setParams({"opportunityId": component.get("v.recordId")});

        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.oldpportunity", response.getReturnValue());


            } else {
                console.log('Problem getting opportunity, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    }

})