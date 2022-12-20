using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Details
    {
        // public class Query : IRequest<Activity> 
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }

        //public class Handler : IRequestHandler<Query, Activity>
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            //public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Id);

                //if(activity == null) return NotFound(); //x
                //if(activity == null)  throw new Exception("Activity not found!");
                
                //return activity;
                return Result<Activity>.Success(activity);
            }
        }

    }
}