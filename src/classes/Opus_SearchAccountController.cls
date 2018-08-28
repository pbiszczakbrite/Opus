public with sharing class Opus_SearchAccountController {

    @AuraEnabled
    public static List<Account> searchForAccounts(Account searchAccount) {
        System.debug('acc name = ' + searchAccount.Name);
        System.debug('acc city =' + searchAccount.BillingCity);
        System.debug('acc country = ' + searchAccount.BillingCountry);
        System.debug('acc email = ' + searchAccount.EmailAsText__c);
        return searchForAccounts(searchAccount.Name, searchAccount.BillingCity, searchAccount.BillingCountry, searchAccount.EmailAsText__c);
    }


    public static List<Account> searchForAccounts(String name, String city, String country, String email) {
        System.debug('name = ' + name);
        System.debug('city =' + city);
        System.debug('country = ' + country);
        System.debug('email = ' + email);

        Opus_Utils.SoqlUtil soqlUtil =
                new Opus_Utils.SoqlUtil('Account')
                        .withAddResultField('Name')
                        .withAddResultField('BillingCity')
                        .withAddResultField('BillingCountry')
                        .withAddResultField('Location__Latitude__s')
                        .withAddResultField('Location__Longitude__s')
                        .withAddResultField('Email__c')
                        .withAddSearchTextFieldWithValue('Name', name)
                        .withAddSearchTextFieldWithValue('BillingCity', city)
                        .withAddSearchTextFieldWithValue('BillingCountry', country)
                        .withAddSearchTextFieldWithValue('EmailAsText__c', email)
                        .build();
        return Database.query(soqlUtil.getQueryString());
    }


}