import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BucketlistItem} from "../../bucketlist/bucketlist-item";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-inspiration-header',
  templateUrl: './inspiration-header.component.html',
  styleUrls: ['./inspiration-header.component.css']
})
export class InspirationHeaderComponent implements OnInit, Input {

  @Input() budget: string;
  @Input() items: FirebaseListObservable<BucketlistItem[]>;
  @Output() onBudget = new EventEmitter<string>();
  public percentOfBudget: number;
  public totalCost: number;
  public editingBudget = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
        ticks: {
          suggestedMin: 0,
        }
      }]
    }
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }];

  public barChartData: any =
    [{data: []}]
  ;

  public updateBudget(budget: string): void {
    this.onBudget.emit(budget);
  }

  public toggleEditingBudget(): void {
    console.log("clicked")
    console.log(this.editingBudget);
    this.editingBudget = !this.editingBudget;
  }

  constructor() { }

  ngOnInit() {
    this.items
      .subscribe(items => {
        const aggregate = {};
        let totalCost = 0;
        for (const item of items) {
          if (item.bucketed) {
            totalCost += Number(item.price);
            if (item.room in aggregate) {
              aggregate[item.room] += Number(item.price);
            } else {
              aggregate[item.room] = Number(item.price);
            }
          }
        }
        this.setPercentageOfBudget(totalCost);
        this.totalCost =  totalCost;
        for (const room in aggregate) {
          this.barChartLabels.push(room);
          this.barChartData[0].data.push(aggregate[room]);
        }
        this.barChartLabels = Object.keys(aggregate);
      });
  }

  private setPercentageOfBudget(totalCost: number) {
    this.percentOfBudget = totalCost / Number(this.budget) * 100;
  }

}
