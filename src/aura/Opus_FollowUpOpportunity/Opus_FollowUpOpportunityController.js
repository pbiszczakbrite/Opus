({
    doInit: function (component, event, helper) {

        var action = component.get("c.getOpportunity");
        var recordId = component.get("v.recordId");
        console.log('record id =' + recordId);
        action.setParams({"opportunityId": recordId });


        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var parentOpportunity = response.getReturnValue();
                console.log('success');
                console.log(parentOpportunity);

                // component.find("stage").set("v.value", parentOpportunity.StageName);
                component.set("v.recordId", null);
                component.find("currentRecord").getNewRecord(
                    "Opportunity",
                    null,
                    false,
                    $A.getCallback(function () {
                        component.set("v.sourceRecord.StageName", 'New');
                        component.set("v.parentOpportunity", parentOpportunity);

                    })
                );

            }
        });


        $A.enqueueAction(action);
    },
    handleOnLoad: function(component, event, helper) {

    },
    getError: function(component, event, helper) {
        var error = event.getParam("error");
        console.log(error.message); // main error message

        // top level error messages
        error.data.output.errors.forEach(
            function(msg) { console.log(msg.errorCode);
                console.log(msg.message); }
        );

        // field specific error messages
        Object.keys(error.data.output.fieldErrors).forEach(
            function(field) {
                error.data.output.fieldErrors[field].forEach(
                    function(msg) { console.log(msg.fieldName);
                        console.log(msg.errorCode);
                        console.log(msg.message); }
                )
            });
    }
,
    handleOpportunitySubmitted : function(component, event, helper) {

        var fields = event.getParam("fields");
        fields["Id"] = component.get('v.recordId');

        component.find("editForm").submit(fields);

    },

    handleOpportunitySaved : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The opportunity was properly saved.",
            "type": "success"
        });
        toastEvent.fire();


    }

})