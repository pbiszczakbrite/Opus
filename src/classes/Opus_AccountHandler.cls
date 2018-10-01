public with sharing class Opus_AccountHandler {


    public static void onAfterUpdate(List<Account> listOfNewAccounts, Map<Id, Account> mapOfNewAccounts) {
        for (Account accountElement : listOfNewAccounts) {
            Account oldAccount = mapOfNewAccounts.get(accountElement.Id);

            if (!accountElement.Partner_Level__c.equals(oldAccount.Partner_Level__c)) {

                List<Opportunity> opportunities = [SELECT Id FROM Opportunity WHERE AccountId = :accountElement.Id];
                List<Id> opportunitiesIds = new List<Id>();
                for (Opportunity opportunityElement : opportunities) {

                    opportunitiesIds.add(opportunityElement.Id);
                }


                String priceBookId = Opus_Utils.getPriceBook(accountElement.Partner_Level__c);

                List<OpportunityLineItem> oldEntries = [
                        SELECT OpportunityId, PricebookEntry.Product2Id, Quantity
                        FROM OpportunityLineItem
                        WHERE OpportunityId IN :opportunitiesIds
                ];
                List<Id> productsIds = new List<Id>();

                for (OpportunityLineItem opportunityLineItemElement : oldEntries) {
                    productsIds.add(opportunityLineItemElement.PricebookEntry.Product2Id);
                }
                delete oldEntries;
                for (Opportunity opportunityElement : opportunities) {
                    opportunityElement.Pricebook2Id = priceBookId;
                }
                update opportunities;

                List<PricebookEntry> newEntriesProducts = [
                        SELECT Id, UnitPrice, Product2Id
                        FROM PricebookEntry
                        WHERE Product2Id IN :productsIds
                        AND Pricebook2Id = :priceBookId
                ];

                List<OpportunityLineItem> newEntries = new List<OpportunityLineItem>();
                for (OpportunityLineItem opportunityLineItemElement : oldEntries) {
                    for (PricebookEntry pricebookEntryElement : newEntriesProducts) {

                        if (pricebookEntryElement.Product2Id.equals(opportunityLineItemElement.PricebookEntry.Product2Id)) {

                            newEntries.add(new OpportunityLineItem(
                                    opportunityId = opportunityLineItemElement.OpportunityId,
                                    unitPrice = pricebookEntryElement.UnitPrice,
                                    quantity = opportunityLineItemElement.Quantity,
                                    PricebookEntryId = pricebookEntryElement.Id));
                            break;
                        }
                    }
                }

                insert newEntries;
            }
        }


    }
}