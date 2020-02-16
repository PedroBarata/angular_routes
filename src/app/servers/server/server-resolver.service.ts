import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string;
}
/* O Resolver é usado quando os componentes que serão carregados 
dependem de uma chamada síncrona. 
O resolver "resolve" a chamada antes de chamar o componente, transformando a chamda assíncrona em síncrona. */
@Injectable()
export class ServerResolver implements Resolve<Server> {

    constructor(private serversService: ServersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(Number(route.params['id']));
    }

}