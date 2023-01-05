using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Application.Core;
using FluentValidation;
using Persistence;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.MediatorHandlers.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._context = context;
                this._userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities
                    .Include(au => au.ActivityAppUsers)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(a => a.Id == request.Id);

                if(activity == null) { return null; }

                 AppUser appUser = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if(appUser == null) { return null; }

                string hostUserName = activity.ActivityAppUsers.FirstOrDefault(x => x.IsHost == true)?.AppUser?.UserName;
                ActivityAppUser activityAppUser = activity.ActivityAppUsers.FirstOrDefault(x => x.AppUser.UserName == appUser.UserName);

                if(activityAppUser != null && hostUserName == appUser.UserName) // -> then this is the host -> activity.IsCancelled = true
                {
                    activity.IsCancelled = !activity.IsCancelled; // toggle
                }

                if(activityAppUser != null && hostUserName != appUser.UserName) // -> this meen normal attendee
                {
                    activity.ActivityAppUsers.Remove(activityAppUser);
                }

                if(activityAppUser == null ) // -> this meen normal attendee
                {
                    activityAppUser = new ActivityAppUser(); 
                    activityAppUser.AppUser = appUser;
                    activityAppUser.Activity = activity;
                    activityAppUser.IsHost = false;

                    activity.ActivityAppUsers.Add(activityAppUser);
                }

                bool hasEntries = await _context.SaveChangesAsync() > 0;

                Result<Unit> resultUnit = hasEntries ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed updating record!");
                return resultUnit;
            }
        }

    }
}