using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MLWebAPI.Data;
using MLWebAPI.Models;


namespace MLWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = string.Join(",",_context.Movies.Select(m=>m.ToString()).ToArray());
            return Ok(movies);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            // return Ok(movie);
            var movie = _context.Movies.Where(m => m.MovieId == id);
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            _context.Movies.Add(value);
            return Ok();
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete movie from db logic
            return Ok();
        }
    }
}