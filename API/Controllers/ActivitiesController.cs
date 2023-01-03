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
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    // [ApiController] //'
    // [Route("api/[controller]")]
    [AllowAnonymous]
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
        //public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken cancellationToken)
        public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
        {
            //return await _context.Activities.ToListAsync();
            //return await _mediator.Send(new List.Query());
            //List<Activity> objList = await _mediator.Send(new List.Query(), cancellationToken);
            //return objList;

            Result<List<Activity>> resultObjList = await _mediator.Send(new List.Query(), cancellationToken);
            return HandleResult(resultObjList);
        }

        //[Authorize] //' n
        [HttpGet("{id}")]
        //public async Task<ActionResult<Activity>> GetActivity(Guid id)
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            //Activity obj = await _mediator.Send(new Details.Query{ Id = id});
            //if (obj == null) return NotFound();

            Result<Activity> resultObj = await _mediator.Send(new Details.Query{ Id = id});
            
            // if (resultObj.IsSuccess && resultObj.Value != null ) 
            // { 
            //     return Ok(resultObj.Value); 
            // }

            // if (resultObj.IsSuccess && resultObj.Value == null ) 
            // { 
            //     return NotFound(); 
            // }

            // return BadRequest(resultObj.Error);

            return HandleResult(resultObj);
        }

        [HttpPost]
        //public async Task<IActionResult> CreateActivity([FromBody]Activity obj)
        public async Task<IActionResult> CreateActivity(Activity obj) //. no n [FromBody] 
        {
            //obj.Id = Guid.NewGuid(); //x
            //MediatR.Unit mnit = await _mediator.Send(new Create.Command{ Activity = obj});
            //return Ok(unit);

            Result<MediatR.Unit> resultUnit = await _mediator.Send(new Create.Command{ Activity = obj});
            return HandleResult(resultUnit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity obj)
        {
            obj.Id = id;
            // MediatR.Unit unit = await _mediator.Send(new Edit.Command { Activity = obj});
            // return Ok(unit);

            Result<MediatR.Unit> resultUnit = await _mediator.Send(new Edit.Command { Activity = obj});
            return HandleResult(resultUnit);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // MediatR.Unit unit = await _mediator.Send(new Delete.Command { Id = id });
            // return Ok(unit);

            Result<MediatR.Unit> resultUnit = await _mediator.Send(new Delete.Command { Id = id });
            return HandleResult(resultUnit);
        }

    }

}