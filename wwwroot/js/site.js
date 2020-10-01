// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//add a new style 'foo'
$(function () {
    $("#loaderbody").addClass('hide');

    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
});

showInPopup = (url, title) => {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
            $('#form-modal .modal-body').html(res);
            $('#form-modal .modal-title').html(title);
            $('#form-modal').modal('show');
        }
    })
}

jQueryAjaxPost = form => {
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    $('#view-all').html(res.html)
                    $('#form-modal .modal-body').html('');
                    $('#form-modal .modal-title').html('');
                    $('#form-modal').modal('hide');
                    $.notify('post successfully', {globalPosition: 'top center', className: 'success'});
                }
                else
                    $('#form-modal .modal-body').html(res.html);
            },
            error: function (err) {
                console.log(err)
            }
        })
        //to prevent default form submit event
        return false;
    } catch (ex) {
        console.log(ex)
    }
}

jQueryAjaxDelete = form => {
    if (confirm('Are you sure to delete this record ?')) {
        try {
            $.ajax({
                type: 'POST',
                url: form.action,
                data: new FormData(form),
                contentType: false,
                processData: false,
                success: function (res) {
                    $('#view-all').html(res.html);
                },
                error: function (err) {
                    console.log(err)
                }
            })
        } catch (ex) {
            console.log(ex)
        }
    }

    //prevent default form submit event
    return false;
}
/*
    deleteBannerGroupToastr = (event, form) => {
        event.preventDefault();
        var groupName = $("#deleteGroupName").html();
        $.ajax({
            async: true,
            type: 'POST',
            data: null,
            url: form.action,
            contentType: false,
            processData: false,      
            success: function (res) {
                if (res.success) {
                    $('#modal').modal('hide');
                    toastr.success('Banner Group ' + groupName + ' has been successfully deleted', 'Success Alert', { timeOut: 5000 });
                } else {
                    $('#modal').modal('hide');
                    toastr.info('Banner Group ' + groupName + ' has active zone assignment and cannot be deleted', 'Information Alert', { timeOut: 5000 });
                }
            },
            error: function (error) {
                console.log(error);
                $('#modal').modal('hide');
                toastr.error('Cannot delete Banner Group ' + groupName, 'Error Alert', { timeOut: 5000 });
            }
        })
    }
*/
/*
        $(document).ready(function () {
            $('form').on('submit', function (event) {
                event.preventDefault();
                const form = $(this);
                const groupName = $('#groupName').html();
                console.log(form.attr('action'));
                $.ajax({
                    async: true,
                    type: 'POST',
                    url: form.attr('action'),
                    beforeSend: function (request) {
                        request.setRequestHeader("RequestVerificationToken", $("[name='__RequestVerificationToken']").val());
                    },
                    data: form.serialize(),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (result) {
                        console.log(result);
                        if (result.success) {
                            toastr.success('Banner Group ' + groupName + ' has been successfully deleted', 'Success Alert', { timeOut: 5000 });
                        } else {
                            toastr.error('Banner Group ' + groupName + ' has active zone assignments and cannot be removed', 'Error Alert', { timeOut: 5000 });
                        }
                        form.remove();
                        $('#modal').modal('hide');
                    },
                    error: function (error) {
                        console.log(error);
                        $('#modal').modal('hide');
                        toastr.error('Failed to remove Banner Group ' + groupName, 'Error Alert', { timeOut: 5000 });
                    }
                }).fail(function () {
                    toastr.success('Banner Group ' + $('#groupName').html() + ' has been successfully deleted', 'Success Alert', { timeOut: 5000 });
                }).always(function () {
                    //window.location = '/Web/Groups/5';
                });
            });
    });
    */
