trigger Opus_ContactTrigger on Contact (after insert, after update, after delete, after undelete) {

    if (trigger.isInsert && trigger.isAfter) {
        Opus_ContactHandler.onAfterInsert(trigger.new);
    }

    if (trigger.isUpdate && trigger.isAfter) {
        Opus_ContactHandler.onAfterUpdate(trigger.new, trigger.oldMap);
    }

    if (trigger.isUndelete && trigger.isAfter) {
        Opus_ContactHandler.onAfterUndelete(trigger.new);
    }

    if (trigger.isDelete && trigger.isAfter) {
        Opus_ContactHandler.onAfterDelete(trigger.old);
    }


}