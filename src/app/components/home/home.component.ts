import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: string[]= [
      'MTB 29 Full Suspension',
      'Carbon Fiber Race Series',
      'Time Trial Blade',
  ];
  // bikeform: FormGroup;
  validMessage: string = "";
  bikeform: FormGroup = new FormGroup({});

  // const bikeform: FormGroup = new FormGroup();
 

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bikeform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl()
    });
  }

  submitRegistration(){
    if(this.bikeform.valid){
      this.validMessage = "Your bike registration has been submitted. Thanks !";
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else{
      this.validMessage = "Please fill out the form before submitting!";
    }

  }

}
