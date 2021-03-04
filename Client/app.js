function GenerateUpdateform(id){
    $.get("https://localhost:44325/api/movie", id, function(data){
        console.log(data);
        data.filter(function(el){
            if(el.movieId==id){
                $("#tableData").append(`<tr>
                <td style="color:red">${el.title}</td>
                <td>${el.director}</td>
                <td>${el.genre}</td>
                </tr>`);
            }
            else{
                return false;
            }
            
        })
    })   
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
                <button onclick="GenerateUpdateform(${el.movieId})">Select Movie</button>
            </td>
            </tr>`);
        })
    });
    
    //Function above retrieves movies from the database.
    //The function below adds a movie to database.
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
    function updateMovie( e ){
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
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#update-movie').submit( updateMovie );

    //The delete function should resemble the check by id function.
    function deleteMovie( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#delete-movie').submit( deleteMovie );
})




