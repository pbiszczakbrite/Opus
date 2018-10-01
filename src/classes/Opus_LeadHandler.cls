
public with sharing class Opus_LeadHandler {
    public static void onAfterInsert(List<Lead> listOfNewLeads) {

        for (Lead contactElement : listOfNewLeads) {

        }

    }


    public static void onAfterUpdate(List<Lead> listOfNewLeads, Map<Id, Lead> mapOfOldLeads) {
        for (Lead contactElement : listOfNewLeads) {

        }


        checkAccountsId();
    }
}