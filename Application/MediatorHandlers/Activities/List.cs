using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
//
using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.MediatorHandlers.Activities
{
    public class List
    {
        //public class Query : IRequest<List<Activity>> {}
        //public class Query : IRequest<Result<List<Activity>>> {}
        public class Query : IRequest<Result<List<ActivityDto>>> {} //' n
        
        //public class Handler : IRequestHandler<Query, List<Activity>>
        //public class Handler : IRequestHandler<Query,Result<List<Activity>>>
        public class Handler : IRequestHandler<Query,Result<List<ActivityDto>>> //' n
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;

            //public Handler(DataContext context, ILogger<List> logger)
            public Handler(DataContext context, ILogger<List> logger, IMapper mapper) //' n
            {
                this._context = context;
                this._logger = logger;
                this._mapper = mapper;
            }

            //public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            //public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken) //' n
            {
                //return await _context.Activities.ToListAsync();

                try
                {
                    for(int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        //await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }

                //List<Activity> activityList =  await _context.Activities.ToListAsync(cancellationToken);

                //' nn
                List<Activity> activityList = await _context.Activities //' nn
                    .Include(x => x.ActivityAppUsers) //' n Eager Loading /-> many to many 
                    .ThenInclude(x => x.AppUser) //' n -> Eager Loading/ A possible object cycle was detected.
                    .ToListAsync(cancellationToken);

                List<ActivityDto> activityDtoList_ = _mapper.Map<List<ActivityDto>>(activityList);  //' n  nn
               
                List<ActivityDto> activityDtoList__ = await _context.Activities
                    //.ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .Select(x => new ActivityDto() {
                        Category = x.Category,
                        City = x.City,
                        Date = x.Date,
                        Description = x.Description,
                        Id = x.Id,
                        Title = x.Title,
                        Venue = x.Venue,
                        HostUserName = x.ActivityAppUsers.FirstOrDefault(h => h.IsHost == true).AppUser.UserName,
                        ActivityAppUsers = x.ActivityAppUsers.Select(xx => new Profiles.Profile() {
                            DisplayName = xx.AppUser.DisplayName,
                            UserName = xx.AppUser.UserName,
                            Bio = xx.AppUser.Bio,
                            Image = "",
                        }).ToList()                     
                    })
                    .ToListAsync(cancellationToken);
                 //' nn

                List<ActivityDto> activityDtoList = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                //return activityList;
                //return Result<List<Activity>>.Success(activityList);
                return Result<List<ActivityDto>>.Success(activityDtoList); //' n 
            }
        }
    }
}