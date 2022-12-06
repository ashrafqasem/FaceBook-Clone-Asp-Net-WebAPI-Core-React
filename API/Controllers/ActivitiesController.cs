using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    // [ApiController] //'
    // [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {
        // private readonly DataContext _context;
        // public ActivitiesController(DataContext context)
        // {
        //     this._context = context;
        // }

        // private readonly IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     this._mediator = mediator;
        // }

        [HttpGet]
        //public async Task<ActionResult<List<Activity>>> GetActivities()
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken cancellationToken)
        {
            //return await _context.Activities.ToListAsync();
            //return await _mediator.Send(new List.Query());
            return await _mediator.Send(new List.Query(), cancellationToken);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            return await _mediator.Send(new Details.Query{ Id = id});
        }

        [HttpPost]
        //public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        public async Task<IActionResult> CreateActivity(Activity activity) //. no n [FromBody] 
        {
            activity.Id = Guid.NewGuid();
            return Ok(await _mediator.Send(new Create.Command{ Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await _mediator.Send(new Edit.Command { Actitvity = activity}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await _mediator.Send(new Delete.Command { Id = id }));
        }

    }

}