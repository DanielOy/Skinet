"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[424],{9424:(I,m,s)=>{s.r(m),s.d(m,{AccountModule:()=>U});var u=s(8583),a=s(15),o=s(665),t=s(3018),c=s(4826),p=s(4015);let f=(()=>{class e{constructor(n,r,l){this.accountService=n,this.router=r,this.activatedRoute=l,this.loginForm=new o.cw({}),this.returnUrl=""}ngOnInit(){this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl||"/shop",this.createLoginForm()}createLoginForm(){this.loginForm=new o.cw({email:new o.NI("",[o.kI.required,o.kI.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),password:new o.NI("",o.kI.required)})}onSubmit(){var n;this.accountService.login(null===(n=this.loginForm)||void 0===n?void 0:n.value).subscribe(()=>{console.log("User Login Successful"),this.router.navigateByUrl(this.returnUrl)},r=>{console.log(r)})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.B),t.Y36(a.F0),t.Y36(a.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-login"]],decls:10,vars:4,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3","py-5",2,"background-color","whitesmoke"],[1,"form-signin","m-3",3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"h3","mb-3","fw-normal"],["formControlName","email",3,"label"],["formControlName","password","type","password",3,"label"],["type","submit",1,"w-100","btn","btn-lg","btn-primary","mt-3",3,"disabled"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"form",2),t.NdJ("ngSubmit",function(){return r.onSubmit()}),t.TgZ(3,"div",3),t.TgZ(4,"h1",4),t._uU(5,"Login"),t.qZA(),t.qZA(),t._UZ(6,"app-text-input",5),t._UZ(7,"app-text-input",6),t.TgZ(8,"button",7),t._uU(9,"Sign in"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("formGroup",r.loginForm),t.xp6(4),t.Q6J("label","Email Address"),t.xp6(1),t.Q6J("label","Password"),t.xp6(1),t.Q6J("disabled",r.loginForm.invalid))},directives:[o._Y,o.JL,o.sg,p.t,o.JJ,o.u],styles:[""]}),e})();var h=s(7574),v=s(3637),b=s(9796);function g(e){return!(0,b.k)(e)&&e-parseFloat(e)+1>=0}var d=s(4869);function y(e){const{index:i,period:n,subscriber:r}=e;if(r.next(i),!r.closed){if(-1===n)return r.complete();e.index=i+1,this.schedule(e,n)}}var w=s(5917),x=s(3190),A=s(8002);function F(e,i){if(1&e&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",n," ")}}function N(e,i){if(1&e&&(t.TgZ(0,"ul",10),t.YNc(1,F,2,1,"li",11),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.errors)}}const C=[{path:"login",component:f},{path:"register",component:(()=>{class e{constructor(n,r,l){this.formBuilder=n,this.accountService=r,this.router=l,this.registerForm=new o.cw({}),this.errors=[]}ngOnInit(){this.createRegisterForm()}createRegisterForm(){this.registerForm=new o.cw({displayName:new o.NI("",[o.kI.required]),email:new o.NI("",[o.kI.required,o.kI.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")],[this.validateEmailNotTaken()]),password:new o.NI("",[o.kI.required])})}onSubmit(){this.accountService.register(this.registerForm.value).subscribe(()=>{this.router.navigateByUrl("/shop")},n=>{console.log(n),this.errors=n.errors})}validateEmailNotTaken(){return n=>function(e=0,i,n){let r=-1;return g(i)?r=Number(i)<1?1:Number(i):(0,d.K)(i)&&(n=i),(0,d.K)(n)||(n=v.P),new h.y(l=>{const R=g(e)?e:+e-n.now();return n.schedule(y,R,{index:0,period:r,subscriber:l})})}(500).pipe((0,x.w)(()=>n.value?this.accountService.checkEmailExists(n.value).pipe((0,A.U)(r=>r?{emailExists:!0}:null)):(0,w.of)(null)))}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(o.qu),t.Y36(c.B),t.Y36(a.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-register"]],decls:12,vars:6,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3","py-5",2,"background-color","whitesmoke"],[1,"form-signin",3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"h3","mb-3","fw-normal"],["formControlName","displayName",3,"label"],["formControlName","email",3,"label"],["formControlName","password","type","password",3,"label"],["class","text-danger list-unstyled",4,"ngIf"],["type","submit",1,"w-100","btn","btn-lg","btn-primary","mt-3",3,"disabled"],[1,"text-danger","list-unstyled"],[4,"ngFor","ngForOf"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"form",2),t.NdJ("ngSubmit",function(){return r.onSubmit()}),t.TgZ(3,"div",3),t.TgZ(4,"h1",4),t._uU(5,"Register"),t.qZA(),t.qZA(),t._UZ(6,"app-text-input",5),t._UZ(7,"app-text-input",6),t._UZ(8,"app-text-input",7),t.YNc(9,N,2,1,"ul",8),t.TgZ(10,"button",9),t._uU(11,"Register"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("formGroup",r.registerForm),t.xp6(4),t.Q6J("label","Display Name"),t.xp6(1),t.Q6J("label","Email Address"),t.xp6(1),t.Q6J("label","Password"),t.xp6(1),t.Q6J("ngIf",r.errors.length>0),t.xp6(1),t.Q6J("disabled",r.registerForm.invalid))},directives:[o._Y,o.JL,o.sg,p.t,o.JJ,o.u,u.O5,u.sg],styles:[""]}),e})()}];let J=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[a.Bz.forChild(C)],a.Bz]}),e})();var T=s(4466);let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,J,T.m]]}),e})()}}]);