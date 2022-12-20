using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using Domain;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Delete
    {
        //public class Command : IRequest
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                {
                    Activity obj = await _context.Activities.FindAsync(request.Id);

                    if (obj == null ) { return null; } //'n

                    _context.Remove(obj); 

                    //await _context.SaveChangesAsync();
                    //return Unit.Value;

                    bool hasEntries = await _context.SaveChangesAsync() > 0;

                    if (!hasEntries) 
                    {
                        return Result<Unit>.Failure("Failed to delete record!");
                    }

                    return Result<Unit>.Success(Unit.Value);
                }
            }

        }
    }
}