import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Sidebar from './../../sidebar'
import Informer from './../../../components/informer/main'
import ApiReport from './../../../api/Reports'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";


import DatePicker, {registerLocale} from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import ru from "date-fns/locale/ru";
registerLocale("ru", ru)

var projectModels,
    sectionModels

class reportMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user : this.props.user,
            projects : 0,
            models : 0,
            activeProjects : 0,
            activeModels : 0,
            projectsArray : [],
            activeProjectsArray: [],
            modelsArray : [],
            activeModelsArray : [],

            projectsModels : [],
            sectionsModels : [],

            sortedProjectsModels : [],
            sortedSectionsModels : [],

            minDate:null,
            maxDate:null,

            dateStart: null,
            dateEnd: null,
        }

    }

    componentDidMount() {

        projectModels = am5.Root.new("projectModels")
        sectionModels = am5.Root.new("sectionModels")

        this.projects()
        this.models()
        this.projectModels()
        this.sectionModels()

    }

    setStartDate = (event) => {
        this.setState({
            dateStart : new Date(event)
        })
        this.sortProjectsModels(this.state.projectsModels, new Date(event))
        this.sortSectionsModels(this.state.sectionsModels, new Date(event))
        this.sortProjects(this.state.projectsArray, this.state.activeProjectsArray, new Date(event))
        this.sortModels(this.state.modelsArray, this.state.activeModelsArray, new Date(event))
    }
    setEndDate = (event) => {
        this.setState({
            dateEnd : new Date(event)
        })
    }

    sortProjects = (projects, activeProjects, startDate) => {
        let sortedProjects = [],
            sortedActiveProjects = []
        projects.filter(project => {
            if (new Date(project.created_at) >= new Date(startDate)){
                sortedProjects.push(project)
            }
        })
        activeProjects.filter(project => {
            if (new Date(project.created_at) >= new Date(startDate)){
                sortedActiveProjects.push(project)
            }
         })
        this.setState({
            projects: sortedProjects.length,
            activeProjects: sortedActiveProjects.length
        })
    }

    sortModels = (models, activeModels, startDate) => {
        let sortedModels = [],
            sortedActiveModels = []
        models.filter(model => {
            if (new Date(model.created_at) >= new Date(startDate)){
                sortedModels.push(model)
            }
        })
        activeModels.filter(model => {
            if (new Date(model.created_at) >= new Date(startDate)){
                sortedActiveModels.push(model)
            }
         })
        this.setState({
            models: sortedModels.length,
            activeModels: sortedActiveModels.length
        })
    }

    sortProjectsModels = (eventProjects, selectedDate) => {
        let projects=[]

        if (eventProjects)
        eventProjects.filter(project => {
            let projectItem = {
                id : project.id,
                name : project.name,
                created_at : project.created_at,
                models : [],
                activeModels : [],
            }

            if (new Date(project.created_at) >= new Date(selectedDate))
                if (project.models.length > 0){
                    project.models.filter(model => {
                        projectItem.models.push(model)
                        if (model.check_list){
                            projectItem.activeModels.push(model)
                        }
                    })
                }


            projects.push(projectItem)
        })

        this.setState({
            sortedProjectsModels : projects,
        })

        projectModels.dispose();
        projectModels = am5.Root.new("projectModels")

        this.graphProjectsModels(projects)
    }

    sortSectionsModels = (eventProjects, selectedDate) => {

        let projects=[]

        if (eventProjects)
        eventProjects.filter(project => {
            let projectItem = {
                id : project.id,
                name : project.name,
                created_at : project.created_at,
                models : [],
                activeModels : [],
            }
            //console.log('Section Models : ')
            //console.log(new Date(project.created_at))
            //console.log(new Date(this.state.dateStart))
            //console.log(new Date(project.created_at) >=  new Date(selectedDate))
            if (new Date(project.created_at) >= new Date(selectedDate))
                if (project.models.length > 0){
                    project.models.filter(model => {
                        projectItem.models.push(model)
                        if (model.check_list){
                            projectItem.activeModels.push(model)
                        }
                    })
                }
            projects.push(projectItem)
        })
        console.log(projects)
        this.setState({
            sortedSectionsModels : projects,
        })

        sectionModels.dispose()
        sectionModels = am5.Root.new("sectionModels")

        this.graphSectionsModels(projects)
    }

    graphProjectsModels = (projects) => {

        let root
        let chart
        root = projectModels
        root.setThemes([
          am5themes_Animated.new(root)
        ]);

        chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,

          wheelX: "panX",
          wheelY: "panY",
          layout: root.verticalLayout
        }));

        let legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }))

        let data = []
        projects.filter(project => {
            let item = {}
            item.name = project.name
            item.income = project.models.length
            item.expenses = project.activeModels.length
            data.push(item)
        })


        var yRenderer = am5xy.AxisRendererY.new(root, {
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
        })

        yRenderer.labels.template.set('centerX', 100)
        yRenderer.labels.template.set('width', 100)

        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "name",

          width: 100,
          marginLeft: 0,
          maskContent:true,

          renderer : yRenderer
        }));

        //yAxis.labels.template.set('visible', false)

        yAxis.data.setAll(data);


        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          min: 0
        }));

        function createSeries(field, myName) {
          let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: myName,
            getName: myName,
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: field,
            categoryYField: "name",
            sequencedInterpolation: true,

            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "[bold]{name}[/] \n {getName} : \n  {valueX}"
            })
          }));

          series.columns.template.setAll({
            height: am5.p100
          });


          series.bullets.push(function() {
            return am5.Bullet.new(root, {
              locationX: 1,
              locationY: 0.5,
              sprite: am5.Label.new(root, {
                centerY: am5.p50,
                text: "{valueX}",
                populateText: true
              })
            });
          });

          series.bullets.push(function() {
            return am5.Bullet.new(root, {
              locationX: 1,
              locationY: 0.5,
              sprite: am5.Label.new(root, {
                centerX: am5.p100,
                centerY: am5.p50,
                //text: "{name}",
                fill: am5.color(0xffffff),
                populateText: true
              })
            });
          });

          series.data.setAll(data);
          series.appear();

          return series;
        }

        createSeries("income", "Моделей всего");
        createSeries("expenses", "Активных моделей");

        let legend2 = chart.children.push(am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        }));

        legend2.data.setAll(chart.series.values);

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          /*behavior: "zoomY"*/
        }));
        cursor.lineY.set("forceHidden", true);
        cursor.lineX.set("forceHidden", true);

        chart.appear(100, 100);

        return () => {
            root.dispose();
        }
    }

    graphSectionsModels = (sections) => {
        let root
                let chart
                root = sectionModels
                root.setThemes([
                  am5themes_Animated.new(root)
                ]);

                chart = root.container.children.push(am5xy.XYChart.new(root, {
                  panX: false,
                  panY: false,
                  wheelX: "panX",
                  wheelY: "panY",
                  layout: root.verticalLayout
                }));

                let legend = chart.children.push(am5.Legend.new(root, {
                  centerX: am5.p50,
                  x: am5.p50
                }))

                let data = []
                sections.filter(project => {
                    let item = {}
                    item.name = project.name
                    item.income = project.models.length
                    item.expenses = project.activeModels.length
                    data.push(item)
                })

                var yRenderer = am5xy.AxisRendererY.new(root, {
                    inversed: true,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                })

                yRenderer.labels.template.set('centerX', 100)

                let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
                  categoryField: "name",

                  width: 100,
                  marginLeft: 0,
                  maskContent:true,

                  renderer : yRenderer
                }));

                yAxis.data.setAll(data);

                let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                  renderer: am5xy.AxisRendererX.new(root, {}),
                  min: 0
                }));

                function createSeries(field, myName) {
                  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: myName,
                    getName: myName,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: field,
                    categoryYField: "name",
                    sequencedInterpolation: true,
                    tooltip: am5.Tooltip.new(root, {
                      pointerOrientation: "horizontal",
                      labelText: "[bold]{name}[/] \n {getName} : \n  {valueX}"
                    })
                  }));

                  series.columns.template.setAll({
                    height: am5.p100
                  });


                  series.bullets.push(function() {
                    return am5.Bullet.new(root, {
                      locationX: 1,
                      locationY: 0.5,
                      sprite: am5.Label.new(root, {
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true
                      })
                    });
                  });

                  series.bullets.push(function() {
                    return am5.Bullet.new(root, {
                      locationX: 1,
                      locationY: 0.5,
                      sprite: am5.Label.new(root, {
                        centerX: am5.p100,
                        centerY: am5.p50,
                        //text: "{name}",
                        fill: am5.color(0xffffff),
                        populateText: true
                      })
                    });
                  });

                  series.data.setAll(data);
                  series.appear();

                  return series;
                }

                createSeries("income", "Моделей всего");
                createSeries("expenses", "Активных моделей");

                let legend2 = chart.children.push(am5.Legend.new(root, {
                  centerX: am5.p50,
                  x: am5.p50
                }));

                legend2.data.setAll(chart.series.values);

                let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                  /*behavior: "zoomY"*/
                }));
                cursor.lineY.set("forceHidden", true);
                cursor.lineX.set("forceHidden", true);

                chart.appear(100, 100);

                return () => {
                    root.dispose();
                }
    }

    componentWillUnmount() {

    }

    projectModels = () => {
        ApiReport.getProjectModels({
            /*'dateStart':this.state.dateStart,
            'dateEnd':this.state.dateEnd*/
        })
        .then(response => {
            let projects = []

            let minDate = new Date()
            let maxDate = new Date("2013.01.01")

            response.data.models.filter(project => {
                if (new Date(project.created_at) < minDate){
                    minDate = new Date(project.created_at)
                }
                if (new Date(project.created_at) > maxDate){
                    maxDate = new Date(project.created_at)
                }
                let projectItem = {
                    id : project.id,
                    name : project.name,
                    created_at : project.created_at,
                    models : [],
                    activeModels : [],
                }
                if (project.objects.length > 0){
                    project.objects.filter(object => {
                        if (object.models.length > 0){
                            object.models.filter(model => {
                                projectItem.models.push(model)
                                if (model.check_list){
                                    projectItem.activeModels.push(model)
                                }
                            })
                        }
                    })
                }
                projects.push(projectItem)
            })

            this.setState({
                projectsModels : projects,
                sortedProjectsModels : projects,

                dateStart : minDate,
                dateEnd : maxDate,
                minDate: minDate,
                maxDate: maxDate
            })
            this.graphProjectsModels(projects)
        })
    }

    sectionModels = () => {
        ApiReport.getSectionModels()
        .then(response => {
            console.log(response.data)

            let sections = []
            response.data.models.filter(section => {
                let sectionItem = {
                    id : section.id,
                    name : section.name,
                    short_name : section.short_name,
                    created_at : section.created_at,
                    models : [],
                    activeModels : [],
                }

                if (section.models.length > 0){
                    section.models.filter(model => {
                        sectionItem.models.push(model)
                        if (model.check_list){
                            sectionItem.activeModels.push(model)
                        }
                    })
                }

                sections.push(sectionItem)
            })
            console.log(sections)
            this.setState({
                sectionsModels : sections,
                sortedSectionsModels : sections
            })
            this.graphSectionsModels(sections)
        })
    }

    projects = () => {
        ApiReport.getActiveProjects()
        .then(response => {
            console.log(response.data)
            this.setState({
                projects : response.data.projects.length,
                activeProjects : response.data.activeProjects.length,
                projectsArray : response.data.projects,
                activeProjectsArray : response.data.activeProjects
            })
        })
    }

    models = () => {
        ApiReport.getActiveModels()
        .then(response => {
            console.log(response.data)
            this.setState({
                models : response.data.models.length,
                activeModels : response.data.activeModels.length,
                modelsArray : response.data.models,
                activeModelsArray : response.data.activeModels
            })
        })
    }

    render(){

        let MainBlock = "col-12",
                sideBar, SideBarBlock, IndentLeft, IndentRight,
                Container = "container"

        if (sideBar){
            MainBlock = "col-8"
            IndentLeft = "col-1"
            IndentRight = "col-1"
            SideBarBlock = "col-2"
            Container = "container-fluid h-100"
        }
        //const [startDate, setStartDate] = useState(new Date());
        const startDate = new Date()

        let mainContent = (
            <div className="container-report-main row">
                <div className="col-12">
                    <h2 className="head-blue"> Проекты с применением ТИМ </h2>
                </div>
                <div className="col-6">
                    <div className="container-main_report-graph">
                        <p className="text-grey"> Период анализа </p>
                        <div className="block-main_report-datepicker">
                            <div>
                                <span className="text-grey"> С </span>
                                <DatePicker
                                    selected={this.state.dateStart}
                                    onChange={this.setStartDate}
                                    selectsStart
                                    startDate={this.state.dateStart}
                                    endDate={this.state.dateEnd}
                                    minDate={this.state.minDate}
                                    maxDate={this.state.dateEnd}
                                    dateFormat="dd.MM.yyyy"
                                    locale="ru"
                                />
                            </div>
                            <div>
                                <span className="text-grey"> По </span>

                                <DatePicker
                                    selected={this.state.dateEnd}
                                    onChange={this.setEndDate}
                                    selectsEnd
                                    startDate={this.state.dateStart}
                                    endDate={this.state.dateEnd}
                                    minDate={this.state.dateStart}
                                    maxDate={this.state.maxDate}
                                    dateFormat="dd.MM.yyyy"
                                    locale="ru"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-main_report-graph text-s20 text-blue">
                        <span> Активных проектов : {this.state.activeProjects} из {this.state.projects} </span>
                        <br/>
                        <span> Активных моделей : {this.state.activeModels} из {this.state.models} </span>

                    </div>
                </div>
                <div className="col-6">
                    <div className="container-main_report-graph">
                        <h5 className="text-blue-dark"> Количество моделей по проекту </h5>
                        <div id="projectModels" ></div>
                        <div id="chartdiv"></div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-main_report-graph">
                        <h5 className="text-blue-dark"> Количество моделей по разделу </h5>
                        <div id="sectionModels" ></div>
                    </div>
                </div>
            </div>
        )



        return (
            <div className={Container}>
                <div className="row h-100">
                    <div className={SideBarBlock}>
                        {sideBar}
                    </div>
                    <div className={IndentLeft}>
                    </div>
                    <div className={MainBlock}>
                        {mainContent}
                    </div>
                    <div className={IndentRight}>
                    </div>
                </div>
            </div>
        )



    }
}

export default reportMain