@isTest
public with sharing class Opus_AccountHandlerTest {

    @testSetup static void createDataStructure() {
        Test.startTest();

        Product2 prod = new Product2(Name = 'Godfather');
        insert prod;

        Id pricebookId = Test.getStandardPricebookId();

        PricebookEntry standardPrice = new PricebookEntry(
                Pricebook2Id = pricebookId, Product2Id = prod.Id,
                UnitPrice = 1200, IsActive = true);
        insert standardPrice;

        Pricebook2 customPB = new Pricebook2(Name='Gold Pricebook', isActive=true);
        insert customPB;

        PricebookEntry customPrice = new PricebookEntry(
                Pricebook2Id = customPB.Id, Product2Id = prod.Id,
                UnitPrice = 1000, IsActive = true);
        insert customPrice;

        Account newAccount = new Account();
        newAccount.Name = 'New Account';
        insert newAccount;
        Opportunity newOpportunity = new Opportunity();
        newOpportunity.AccountId = newAccount.Id;
        newOpportunity.Name = 'New Account Opp';
        newOpportunity.StageName = 'New';
        newOpportunity.CloseDate = System.today();
        newOpportunity.Pricebook2Id = pricebookId;
        insert newOpportunity;


        OpportunityLineItem newLineItem = new OpportunityLineItem();
        newLineItem.OpportunityId = newOpportunity.Id;
        newLineItem.Product2Id = prod.Id;
        newLineItem.PricebookEntryId = standardPrice.Id;

        newLineItem.Quantity = 3;
        newLineItem.TotalPrice = 3000;

        insert  newLineItem;
        Test.stopTest();

    }

    @isTest static void shouldChangePricebook() {

        Opportunity opportunityBeforeChange = [SELECT Id, Pricebook2Id FROM Opportunity LIMIT 1];
        Account accountToChange = [SELECT Id FROM Account LIMIT 1];
        accountToChange.Partner_Level__c = 'Gold';


        update accountToChange;
        Opportunity opportunityAfterChange = [SELECT Id, Pricebook2Id FROM Opportunity LIMIT 1];

        System.debug('Opportunities: ');
        System.debug(opportunityBeforeChange.Pricebook2Id);
        System.debug(opportunityAfterChange.Pricebook2Id);

        Test.startTest();




        Test.stopTest();

    }

}