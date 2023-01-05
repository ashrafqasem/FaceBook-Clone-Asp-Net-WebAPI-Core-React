using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.MediatorHandlers.Activities
{
    public class Create
    {
        //public class Command : IRequest 
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        // public class CommandValidator : AbstractValidator<Activity>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.Title).NotEmpty();
        //     }
        // }

        //public class CommandValidator : AbstractValidator<Activity>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator() );
            }
        }

        //public class Handler : IRequestHandler<Command>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            //public Handler(DataContext context)
            public Handler(DataContext context, IUserAccessor userAccessor) //' n
            {
                this._context = context;
                this._userAccessor = userAccessor;
            }

            //public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //' n
                AppUser appUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName()); 

                ActivityAppUser activityAppUser = new ActivityAppUser();
                activityAppUser.AppUser = appUser;
                activityAppUser.Activity = request.Activity;
                activityAppUser.IsHost = true;

                request.Activity.ActivityAppUsers.Add(activityAppUser);
                //' n
                
                _context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;

                bool hasEntries = await _context.SaveChangesAsync() > 0;

                if (!hasEntries) 
                { 
                    Result<Unit> resultUnit_ = Result<Unit>.Failure("Failed creating record!"); 
                    return resultUnit_;
                }

                Result<Unit> resultUnit = Result<Unit>.Success(Unit.Value);
                return resultUnit;
            }
        }

    }
}