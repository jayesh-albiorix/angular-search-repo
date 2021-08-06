import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-angular-search',
  templateUrl: './my-lib.component.html',
  styleUrls: ['./my-lib.component.scss']
})
export class MyLibComponent implements OnInit {
  searchedText: string = "";
  BASE_URL = 'https://uk.funzing.space:443/api/v2';
  timer: any = null;
  searchResponse: any = {};
  isLoading: boolean = false;
  @Input() type: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function Execute when user type something in text input after timeout of 500
   */
  onInputChange() {
    if (this.searchedText && this.type !== 'web') {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.makeAPICall()
      }, 500)
    } else {
      this.searchResponse = {};
    }
  }

  onSearch() {
    if (this.searchedText) {
      this.makeAPICall();
    } else {
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
        this.searchResponse = res;
        let replaceWord = new RegExp(this.searchedText, "gi");
        if (this.searchResponse?.categories?.length) {
          this.searchResponse.categories.map((category: any) => {
            category.title = category.title.replace(replaceWord, (str: string) => `<strong>${str}</strong>`)
          });
        }
        if (this.searchResponse?.experiences?.length) {
          this.searchResponse.experiences.map((experience: any) => {
            experience.title = experience.title.replace(replaceWord, (str:string) => `<strong>${str}</strong>`)
          });
        }
        if (this.searchResponse?.hosts?.length) {
          this.searchResponse.hosts.map((host:any) => {
            host.title = host.title.replace(replaceWord, (str:string) => `<strong>${str}</strong>`)
          });
        }
        this.isLoading = false
      }, error => {
        this.isLoading = false
      })
    }
  }

  /**
   * function for navigate to given external url
   * @param url string navigation url
   */
  navigateToLink(url: string) {
    let urlNavigation: string = '';
    if (!/^http[s]?:\/\//.test(url)) {
      urlNavigation += 'http://';
    }
    urlNavigation += url;
    window.open(urlNavigation, '_blank');
  }

}
