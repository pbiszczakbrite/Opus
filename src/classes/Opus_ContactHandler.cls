public with sharing class Opus_ContactHandler {
    private static Map<Id, List<Contact>> accountContactList = new Map<Id, List<Contact>>();
    private static Map<Id, List<Contact>> accountDeleteContactList = new Map<Id, List<Contact>>();
    private static Set<Id> accountsId = new Set<Id>();
    private static List<Account> accounts = new List<Account>();

    public static void onAfterInsert(List<Contact> listOfNewContacts) {

        for (Contact contactElement : listOfNewContacts) {
            if (String.isNotBlank(contactElement.accountId)) {
                if (!accountContactList.containsKey(contactElement.accountId)) {
                    accountContactList.put(contactElement.accountId, new List<Contact>());
                }
                accountContactList.get(contactElement.accountId).add(contactElement);
                accountsId.add(contactElement.accountId);
            }
        }
        checkAccountsId();
    }

//    && contactElement.accountId != mapOfOldContacts.get(contactElement.Id).accountId
    public static void onAfterUpdate(List<Contact> listOfNewContacts, Map<Id, Contact> mapOfOldContacts) {
        for (Contact contactElement : listOfNewContacts) {
            if (String.isNotBlank(contactElement.accountId)) {
                if (!accountContactList.containsKey(contactElement.accountId)) {
                    accountContactList.put(contactElement.accountId, new List<Contact>());
                }
                accountContactList.get(contactElement.accountId).add(contactElement);
                accountsId.add(contactElement.accountId);
//
//                if(!accountDeleteContactList.containsKey(mapOfOldContacts.get(contactElement.Id).accountId)){
//                    accountDeleteContactList.put(mapOfOldContacts.get(contactElement.Id).accountId, new List<Contact>());
//                }
//                accountDeleteContactList.get(mapOfOldContacts.get(contactElement.Id).accountId).add(contactElement);
//                accountsId.add(mapOfOldContacts.get(contactElement.Id).accountId);

            } else if (String.isBlank(contactElement.accountId) && String.isNotBlank(mapOfOldContacts.get(contactElement.Id).accountId)) {

                if (!accountDeleteContactList.containsKey(mapOfOldContacts.get(contactElement.Id).accountId)) {
                    accountDeleteContactList.put(mapOfOldContacts.get(contactElement.Id).accountId, new List<Contact>());
                }
                accountDeleteContactList.get(mapOfOldContacts.get(contactElement.Id).accountId).add(contactElement);
                accountsId.add(mapOfOldContacts.get(contactElement.Id).accountId);
            }
        }


        checkAccountsId();
    }

    public static void onAfterUndelete(List<Contact> listOfNewContacts) {
        for (Contact contactElement : listOfNewContacts) {
            if (String.isNotBlank(contactElement.accountId)) {
                if (!accountContactList.containsKey(contactElement.accountId)) {
                    accountContactList.put(contactElement.accountId, new List<Contact>());
                }
                accountContactList.get(contactElement.accountId).add(contactElement);
                accountsId.add(contactElement.accountId);
            }
        }
        checkAccountsId();
    }

    public static void onAfterDelete(List<Contact> listOfOldContacts) {
        for (Contact contactElement : listOfOldContacts) {
            if (String.isNotBlank(contactElement.accountId)) {
                if (!accountDeleteContactList.containsKey(contactElement.accountId)) {
                    accountDeleteContactList.put(contactElement.accountId, new List<Contact>());
                }
                accountDeleteContactList.get(contactElement.accountId).add(contactElement);
                accountsId.add(contactElement.accountId);
            }
        }
        checkAccountsId();
    }

    public static void checkAccountsId() {

        if (accountsId.size() > 0) {
            accounts = [SELECT Id, numberOfContacts__c FROM Account WHERE Id IN :accountsId];

            for (Account Account : accounts) {
                Integer noOfConts = 0;
                if (accountContactList.containsKey(Account.Id)) {
                    noOfConts += accountContactList.get(Account.Id).size();
                }
                if (accountDeleteContactList.containsKey(Account.Id)) {
                    noOfConts -= accountDeleteContactList.get(Account.Id).size();
                }
                Account.numberOfContacts__c = Account.numberOfContacts__c == 0 ? noOfConts : (Account.numberOfContacts__c + noOfConts);
            }

            update accounts;
        }
    }

}