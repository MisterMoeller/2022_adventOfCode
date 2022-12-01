import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Day1Component} from "./components/day1/day1.component";
import {Day19Component} from "./components/day19/day19.component";
import {Day24Component} from "./components/day24/day24.component";
import {Day23Component} from "./components/day23/day23.component";
import {Day22Component} from "./components/day22/day22.component";
import {Day21Component} from "./components/day21/day21.component";
import {Day20Component} from "./components/day20/day20.component";
import {Day18Component} from "./components/day18/day18.component";
import {Day17Component} from './components/day17/day17.component';
import {Day16Component} from "./components/day16/day16.component";
import {Day15Component} from "./components/day15/day15.component";
import {Day14Component} from "./components/day14/day14.component";
import {Day13Component} from "./components/day13/day13.component";
import {Day12Component} from "./components/day12/day12.component";
import {Day11Component} from "./components/day11/day11.component";
import {Day10Component} from "./components/day10/day10.component";
import {Day4Component} from "./components/day4/day4.component";
import {Day5Component} from "./components/day5/day5.component";
import {Day6Component} from "./components/day6/day6.component";
import {Day7Component} from "./components/day7/day7.component";
import {Day8Component} from "./components/day8/day8.component";
import {Day9Component} from "./components/day9/day9.component";
import {Day2Component} from "./components/day2/day2.component";
import {Day3Component} from "./components/day3/day3.component";

const routes: Routes = [
  {
    path: "1",
    component: Day1Component
  }, {
    path: "2",
    component: Day2Component
  }, {
    path: "3",
    component: Day3Component
  }, {
    path: "4",
    component: Day4Component
  }, {
    path: "5",
    component: Day5Component
  }, {
    path: "6",
    component: Day6Component
  }, {
    path: "7",
    component: Day7Component
  }, {
    path: "8",
    component: Day8Component
  }, {
    path: "9",
    component: Day9Component
  }, {
    path: "10",
    component: Day10Component
  }, {
    path: "11",
    component: Day11Component
  }, {
    path: "12",
    component: Day12Component
  }, {
    path: "13",
    component: Day13Component
  }, {
    path: "14",
    component: Day14Component
  }, {
    path: "15",
    component: Day15Component
  }, {
    path: "16",
    component: Day16Component
  }, {
    path: "17",
    component: Day17Component
  }, {
    path: "18",
    component: Day18Component
  }, {
    path: "19",
    component: Day19Component
  }, {
    path: "20",
    component: Day20Component
  }, {
    path: "21",
    component: Day21Component
  }, {
    path: "22",
    component: Day22Component
  }, {
    path: "23",
    component: Day23Component
  }, {
    path: "24",
    component: Day24Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
