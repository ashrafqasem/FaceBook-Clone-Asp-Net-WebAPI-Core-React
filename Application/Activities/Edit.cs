using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        //public class Command : IRequest
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator() );
            }
        }

        //public class Handler : IRequestHandler<Command>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            //public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity obj = await _context.Activities.FindAsync(request.Activity.Id);
                if (obj == null ) { return null; } //' n

                // obj = request.Activity;
                // _context.Activities.Update(obj);

                //obj.Title =  request.Activity.Title ?? obj.Title;

                _mapper.Map(request.Activity, obj);
                //await _context.SaveChangesAsync();
                //return Unit.Value;

                bool hasEntries =  await _context.SaveChangesAsync() > 0;

                if (!hasEntries) 
                { 
                    return Result<Unit>.Failure("Failed to update record!"); 
                }

                return Result<Unit>.Success(Unit.Value);

            }

        }
        
    }
}