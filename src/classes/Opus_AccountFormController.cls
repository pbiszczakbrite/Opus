
public with sharing class Opus_AccountFormController {

    @AuraEnabled
    public static Account saveAccount(Account accountToSave) {
        // Perform isUpdateable() check here
        upsert accountToSave;
        return accountToSave;
    }

}