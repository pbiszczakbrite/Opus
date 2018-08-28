
public with sharing class Opus_ReportViewAuraController {
    @AuraEnabled
    public static String runReport() {
        Report accountReport = [SELECT Id, DeveloperName FROM Report WHERE DeveloperName = 'Count_Accounts_Fields' LIMIT 1];
        Reports.ReportResults results = Reports.ReportManager.runReport(accountReport.Id, true);

        return JSON.serialize(results);
    }

}