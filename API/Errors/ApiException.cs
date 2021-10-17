using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode) : base(statusCode)
        {
        }

        public ApiException(int statusCode, string message) : base(statusCode, message)
        {
        }

        public ApiException(int statusCode, string message, string details ) : base(statusCode, message)
        {
            Details = details;
        }

        public string Details { get; set; }
    }
}
