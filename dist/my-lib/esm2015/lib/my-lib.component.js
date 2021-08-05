import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class MyLibComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.searchedText = "";
        this.BASE_URL = 'https://uk.funzing.space:443/api/v2';
        this.timer = null;
        this.searchResponse = {};
        this.isLoading = false;
    }
    ngOnInit() {
    }
    /**
    * Function Execute when user type something in text input after timeout of 500
    */
    onInputChange() {
        if (this.searchedText) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.makeAPICall();
            }, 500);
        }
        else {
            this.searchResponse = {};
        }
    }
    /**
     * Function that fetch records from server and modify that for highlight searched word
     */
    makeAPICall() {
        this.searchResponse = {};
        if (this.searchedText) {
            this.isLoading = true;
            this.httpClient.get(`${this.BASE_URL}/auto_complete_searcher?search_text=${this.searchedText}`).subscribe((res) => {
                var _a, _b, _c, _d, _e, _f;
                this.searchResponse = res;
                let replaceWord = new RegExp(this.searchedText, "gi");
                if ((_b = (_a = this.searchResponse) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.length) {
                    this.searchResponse.categories.map((category) => {
                        category.title = category.title.replace(replaceWord, (str) => `<strong>${str}</strong>`);
                    });
                }
                if ((_d = (_c = this.searchResponse) === null || _c === void 0 ? void 0 : _c.experiences) === null || _d === void 0 ? void 0 : _d.length) {
                    this.searchResponse.experiences.map((experience) => {
                        experience.title = experience.title.replace(replaceWord, (str) => `<strong>${str}</strong>`);
                    });
                }
                if ((_f = (_e = this.searchResponse) === null || _e === void 0 ? void 0 : _e.hosts) === null || _f === void 0 ? void 0 : _f.length) {
                    this.searchResponse.hosts.map((host) => {
                        host.title = host.title.replace(replaceWord, (str) => `<strong>${str}</strong>`);
                    });
                }
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            });
        }
    }
    /**
     * function for navigate to given external url
     * @param url string navigation url
     */
    navigateToLink(url) {
        let urlNavigation = '';
        if (!/^http[s]?:\/\//.test(url)) {
            urlNavigation += 'http://';
        }
        urlNavigation += url;
        window.open(urlNavigation, '_blank');
    }
}
MyLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.4", ngImport: i0, type: MyLibComponent, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Component });
MyLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.4", type: MyLibComponent, selector: "my-angular-search", ngImport: i0, template: "<div class=\"search-module\">\r\n    <form>\r\n        <input class=\"form-control\" type=\"text\" name=\"searchedText\" [(ngModel)]=\"searchedText\"\r\n            (ngModelChange)=\"onInputChange()\" placeholder=\"Search...\">\r\n        <div class=\"loader\" *ngIf=\"isLoading\"></div>\r\n    </form>\r\n    <div class=\"search-result\" *ngIf=\"searchResponse?.categories?.length || searchResponse?.experiences?.length || searchResponse?.hosts?.length\">\r\n        <div class=\"search-result__head\">\r\n            <div class=\"search-result__icon\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"15\" viewBox=\"0 0 16 15\" fill=\"none\">\r\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\r\n                        d=\"M10.5281 9.42808H11.2135L15.5 13.7135L14.2146 15L9.92923 10.7135V10.0281L9.67077 9.77077C8.72808 10.6281 7.44269 11.1427 6.07077 11.1427C2.98538 11.1427 0.5 8.65731 0.5 5.57077C0.5 2.48538 2.98538 0 6.07077 0C9.15615 0 11.6415 2.48538 11.6415 5.57077C11.6415 6.94269 11.1281 8.22808 10.2719 9.17077L10.5281 9.42808ZM6.07077 1.71346C3.92808 1.71346 2.21346 3.42923 2.21346 5.57077C2.21346 7.71462 3.92808 9.42808 6.07077 9.42808C8.21346 9.42808 9.92923 7.71462 9.92923 5.57077C9.92923 3.42923 8.21346 1.71346 6.07077 1.71346Z\"\r\n                        fill=\"url(#paint0_linear)\" />\r\n                    <defs>\r\n                        <linearGradient id=\"paint0_linear\" x1=\"0.5\" y1=\"7.49981\" x2=\"15.5\" y2=\"7.49981\"\r\n                            gradientUnits=\"userSpaceOnUse\">\r\n                            <stop stop-color=\"#FF7A59\" />\r\n                            <stop offset=\"1\" stop-color=\"#EF6340\" />\r\n                        </linearGradient>\r\n                    </defs>\r\n                </svg>\r\n            </div>\r\n            <div class=\"search-result__title\">Search results for <strong>\u2018{{searchedText}}\u2019</strong></div>\r\n        </div>\r\n        <div class=\"search-result__block search-result__block--scrolling\" *ngIf=\"searchResponse?.categories?.length\">\r\n            <div class=\"search-result__block-heading\">\r\n                <h3 class=\"search-result__block-title\">categories and interests</h3>\r\n            </div>\r\n            <ul class=\"search-result__block-list\">\r\n                <li *ngFor=\"let category of searchResponse.categories\">\r\n                    <a (click)=\"navigateToLink(category.link)\" [innerHtml]=\"category.title\"></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"search-result__block\" *ngIf=\"searchResponse?.experiences?.length\">\r\n            <div class=\"search-result__block-heading\">\r\n                <h3 class=\"search-result__block-title\">experiences</h3>\r\n                <a href=\"#\">Show more results</a>\r\n            </div>\r\n            <ul class=\"search-result__block-list\">\r\n                <li *ngFor=\"let experience of searchResponse.experiences\">\r\n                    <a (click)=\"navigateToLink(experience.link)\">\r\n                        <div class=\"search-list-block search-list-block--blog\">\r\n                            <div class=\"search-list-block__img\"\r\n                                [style.backgroundImage]=\"'url('+ experience?.img_url +')'\">\r\n                            </div>\r\n                            <div class=\"search-list-block__info\">\r\n                                <h3 class=\"search-list-block__title\" [innerHtml]=\"experience?.title\"></h3>\r\n                                <div class=\"search-list-block__content\">{{experience?.location}}\r\n                                    <span class=\"search-list-block__date\">\r\n                                        <svg width=\"12\" height=\"13\" viewBox=\"0 0 12 13\" fill=\"#424242\"\r\n                                            xmlns=\"http://www.w3.org/2000/svg\">\r\n                                            <path\r\n                                                d=\"M2.5 0.423462V1.59013H1.91667C1.275 1.59013 0.75 2.11513 0.75 2.7568V10.9235C0.75 11.5651 1.275 12.0901 1.91667 12.0901H10.0833C10.725 12.0901 11.25 11.5651 11.25 10.9235V2.7568C11.25 2.11513 10.725 1.59013 10.0833 1.59013H9.5V0.423462H8.33333V1.59013H3.66667V0.423462H2.5ZM1.91667 2.7568H2.5H3.66667H8.33333H9.5H10.0833V3.92346H1.91667V2.7568ZM1.91667 5.09013H10.0833V10.9235H1.91667V5.09013Z\"\r\n                                                fill=\"#424242\" />\r\n                                            <defs>\r\n                                                <linearGradient id=\"paint0_linear\" x1=\"0.75\" y1=\"6.25668\" x2=\"12.8466\"\r\n                                                    y2=\"6.25668\" gradientUnits=\"userSpaceOnUse\">\r\n                                                    <stop stop-color=\"#606164\" />\r\n                                                    <stop offset=\"1\" stop-color=\"#424242\" />\r\n                                                </linearGradient>\r\n                                            </defs>\r\n                                        </svg>\r\n                                        <!-- <img src=\"../../assets/calendar.png\" /> -->\r\n                                        {{ experience.date | date:'fullDate' }}</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"search-result__block search-result__block--scrolling\" *ngIf=\"searchResponse?.hosts?.length\">\r\n            <div class=\"search-result__block-heading\">\r\n                <h3 class=\"search-result__block-title\">host</h3>\r\n            </div>\r\n            <ul class=\"search-result__block-list\">\r\n                <li *ngFor=\"let host of searchResponse.hosts\">\r\n                    <a (click)=\"navigateToLink(host.link)\">\r\n                        <div class=\"search-list-block\">\r\n                            <div class=\"search-list-block__img\" [style.backgroundImage]=\"'url('+ host?.img_url +')'\">\r\n                            </div>\r\n                            <div class=\"search-list-block__info\">\r\n                                <h3 class=\"search-list-block__title\" [innerHtml]=\"host?.title\"></h3>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>", styles: [".search-module{position:relative}.search-result{background:#fff;box-shadow:0 4px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.16);border-radius:4px;max-width:413px;font-family:Montserrat,sans-serif;position:absolute;width:100%;top:calc(100% + 5px);left:0}.search-result__head{margin:0 24px;padding:27px 3px;border-bottom:1px solid #dbdbdb;display:flex;align-items:center}.search-result__icon{margin-right:10px}.search-result__title{font-family:Montserrat,sans-serif;font-size:14px;line-height:150%;color:#303030}.search-result__block{padding:24px 26px 16px 0}.search-result__block-heading{display:flex;justify-content:space-between;align-items:flex-start}.search-result__block-heading a{font-weight:500;font-size:12px;line-height:20px;color:#888;text-decoration:none}.search-result__block-title{font-weight:800;font-size:14px;line-height:150%;margin:0 0 16px 24px;text-transform:uppercase;background:#ff7a59;background:linear-gradient(90deg,#ff7a59,#ef6340);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.search-result__block-list{margin:0;padding:0;list-style-type:none}.search-result__block-list li{margin-bottom:4px;padding:8px 0}.search-result__block-list li:last-child{margin-bottom:0}.search-result__block-list a{padding:0 8px 0 40px;font-size:14px;line-height:150%;color:#303030;display:block;text-decoration:none;transition:all .5s ease}.search-result__block-list a:hover{background:#f7f7f7}.search-result__block--scrolling{padding-right:8px}.search-result__block--scrolling .search-result__block-list{max-height:200px;overflow-y:scroll}.search-result__block--scrolling .search-result__block-list li{padding:0 8px 0 0}.search-result__block--scrolling .search-result__block-list a{padding:8px 8px 8px 40px;cursor:pointer}.search-result ::-webkit-scrollbar{width:8px}.search-result ::-webkit-scrollbar-thumb{background:#dbdbdb;opacity:.8;border-radius:30px}.search-result ::-webkit-scrollbar-thumb:hover{background:#dbdbdb;opacity:1}.search-list-block{display:flex;align-items:center}.search-list-block__img{height:32px;width:32px;background-position:50%;background-size:cover;border-radius:50%;border:.633333px solid #dbdbdb;margin-right:16px}.search-list-block__title{font-size:14px;line-height:120%;color:#303030;font-weight:400;margin:0}.search-list-block__content{margin-top:4px;font-weight:600;font-size:10px;line-height:120%;text-transform:uppercase;color:#888}.search-list-block__date{margin-left:8px;border-left:1px solid #dbdbdb;padding-left:9px;font-weight:500;font-size:12px;line-height:110%;color:#424242;text-transform:capitalize;display:inline-flex;align-items:center}.search-list-block__date img{margin-right:6px}.search-list-block--blog .search-list-block__title{text-transform:capitalize}.search-list-block--blog .search-list-block__img{width:64px;height:46px;border-radius:4px 4px 4px 0;border:none}form{display:flex}.loader{border-radius:50%;border:3px solid #f3f3f3;border-top-color:#3498db;width:20px;height:20px;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "date": i3.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.4", ngImport: i0, type: MyLibComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'my-angular-search',
                    templateUrl: './my-lib.component.html',
                    styleUrls: ['./my-lib.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktbGliLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL215LWxpYi9zcmMvbGliL215LWxpYi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9teS1saWIvc3JjL2xpYi9teS1saWIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFRbEQsTUFBTSxPQUFPLGNBQWM7SUFNekIsWUFDVSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTmhDLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGFBQVEsR0FBRyxxQ0FBcUMsQ0FBQztRQUNqRCxVQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFHdkIsQ0FBQztJQUVMLFFBQVE7SUFDUixDQUFDO0lBRUQ7O01BRUU7SUFDRixhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDcEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ1I7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLHVDQUF1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQ2hILElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO2dCQUMxQixJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLE1BQUEsTUFBQSxJQUFJLENBQUMsY0FBYywwQ0FBRSxVQUFVLDBDQUFFLE1BQU0sRUFBRTtvQkFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7d0JBQ25ELFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUE7b0JBQy9GLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLFdBQVcsMENBQUUsTUFBTSxFQUFFO29CQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTt3QkFDdEQsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQTtvQkFDbkcsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsS0FBSywwQ0FBRSxNQUFNLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFBO29CQUN2RixDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtZQUN4QixDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxjQUFjLENBQUMsR0FBVztRQUN4QixJQUFJLGFBQWEsR0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQixhQUFhLElBQUksU0FBUyxDQUFDO1NBQzVCO1FBQ0QsYUFBYSxJQUFJLEdBQUcsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDOzsyR0F0RVUsY0FBYzsrRkFBZCxjQUFjLHlEQ1IzQiw0OU1BMkZNOzJGRG5GTyxjQUFjO2tCQUwxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFdBQVcsRUFBRSx5QkFBeUI7b0JBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdteS1hbmd1bGFyLXNlYXJjaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9teS1saWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9teS1saWIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNeUxpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlYXJjaGVkVGV4dDogc3RyaW5nID0gXCJcIjtcbiAgQkFTRV9VUkwgPSAnaHR0cHM6Ly91ay5mdW56aW5nLnNwYWNlOjQ0My9hcGkvdjInO1xuICB0aW1lcjogYW55ID0gbnVsbDtcbiAgc2VhcmNoUmVzcG9uc2U6IGFueSA9IHt9O1xuICBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbiAgXG4gIC8qKlxuICAqIEZ1bmN0aW9uIEV4ZWN1dGUgd2hlbiB1c2VyIHR5cGUgc29tZXRoaW5nIGluIHRleHQgaW5wdXQgYWZ0ZXIgdGltZW91dCBvZiA1MDBcbiAgKi9cbiAgb25JbnB1dENoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hlZFRleHQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5tYWtlQVBJQ2FsbCgpXG4gICAgICB9LCA1MDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UgPSB7fTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBmZXRjaCByZWNvcmRzIGZyb20gc2VydmVyIGFuZCBtb2RpZnkgdGhhdCBmb3IgaGlnaGxpZ2h0IHNlYXJjaGVkIHdvcmRcbiAgICovXG4gIG1ha2VBUElDYWxsKCkge1xuICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UgPSB7fTtcbiAgICBpZiAodGhpcy5zZWFyY2hlZFRleHQpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaHR0cENsaWVudC5nZXQoYCR7dGhpcy5CQVNFX1VSTH0vYXV0b19jb21wbGV0ZV9zZWFyY2hlcj9zZWFyY2hfdGV4dD0ke3RoaXMuc2VhcmNoZWRUZXh0fWApLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UgPSByZXM7XG4gICAgICAgIGxldCByZXBsYWNlV29yZCA9IG5ldyBSZWdFeHAodGhpcy5zZWFyY2hlZFRleHQsIFwiZ2lcIik7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFJlc3BvbnNlPy5jYXRlZ29yaWVzPy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFJlc3BvbnNlLmNhdGVnb3JpZXMubWFwKChjYXRlZ29yeTogYW55KSA9PiB7XG4gICAgICAgICAgICBjYXRlZ29yeS50aXRsZSA9IGNhdGVnb3J5LnRpdGxlLnJlcGxhY2UocmVwbGFjZVdvcmQsIChzdHI6IGFueSkgPT4gYDxzdHJvbmc+JHtzdHJ9PC9zdHJvbmc+YClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXNwb25zZT8uZXhwZXJpZW5jZXM/Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UuZXhwZXJpZW5jZXMubWFwKChleHBlcmllbmNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGV4cGVyaWVuY2UudGl0bGUgPSBleHBlcmllbmNlLnRpdGxlLnJlcGxhY2UocmVwbGFjZVdvcmQsIChzdHI6IGFueSkgPT4gYDxzdHJvbmc+JHtzdHJ9PC9zdHJvbmc+YClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXNwb25zZT8uaG9zdHM/Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UuaG9zdHMubWFwKChob3N0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGhvc3QudGl0bGUgPSBob3N0LnRpdGxlLnJlcGxhY2UocmVwbGFjZVdvcmQsIChzdHI6IGFueSkgPT4gYDxzdHJvbmc+JHtzdHJ9PC9zdHJvbmc+YClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIGZvciBuYXZpZ2F0ZSB0byBnaXZlbiBleHRlcm5hbCB1cmxcbiAgICogQHBhcmFtIHVybCBzdHJpbmcgbmF2aWdhdGlvbiB1cmxcbiAgICovXG4gIG5hdmlnYXRlVG9MaW5rKHVybDogc3RyaW5nKSB7XG4gICAgbGV0IHVybE5hdmlnYXRpb246IHN0cmluZyA9ICcnO1xuICAgIGlmICghL15odHRwW3NdPzpcXC9cXC8vLnRlc3QodXJsKSkge1xuICAgICAgdXJsTmF2aWdhdGlvbiArPSAnaHR0cDovLyc7XG4gICAgfVxuICAgIHVybE5hdmlnYXRpb24gKz0gdXJsO1xuICAgIHdpbmRvdy5vcGVuKHVybE5hdmlnYXRpb24sICdfYmxhbmsnKTtcbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwic2VhcmNoLW1vZHVsZVwiPlxyXG4gICAgPGZvcm0+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoZWRUZXh0XCIgWyhuZ01vZGVsKV09XCJzZWFyY2hlZFRleHRcIlxyXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbklucHV0Q2hhbmdlKClcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIiAqbmdJZj1cImlzTG9hZGluZ1wiPjwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRcIiAqbmdJZj1cInNlYXJjaFJlc3BvbnNlPy5jYXRlZ29yaWVzPy5sZW5ndGggfHwgc2VhcmNoUmVzcG9uc2U/LmV4cGVyaWVuY2VzPy5sZW5ndGggfHwgc2VhcmNoUmVzcG9uc2U/Lmhvc3RzPy5sZW5ndGhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdF9faGVhZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdF9faWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE1XCIgdmlld0JveD1cIjAgMCAxNiAxNVwiIGZpbGw9XCJub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEwLjUyODEgOS40MjgwOEgxMS4yMTM1TDE1LjUgMTMuNzEzNUwxNC4yMTQ2IDE1TDkuOTI5MjMgMTAuNzEzNVYxMC4wMjgxTDkuNjcwNzcgOS43NzA3N0M4LjcyODA4IDEwLjYyODEgNy40NDI2OSAxMS4xNDI3IDYuMDcwNzcgMTEuMTQyN0MyLjk4NTM4IDExLjE0MjcgMC41IDguNjU3MzEgMC41IDUuNTcwNzdDMC41IDIuNDg1MzggMi45ODUzOCAwIDYuMDcwNzcgMEM5LjE1NjE1IDAgMTEuNjQxNSAyLjQ4NTM4IDExLjY0MTUgNS41NzA3N0MxMS42NDE1IDYuOTQyNjkgMTEuMTI4MSA4LjIyODA4IDEwLjI3MTkgOS4xNzA3N0wxMC41MjgxIDkuNDI4MDhaTTYuMDcwNzcgMS43MTM0NkMzLjkyODA4IDEuNzEzNDYgMi4yMTM0NiAzLjQyOTIzIDIuMjEzNDYgNS41NzA3N0MyLjIxMzQ2IDcuNzE0NjIgMy45MjgwOCA5LjQyODA4IDYuMDcwNzcgOS40MjgwOEM4LjIxMzQ2IDkuNDI4MDggOS45MjkyMyA3LjcxNDYyIDkuOTI5MjMgNS41NzA3N0M5LjkyOTIzIDMuNDI5MjMgOC4yMTM0NiAxLjcxMzQ2IDYuMDcwNzcgMS43MTM0NlpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwidXJsKCNwYWludDBfbGluZWFyKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cInBhaW50MF9saW5lYXJcIiB4MT1cIjAuNVwiIHkxPVwiNy40OTk4MVwiIHgyPVwiMTUuNVwiIHkyPVwiNy40OTk4MVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9XCIjRkY3QTU5XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wLWNvbG9yPVwiI0VGNjM0MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdF9fdGl0bGVcIj5TZWFyY2ggcmVzdWx0cyBmb3IgPHN0cm9uZz7igJh7e3NlYXJjaGVkVGV4dH194oCZPC9zdHJvbmc+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrIHNlYXJjaC1yZXN1bHRfX2Jsb2NrLS1zY3JvbGxpbmdcIiAqbmdJZj1cInNlYXJjaFJlc3BvbnNlPy5jYXRlZ29yaWVzPy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLXRpdGxlXCI+Y2F0ZWdvcmllcyBhbmQgaW50ZXJlc3RzPC9oMz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2Ygc2VhcmNoUmVzcG9uc2UuY2F0ZWdvcmllc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJuYXZpZ2F0ZVRvTGluayhjYXRlZ29yeS5saW5rKVwiIFtpbm5lckh0bWxdPVwiY2F0ZWdvcnkudGl0bGVcIj48L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0X19ibG9ja1wiICpuZ0lmPVwic2VhcmNoUmVzcG9uc2U/LmV4cGVyaWVuY2VzPy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLXRpdGxlXCI+ZXhwZXJpZW5jZXM8L2gzPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5TaG93IG1vcmUgcmVzdWx0czwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZXhwZXJpZW5jZSBvZiBzZWFyY2hSZXNwb25zZS5leHBlcmllbmNlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJuYXZpZ2F0ZVRvTGluayhleHBlcmllbmNlLmxpbmspXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtbGlzdC1ibG9jayBzZWFyY2gtbGlzdC1ibG9jay0tYmxvZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1saXN0LWJsb2NrX19pbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiJ3VybCgnKyBleHBlcmllbmNlPy5pbWdfdXJsICsnKSdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1saXN0LWJsb2NrX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwic2VhcmNoLWxpc3QtYmxvY2tfX3RpdGxlXCIgW2lubmVySHRtbF09XCJleHBlcmllbmNlPy50aXRsZVwiPjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1saXN0LWJsb2NrX19jb250ZW50XCI+e3tleHBlcmllbmNlPy5sb2NhdGlvbn19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoLWxpc3QtYmxvY2tfX2RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIxMlwiIGhlaWdodD1cIjEzXCIgdmlld0JveD1cIjAgMCAxMiAxM1wiIGZpbGw9XCIjNDI0MjQyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0yLjUgMC40MjM0NjJWMS41OTAxM0gxLjkxNjY3QzEuMjc1IDEuNTkwMTMgMC43NSAyLjExNTEzIDAuNzUgMi43NTY4VjEwLjkyMzVDMC43NSAxMS41NjUxIDEuMjc1IDEyLjA5MDEgMS45MTY2NyAxMi4wOTAxSDEwLjA4MzNDMTAuNzI1IDEyLjA5MDEgMTEuMjUgMTEuNTY1MSAxMS4yNSAxMC45MjM1VjIuNzU2OEMxMS4yNSAyLjExNTEzIDEwLjcyNSAxLjU5MDEzIDEwLjA4MzMgMS41OTAxM0g5LjVWMC40MjM0NjJIOC4zMzMzM1YxLjU5MDEzSDMuNjY2NjdWMC40MjM0NjJIMi41Wk0xLjkxNjY3IDIuNzU2OEgyLjVIMy42NjY2N0g4LjMzMzMzSDkuNUgxMC4wODMzVjMuOTIzNDZIMS45MTY2N1YyLjc1NjhaTTEuOTE2NjcgNS4wOTAxM0gxMC4wODMzVjEwLjkyMzVIMS45MTY2N1Y1LjA5MDEzWlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjNDI0MjQyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwicGFpbnQwX2xpbmVhclwiIHgxPVwiMC43NVwiIHkxPVwiNi4yNTY2OFwiIHgyPVwiMTIuODQ2NlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5Mj1cIjYuMjU2NjhcIiBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9XCIjNjA2MTY0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wLWNvbG9yPVwiIzQyNDI0MlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2NhbGVuZGFyLnBuZ1wiIC8+IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZXhwZXJpZW5jZS5kYXRlIHwgZGF0ZTonZnVsbERhdGUnIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRfX2Jsb2NrIHNlYXJjaC1yZXN1bHRfX2Jsb2NrLS1zY3JvbGxpbmdcIiAqbmdJZj1cInNlYXJjaFJlc3BvbnNlPy5ob3N0cz8ubGVuZ3RoXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0X19ibG9jay1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJzZWFyY2gtcmVzdWx0X19ibG9jay10aXRsZVwiPmhvc3Q8L2gzPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwic2VhcmNoLXJlc3VsdF9fYmxvY2stbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBob3N0IG9mIHNlYXJjaFJlc3BvbnNlLmhvc3RzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm5hdmlnYXRlVG9MaW5rKGhvc3QubGluaylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1saXN0LWJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWxpc3QtYmxvY2tfX2ltZ1wiIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiJ3VybCgnKyBob3N0Py5pbWdfdXJsICsnKSdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1saXN0LWJsb2NrX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwic2VhcmNoLWxpc3QtYmxvY2tfX3RpdGxlXCIgW2lubmVySHRtbF09XCJob3N0Py50aXRsZVwiPjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj4iXX0=