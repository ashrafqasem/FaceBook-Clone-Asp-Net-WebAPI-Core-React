using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using MediatR;
using Domain;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest 
        {
            public Activity Actitvity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Actitvity.Id);
                
                // activity = request.Actitvity;
                // _context.Activities.Update(activity);

                //activity.Title =  request.Actitvity.Title ?? activity.Title;

                _mapper.Map(request.Actitvity, activity);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }

        }
        
    }
}