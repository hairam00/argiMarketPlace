import { HttpClient } from '@angular/common/http';
import {Message} from '../Classes/message'
import { Injectable } from '@angular/core';
import { NewsLetter } from '../Classes/news-letter';
import { Users } from '../Classes/users';
import { Whatsapp } from '../Classes/whatsapp';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }
  // urls
  userUrl : string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/users.json";
  newsletterUrl : string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/newsletter.json";
  whatsappUrl : string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/whatsapp.json";
  contactUrl : string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/contacts.json";
  movieUrl: string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com//products.json";
  eventUrl: string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/events.json";
  bookingUrl: string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/bookings.json";
  offerUrl: string = "https://agri-marketplace-6279f-default-rtdb.firebaseio.com/offers.json";
  // users sign up and login
  getUsers(){
    return this.http.get<Users[]>(this.userUrl);
  }
  createUser(user: Users){
    return this.http.post(this.userUrl, user);
  }
  getlogin(){
    return this.http.get<any[]>(this.userUrl);
  }
  // newsletters
  createNews(news: NewsLetter){
    return this.http.post(this.newsletterUrl, news);
  }
  // whatsapp Subscription
  createWhatsapp(wa: Whatsapp){
    return this.http.post(this.whatsappUrl, wa);
  }
  // contacts us messages
  createMessage(mg: Message){
    return this.http.post(this.contactUrl, mg);
  }
  //movies
  getMovie(id: string){
    return this.http.get<any[]>(this.movieUrl+"?id="+id);
  }
  getMovies(){
    return this.http.get<any[]>(this.movieUrl);
  }
  getMovieCarosul(limit: number){
    return this.http.get<any[]>(this.movieUrl+"?_limit="+limit);
  }
  getMovieRelease(category: string){
    return this.http.get<any[]>(this.movieUrl +"?release="+category);
  }
  //Events
  getEvents(){
    return this.http.get<any[]>(this.eventUrl);
  }
  getEvent(city:string){
    return this.http.get<any[]>(this.eventUrl+"?city="+city);
  }
  getEventCategory(category:string){
    return this.http.get<any[]>(this.eventUrl+'?category='+category);
  }
  getEventbyId(id:string){
    return this.http.get<any[]>(this.eventUrl+'?id='+id);
  }
  //bookings
  uploadBooking(data:any){
    return this.http.post(this.bookingUrl, data);
  }
  getBookings(){
    return this.http.get<any[]>(this.bookingUrl);
  }
  deleteBooking(id: number){
    return this.http.delete(this.bookingUrl + "/" + id);
  }
  //offers
  getOffers(filter:string){
    return this.http.get<any[]>(this.offerUrl + "?validation="+filter);
  }
}
