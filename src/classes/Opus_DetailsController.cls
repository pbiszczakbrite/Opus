
public with sharing class Opus_DetailsController {

    @AuraEnabled
    public static User searchForOwner(Id ownerId) {
        return [SELECT Name FROM User WHERE Id=:ownerId LIMIT 1];
    }
}