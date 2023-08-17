import { environment_dev as devenv } from "./environment.development";
import { isDevMode } from '@angular/core';

let env
export function set(){
    if(isDevMode() == true){
        env = devenv.localhost_api
    }else{
        env = devenv.prod_api
    }
    return env
}
export const environment_prod = {
    "prod_api":set(),
    "endpoints": {
        "Contact":"/api/Contact/",
        "Authentication":"/api/Authentication/",
        "Order":"/api/Order/",
        "Product":"/api/Product/"
    }
};
