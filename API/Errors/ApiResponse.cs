using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode)
        {
            StatusCode = statusCode;
            Message = GetDefaultMessageForStatusCode(statusCode);
        }

        public ApiResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad request",
                401 => "You are not authorized",
                404 => "Resource wasn't found",
                500 => "Internal server error",
                _ => null
            };
        }
    }
}
