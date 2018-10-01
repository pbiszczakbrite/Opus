
public with sharing class Opus_FollowUpOpportunityController {

    @AuraEnabled
    public static Opportunity getOpportunity(Id opportunityId) {
        return [SELECT Id, Name, AccountId, Account.Name, StageName, Amount, Description, Pricebook2Id,ParentOpportunity__c, Pricebook2.Name, Type FROM Opportunity WHERE Id = :opportunityId];
    }

}