trigger Opus_AccountTrigger on Account (after insert, after update) {

    if (trigger.isUpdate && trigger.isAfter) {
        Opus_AccountHandler.onAfterUpdate(trigger.new, trigger.oldMap);
    }

}