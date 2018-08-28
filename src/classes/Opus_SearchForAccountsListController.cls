
public with sharing class Opus_SearchForAccountsListController {

    @AuraEnabled
    public static Account getAccountById(Id accountId) {
        Account accountElement = [SELECT Name, OwnerId, AccountNumber, Location__Latitude__s, Location__Longitude__s FROM Account where Id = :accountId];
        if (accountElement.Location__Longitude__s == null || accountElement.Location__Longitude__s == null) {
            accountElement.Location__Longitude__s = -0.0373469;
            accountElement.Location__Latitude__s = 51.473428;
        }
        return accountElement;
    }

}