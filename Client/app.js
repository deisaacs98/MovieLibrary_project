
function UpdateMovie( e ){
    var dict = {
        MovieId : parseInt(this["movieId"].value),
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value,
        Image: this["image"].value
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

function GenerateUpdateForm(id,title,director,genre){
    
    $.get("https://localhost:44325/api/movie", id, function(data){
        console.log(data);
        
        data.filter(function(el){
            if(el.movieId==id||el.title==title||el.director==director||el.genre==genre){
                $("#tableData").html(`<tr>
                <td>
                    <img src=${el.image} width = "100%" alt="Image for ${el.title}">
                </td>
                <td>${el.title}</td>
                <td>${el.director}</td>
                <td>${el.genre}</td>
                </tr>
                <tr>
                    <td colspan="5">To edit this movie, enter the information below: </td>
                </tr>
                <tr>
                    <form id="update-movie" class="nav justify-content-center">
                        <input type="hidden" id="movieId" value="${el.movieId}" />
                        <td>
                            <label for="img">Image URL:</label>
                            <input type="text" id="img" name="image" placeholder=${el.image}>
                        </td>
                        <td>
                            <label for="title">Movie Title:</label>
                            <input type="text" name="title" placeholder="${el.title}" />
                        </td>
                        <td>
                            <label for="director">Director: </label>
                            <input type="text" name="director" placeholder="${el.director}" />
                        </td>
                        <td>
                            <label for="genre">Genre:</label>
                            <input type="text" name="genre" placeholder="${el.genre}"/>
                        </td>
                        <button type="submit">Submit</button>
                    </form>
                </tr>
                `);
                $('#update-movie').submit( UpdateMovie );   
            }
            else{
                return false;
            } 
        }); 
    });    
}
$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        console.log(data);
        data.map(function(el){
            $("#tableData").append(`<tr>
            <td>
                <img src=${el.image} width=50% alt="Image for ${el.title}">
            </td>
            <td>${el.title}</td>
            <td>${el.director}</td>
            <td>${el.genre}</td>
            <td>
                <button onclick="GenerateUpdateForm(${el.movieId})">Select Movie</button>
            </td>
            </tr>`);
        })
    });
    function addMovieForm( e ){
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

    
    $('#my-form').submit( addMovieForm );
    
    function searchTitle( e ){
        if(this["title"].value!=null){
            var title = this["title"].value;
            GenerateUpdateForm(null,title);
        }
        
        e.preventDefault();
    };

    function searchDirector(e){
        if(this["director"].value!=null){
            var director = this["director"].value;
            GenerateUpdateForm(null, null, director);
        }
        e.preventDefault();
    }
    function searchGenre(e){
        if(this["genre"].value!=null){
            var director = this["genre"].value;
            GenerateUpdateForm(null, null, null, director);
        }
        e.preventDefault();
    }

    $('#search-form1').submit(searchTitle);
    $('#search-form2').submit(searchDirector);
    $('#search-form3').submit(searchGenre);

    
    
})





