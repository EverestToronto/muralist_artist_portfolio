(function () {

    'use strict';

    // FILE Variables
    const artistUid = CONFIG.uid;
    const baseURL = CONFIG.baseUrl;


    // SETUP Event Listeners
    $('.buy').click(function() {
        $('.buy').hide();
        $('.purchaseForm').show();
    })
    $('.purchaseFormSubmit').click(function() {

        if($('#formPhone').val().length < 10) {
            alert('The phone number must be ')
        } else {
            let purchaseForm = {
                name: $('#formName').val(),
                phone: $('#formPhone').val(),
                email: $('#formEmail').val(),
                artistUid: artistUid
            }

            console.log(purchaseForm);

            $.post(baseURL + '/submitPurchaseForm', purchaseForm,function(data, status) {
                console.log(status)
                if(status === 'success') {
                    cleanForm()
                    alert('Thanks! We\'ll contact you shortly');
                }
            })

        }
        
    })

    // START Program
    getAndUpdatePostDetails();


    // All Functions
    function getAndUpdatePostDetails() {
        $.get(baseURL + '/getArtistsPosts?uid=' + artistUid,function(data, status) {

            let id = getUrlParameter('id');
            console.log(data[id])

            $('#pieceName').text(data[id].pieceName)
            $('#pieceDescription').text(data[id].pieceDescription)

            let postImgUrl = data[id]['imgUrls'][
                Object.keys(data[id]['imgUrls'])[0]
            ];
            let postImgHTML = '<img src="' + postImgUrl + '" alt="">';
            $('#piecePhoto').html(postImgHTML);
            $('#piecePrice').text('$'+data[id].price + '.00');
							
        });
    }

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var cleanForm = function() {
        $('#formName').val('')
        $('#formPhone').val('')
        $('#formEmail').val('')
    }

}());