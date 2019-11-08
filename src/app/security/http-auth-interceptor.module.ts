import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@Injectable()
export class HttpAuthRequestInterceptor implements HttpInterceptor {
    usertoken: any;

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        this.usertoken = JSON.parse(localStorage.getItem('currentUser'));
        if (this.usertoken != null) {
            const token = this.usertoken.access_token;
            const newReq = req.clone(
                {
                    headers: req.headers.set('Authorization', 'JWT ' + token)
                });
            return next.handle(newReq);
        } else {
            const token = null;
            return next.handle(req);
        }

    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthRequestInterceptor,
            multi: true
        }
    ]
})

export class HttpAuthInterceptorModule { }
