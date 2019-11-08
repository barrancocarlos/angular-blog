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
        const token = this.usertoken.access_token;

        if (token) {
            const newReq = req.clone(
                {
                    headers: req.headers.set('Authorization', 'JWT ' + token)
                });
            return next.handle(newReq);

        } else {
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