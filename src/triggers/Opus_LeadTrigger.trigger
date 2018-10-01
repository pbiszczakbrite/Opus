
trigger Opus_LeadTrigger on Lead (after insert, after update) {

    if (trigger.isInsert && trigger.isAfter) {
        Opus_LeadHandler.onAfterInsert(trigger.new);
    }

    
    if (trigger.isUpdate && trigger.isAfter) {
        Opus_LeadHandler.onAfterUpdate(trigger.new);
    }

}