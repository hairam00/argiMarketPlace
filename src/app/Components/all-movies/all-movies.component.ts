import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
movies: any;
hideFilter: boolean = false;
selected: string = ''
@ViewChild('category', { static: true }) input: ElementRef | undefined;
  constructor(private router: Router, private restService: RestService, private _snackBar: MatSnackBar, private title: Title) {
    this.title.setTitle('Products')
   }
  ngAfterViewInit() {
  }
  ngOnInit(): void {
    if(this.router.url == '/all-products/upcoming'){
      this.getMovieCategory('Upcoming');
      this.hideFilter = true;
    }else if(this.router.url == '/all-products/now-showing'){
      this.getMovieCategory('Now');
      this.hideFilter = true;
    }else{
      this.getMovies();
      this.hideFilter = false;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, '', {
      duration: 1000
    });
  }
  getMovies(){
    this.restService.getMovies().subscribe(response => {
      this.movies = response;
    });
  }

  getMovieCategory(release: string){
    if(release == 'All'){
      this.getMovies();
      this.openSnackBar("All Products","x");
    }else{
      this.restService.getMovies().subscribe(response => {
        if(response.length){
          this.movies = response.filter((product: any) => product.release == release);
        }else{
          this.openSnackBar("No Product found ", "x");
        }
      });
    }
  }
  reload(movieId:string, movieName:string){
    this.router.navigate(['/movies',movieId,movieName])
    .then(() => {
    this.ngOnInit();
    });
  }
  clear(){
    this.getMovies();
    this.selected = 'All'
    this.openSnackBar("Showing All Products", "x");
    let a = this.input?.nativeElement.value;
    a = "All";
  }
}
