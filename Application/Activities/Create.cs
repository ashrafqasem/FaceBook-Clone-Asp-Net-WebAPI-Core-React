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

namespace Application.Activities
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
            public Handler(DataContext context)
            {
                this._context = context;
            }

            //public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;

                bool hasEntries = await _context.SaveChangesAsync() > 0;

                if (!hasEntries) 
                { 
                    return Result<Unit>.Failure("Failed to create record!"); 
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}