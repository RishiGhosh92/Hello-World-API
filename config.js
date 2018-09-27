/*
* Create and export config variables
*
*/

//Container for all environments
let environments={};

//Staging(default) environment
environments.staging={
    'httpPort':3000,
    'httpsPort':3001,
    'envName':'staging'
};

//Production environment
environments.production={
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'production'
};

//Determine which env. was passed as command-line args
let currentEnvironment=typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';

//Check that the current env. is one of the env. above, If not,default to staging
let environmentToExport=typeof(environments[currentEnvironment])=='object'?
                                environments[currentEnvironment]:environments.staging;

//Export the module
module.exports=environmentToExport;