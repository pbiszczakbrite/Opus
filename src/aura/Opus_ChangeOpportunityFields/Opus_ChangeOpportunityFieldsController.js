({
   doInit: function(component, event, helper) {
        console.log('init = ' + component.get('v.recordId'));
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

    handleOpportunitySaved : function(component, event, helper) {

        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The opportunity was properly saved.",
            "type": "success"
        });
        toastEvent.fire();
        $A.get("e.force:closeQuickAction").fire();
        $A.get('e.force:refreshView').fire();

    },
    handleOnCancel : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    }
})