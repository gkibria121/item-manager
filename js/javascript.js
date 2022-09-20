$(document).ready(function () {


    function fetchData() {
        $('table').show();
        $('.alert').hide();
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/api/item",
            // data: "data",
            dataType: "json",
            success: function (response) {
                $('#tbody').html('');
                response.forEach((element, index) => {
                    $('#tbody').append(
                        `<tr>
                <td>${index + 1}</td>
                <td>${element.text}</td>
                <td>${element.body}</td>
                <td><button class='btn btn-primary btn-sm' class='item-data' data-id = ${element.id}>Delete</button>
                <div class='btn btn-primary btn-sm' class='item-edit ' data-id = ${element.id}>Edit</div></td>
                </tr>`)
                });

            }

        });
    }
    fetchData();
    function addData() {
        text = $('#text').val();
        body = $('#body').val();
        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:8000/api/item",
            data: {
                text: text,
                body: body
            },
            dataType: "json",
            success: function (response, status) {
                if (response['success'] != false) {
                    $('.alert-success').text('Item added seccessfully').show();
                    console.log(response['success'])

                }
                else {
                    console.log(response['success'])
                    $('.alert-danger').text('Item is not added').show();



                }


            }

        });
        $('#text').val('');
        $('#body').val('');
        fetchData();


    }
    function deleteData() {
        id = $(this).data('id');
        console.log(id);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/item/" + id,
            data: {
                _method: 'DELETE'
            },
            dataType: "dataType",
            success: function (response) {
            }

        });

        fetchData();
    }
    function editData() {
        item_id = $(this).data('id');
        $('#btn-submit').hide();
        $('table').hide();
        $('.alert').hide();
        $('#btn-update').attr('data-id', item_id);
        $('#btn-update').show();

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/api/item",
            // data: "data",
            dataType: "json",
            success: function (response) {
                response.forEach((element) => {
                    if (element.id == item_id) {
                        console.log(element)
                        text = $('#text').val(element.text);
                        body = $('#body').val(element.body);
                        $('#btn-goback').show();

                    }
                }
                );

            }
        });
    }
    function updateData() {
        text = $('#text').val();
        body = $('#body').val();
        item_id = $('#btn-update').data('id');
        console.log(item_id, text, body)
        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:8000/api/item/" + item_id,
            data: {
                _method: 'PUT',
                text: text,
                body: body,
            },
            dataType: "json",
            success: function (response) {

                goBack();
                $('.alert-success').text('Item Edited Successfully');
                $('.alert-success').show();





            }
        });
    }

    function goBack() {
        fetchData()
        $('table').show();
        text = $('#text').val('');
        body = $('#body').val('');
        $('#btn-update').hide();
        $('#btn-submit').show();
       $('#btn-goback').hide();

    }

    $('#btn-update').on('click', updateData);
    $('#btn-goback').on('click', goBack);
    $('#btn-fetch').on('click', fetchData);
    $('#btn-submit').on('click', addData);
    $('#tbody').on('click', 'button', deleteData);
    $('#tbody').on('click', 'div', editData);


});
















