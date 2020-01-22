# fetch

1. fetch is Promise based, but in the catch method we will not get error in case 4xx or 5xx status code is returned. That is because fetch is considering error only if the error is with the fetch method itself. So the solution is us to explicitly check depeneding on the response.
