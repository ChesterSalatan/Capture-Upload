$(document).ready(function() {
    // To trigger camera for taking picture
    $('#takePictureButton').click(function() {
        $('#takePicture').click();
    });

    // To open a gallery to upload file
    $('#uploadImageButton').click(function() {
        $('#uploadImage').click();
    });

    // Handle the file input change for taking a picture
    $('#takePicture').on('change', function() {
        readFile(this);
    });

    // Handle the file input change for uploading an image
    $('#uploadImage').on('change', function() {
        readFile(this);
    });

    // Function to read and display the file
    const readFile = (input) => {
        const file = input.files[0];
        let rec_con = $('#rec_con');
        if (file) {
            const reader = new FileReader();
            rec_con.empty();
            reader.onload = function(imgURL) {
                let image = `<img src="${imgURL.target.result}" alt="department receipt">`;
                rec_con.append(image);

                const form = new FormData();
                form.append('file', file);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://open-ai21.p.rapidapi.com/ocr',
                    method: 'POST',
                    headers: {
                        'X-RapidAPI-Key': 'c0d2e3fcb7msh7aeac413237a4bfp191623jsn9d8995063512',
                        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
                    },
                    processData: false,
                    contentType: false,
                    mimeType: 'multipart/form-data',
                    data: form
                };

                $.ajax(settings).done(function(response) {
                    let cleanJSON = response.replace(/\\n/g, '');
                    let jsonResponse = JSON.parse(cleanJSON);

                    console.log(jsonResponse);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // #Region: Replace unnecessary text
    let testObject = "total: P900";
    let ourJSON = "js/test.json";

    const read_our_json = () => {
        $.ajax({
            url: ourJSON,
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching file:', errorThrown);
            }
        });
    };
    read_our_json();
    // #End Region
});