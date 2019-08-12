import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AmbientService } from 'src/app/services/ambient/ambient.service';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-ambient',
  templateUrl: './ambient.component.html',
  styleUrls: ['./ambient.component.scss']
})
export class AmbientComponent implements OnInit, OnDestroy {

  @ViewChild('googlechart', {static: true}) googlechart: GoogleChartComponent;
  chartData: google.visualization.DataTable;

  chart = {
    type: 'Gauge',
    data: [
      ['Temp F', 0],
      ['Humidity %', 0],
      ['Pressure Hg', 0]
    ],
    options: {
      width: 400,
      height: 120,
      greenFrom: 0,
      greenTo: 75,
      redFrom: 90,
      redTo: 130,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    }
  };
  constructor(private ambientService: AmbientService) {
  }

  ngOnInit() {
    this.ambientService.connect();
    // Initialize google chart
    this.googlechart.data = this.chart.data;
    setInterval(() => {
      const chartWrapper = this.googlechart.wrapper;
      this.chart.data[0][1] = this.ambientService.tempF === undefined ? 0 : Math.floor(this.ambientService.tempF);
      this.chart.data[1][1] = this.ambientService.humidity === undefined ? 0 : Math.floor(this.ambientService.humidity);
      this.chart.data[2][1] = this.ambientService.pressureHg === undefined ? 0 : Math.floor(this.ambientService.pressureHg);
      this.chartData = google.visualization.arrayToDataTable(this.chart.data, true);
      chartWrapper.setDataTable(this.chartData);
      chartWrapper.draw();
    }, 2000);
  }

  ngOnDestroy() {
    this.ambientService.disconnect();
  }
}
