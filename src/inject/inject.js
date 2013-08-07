//The table containing the payee input fields
var payeeTable = $("#payeeAccount_radNewPayeeAccount").closest('table');

//Init the paster plugin
$(payeeTable).paster();

$('#payeeAccount_accountNumber_txtBank').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'You can paste full bank account numbers here.'
    },
    position: {
            at: 'top center',
            my: 'bottom center'
    },
    style: {
    	classes: 'qtip-light'
    }
})