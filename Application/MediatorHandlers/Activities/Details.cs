using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using Application.Core;
using AutoMapper.QueryableExtensions;
using Application.DTOs;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Application.MediatorHandlers.Activities
{
    public class Details
    {
        // public class Query : IRequest<Activity> 
        //public class Query : IRequest<Result<Activity>>
        public class Query : IRequest<Result<ActivityDto>> //'n
        {
            public Guid Id { get; set; }
        }

        //public class Handler : IRequestHandler<Query, Activity>
        //public class Handler : IRequestHandler<Query, Result<Activity>>
        public class Handler : IRequestHandler<Query, Result<ActivityDto>> //'n 
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            //public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            //public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken) //'n
            {
                //Activity activity = await _context.Activities.FindAsync(request.Id);
                ActivityDto activityDto = await  _context.Activities //'n
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    //.FindAsync(request.Id); //. x
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                //if(activity == null) return NotFound(); //x
                //if(activity == null)  throw new Exception("Activity not found!");
                
                //return activity;
                //return Result<Activity>.Success(activity);
                return Result<ActivityDto>.Success(activityDto); //'n
            }
        }

    }
}