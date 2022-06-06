import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { Routes, Route, useParams, Link } from 'react-router-dom';

/* import images */
import MenuManufacture from '../../src/images/menu/manufacture.png'
import MenuTrain from '../../src/images/menu/train.png'
import MenuRoad from '../../src/images/menu/road.png'
import MenuUser from '../../src/images/menu/user-circle.svg'
import MenuSearch from '../../src/images/menu/search.svg'
import Report from '../../src/images/menu/shmidt.png'
import Settings from '../../src/images/menu/gear.png'

/* import components */
import ApiProj from './../api/Projects'

let projectMenu,
    mainMenu,
    settingsMenu,
    projectData

const MYheader = (props) => {

    const [projectInfo, resultProjectData] = useState(null);
    const params = useParams()

    console.log(props)

    if (props.head == "project"){
        const projectId = params.projId

        if (!projectInfo){
            ApiProj.getProject({projectId : projectId})
            .then( res => {
                console.log( res.data )
                resultProjectData(res.data.project)
            })
        }

        settingsMenu = (
            <>
                <li>
                    <img src={Report} />
                </li>
                <li>
                    <Link to={"/settings"}>
                        <img src={Settings} />
                    </Link>
                </li>
            </>
        )

        let projectCode,
            projectName

        if (projectInfo){
            if (projectInfo.code)
                projectCode = projectInfo.code
            if (projectInfo.name)
                projectName = projectInfo.name
        }

        projectData = (
            <>
                <div className="col d-flex align-items-start flex-column bd-highlight mx-auto">
                    <p> {projectCode} - {projectName} </p>
                </div>
            </>
        )
        mainMenu = (
            <>
                {settingsMenu}
            </>
        )
    } else {
        projectData = null
        if (props.user){
            if (props.user.user_role)
                if (props.user.user_role.role_id == 1 || props.user.user_role.role_id == 2)
                settingsMenu = (
                    <>
                        <li>
                            <img src={Report} />
                        </li>
                        <li>
                            <Link to={"/settings/templates"}>
                                <img src={Settings} />
                            </Link>
                        </li>
                    </>
                )
        }
        projectMenu = (
            <>
                <li>
                    <img src={MenuManufacture} />
                </li>
                <li>
                    <img src={MenuTrain} />
                </li>
                <li>
                    <img src={MenuRoad} />
                </li>
            </>
        )
        mainMenu = (
            <>
                { settingsMenu }
                { projectMenu }
            </>
        )
    }

    return (

        <div className="row align-items-center">
            <div className="col">
                <a href="#" rel="home">
                    <picture>
                    <img alt="Мосинжпроект" src="https://mosinzhproekt.ru/wp-content/themes/mosinzh/static/img/main-logo-ru-306x48-c-default.png"/>
                    </picture>
                </a>
                <div className="text-xs uppercase text-blue-100 leading-none pl-12">
                    СТРОИМ НАСТОЯЩЕЕ, СОЗДАЕМ БУДУЩEЕ!
                </div>
            </div>
            {projectData}
            <div className="col d-flex align-items-end flex-column bd-highlight mx-auto mb-3">
                <ul className="menu-main">
                    {mainMenu}
                    <li className="with_separator">
                        <Link to={"/projects"}>
                            <p> ПРОЕКТЫ </p>
                        </Link>
                    </li>
                    <li className="with_separator">
                        <img className="menu-main-search" src={MenuSearch} />
                    </li>

                    <li>
                        <div className="menu-main-line_project">
                            <hr/>
                            <hr/>
                            <hr/>
                        </div>
                    </li>

                    <li className="with_separator">
                        <div className="menu-main-grid_project">
                            <hr/>
                            <hr/>
                            <hr/>
                        </div>
                    </li>

                    <li>
                        <Link to={"/user"}>
                            <img src={MenuUser} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MYheader