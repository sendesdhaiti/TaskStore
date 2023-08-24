import env from './env.json';
export const environment = {
    "prod_api":env.dev.prod_api,
    "localhost_api":env.dev.localhost_api,
    "CryptKey": env.dev.CryptKey,
    "endpoints": {
        "Contact":"/api/Contact/",
        "Authentication":"/api/Authentication/",
        "Order":"/api/Order/",
        "Product":"/api/Product/"
    }
};
