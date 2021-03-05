function GenerateUpdateForm(id){
    $.get("https://localhost:44325/api/movie", id, function(data){
        console.log(data);
        data.filter(function(el){
            if(el.movieId==id){
                $("#tableData").html(`<tr>
                <td style="color:red">${el.title}</td>
                <td>${el.director}</td>
                <td>${el.genre}</td>
                </tr>
                <tr>
                    <td>Update Move: </td>
                    <td></td>
                    <td>
                        <form id="UpdateMovie" class="nav justify-content-center">
                            <input type="text" name="title" placeholder="${el.title}" />
                            <input type="text" name="director" placeholder="${el.director}" />
                            <input type="text" name="genre" placeholder="${el.genre}"/>
                            <button type="submit">Submit</button>
                        </form>
                    </td>
                </tr>
                `);
            }
            else{
                return false;
            }
            
        })
    })   
}
function UpdateMovie( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data){
            $('#response pre').html( data );
        },
        error: function(errorThrown ){
            console.log( errorThrown );
        }
    });

    e.preventDefault();
}

$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        console.log(data);
        data.map(function(el){
            $("#tableData").append(`<tr>
            <td style="color:red">${el.title}</td>
            <td>${el.director}</td>
            <td>${el.genre}</td>
            <td>
                <button onclick="GenerateUpdateForm(${el.movieId})">Select Movie</button>
            </td>
            </tr>`);
        })
    });
    



    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data ){
                $('#response pre').html( data );
            },
            error: function( errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }

    $('#my-form').submit( processForm );




    //The update function will process a put request. Since
    //this works similarly to the post request, we can use a
    //similar approach.
    

    
    
})





