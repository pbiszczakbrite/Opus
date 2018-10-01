
public without sharing class Opus_ComplainFormController {

    @AuraEnabled
    public static List<OrderItem> getProducts(String orderId) {

        System.debug('order id = ' + orderId);
        List<OrderItem> products =
        [SELECT Quantity, PricebookEntry.Name FROM OrderItem WHERE OrderId = :orderId];
        for (OrderItem orderItem : products) {
            System.debug(orderItem.PricebookEntry.Name);
        }
        return products;
    }

    @AuraEnabled
    public static void saveComplain (Case complain, String orderId) {

        AssignmentRule AR = new AssignmentRule();
        AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];

        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;

//        Case newCase = new Case(Status = 'New') ;
        complain.setOptions(dmlOpts);
        insert complain;





    }
}