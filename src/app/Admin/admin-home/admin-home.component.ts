import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AdminserviceService } from 'src/app/Service/adminservice.service';
import { HomeService } from 'src/app/Service/home.service';
import { UserserviceService } from 'src/app/Service/userservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit  {
  public chart: any;
  countprod:any
  countuser:any
  countservice:any
  details:any
  cost:any
  searchby:any

  constructor(private uservice:UserserviceService,private hservice:HomeService,private service:AdminserviceService,private http:HttpClient){
    this.service.countofproduct().subscribe((coun)=>(this.countprod=coun))
    this.hservice.countofuser().subscribe((coun)=>(this.countuser=coun))
    this.uservice.countofservice().subscribe((coun)=>(this.countservice=coun))
    this.uservice.cost().subscribe((coun)=>this.cost=coun)

    const body ={
      'status':'Active'
    }
    this.uservice.getAllActiveSoftwares(body).subscribe((user) => {this.details = user
      
    });
    
    
  }
  
  seachchange(){
    if (this.searchby === 1) {
      // Filter details array to include items with validity equal to 1 (or the selected value)
      this.details = this.details.filter((item: { validity: number; }) => item.validity < 1);
    } else if (this.searchby === 7) {
      // Filter for WITHIN WEEK (adjust the condition as needed)
      this.details = this.details.filter((item: any) => item.validity < 30);
    } else if (this.searchby === 30) {
      // Filter for WITHIN MONTH (adjust the condition as needed)
      this.details = this.details.filter((item: any) => item.validity < 45);
    }
  }


  ngOnInit() {
    this.uservice.countswVu().subscribe(data => {

      const labels = Object.keys(data);

      const values = Object.values(data);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'System Count',
              data: values,
              backgroundColor: 'rgba(0, 0, 194, 0.4)', // Color for the bars
              borderColor: 'rgba(75, 192, 192, 1)', // Border color
              borderWidth: 1 // Border width
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}



 

